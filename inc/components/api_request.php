<?php

    require_once ROOT."\\inc\\components\\validation.php";

    $custno = '90400005627';
    
    class ApiList
    {
        public $request_name;
        public $request_params;
        
        function __set($propName, $propValue)
        {
            $this->$propName = $propValue;
        }

        public function request_res() {
            $request_name = strtolower($this->request_name);

            switch ($request_name) {
                case 'invoice-list':
                    return $this->inv_list();
                
                case 'invoice-save':
                    return $this->inv_save();
                
                case 'invoice-detail':
                        return $this->inv_detail();
                
                case 'invoice-edit':
                    return $this->inv_edit();
                            
                case 'delete-sent-invoice':
                    return $this->inv_sent_delete();
                
                case 'delete-rec-invoice':
                    return $this->inv_rec_delete();

                case 'invoice-history':
                    return $this->inv_list();
                
                case 'invoice-history-detail':
                    return $this->inv_list();
                
                case 'invoice-reffresh':
                    return $this->inv_list();
                
                case 'create-inv-tables':
                    return $this->create_tables();

                case 'insert-inv-status':
                    return $this->insert_invoice_status();
            }

            return [];
        }

        protected function get_req_params($query, $sort_name) {
            $sort_type = "desc";
            
            $req_page = get_or_null($_POST['page']);
            $req_perpage = get_or_null($_POST['perpage']);
            $req_sort_name = get_or_null($_POST['sort_name']);
            $req_sort_type = get_or_null($_POST['sort_type']);
            $req_custom_query = get_or_null($_POST['custom_query']);
          
            if ($req_sort_name) {
                $sort_name = $req_sort_name;
            }

            if ($req_sort_type) {
                $sort_type = $req_sort_type;
            }
            
            $params['$sort_name'] = $sort_name;
            $params['$sort_type'] = $sort_type;
            $query = $query.'order by $sort_name $sort_type';

            return [
                "query"=>$query,
                "params"=>$params
            ];

        }

        protected function inv_list() {
            global $custno;
            $params['$custno'] = $custno;

            $query = '
            select 
                invoice.*,
                customer.CUSTNAME as fname
            from 
                vbismiddle.invoicesent invoice
            inner join gb.cust customer
                on invoice.custno=customer.custno
            where
                invoice.custno=$custno
            ';
            $req = $this->get_req_params($query, 'invno');
            $query = $req['query'];
            $params += $req['params'];
            $res = _select($query, $params);
            return json_encode([
                "succes"=>true,
                "start_index"=>1,
                "page"=>1,
                "items"=>$res
            ]);
        }

        protected function inv_detail() {
            $request_param_id = $this->params['id'];
            
            $query = '
            select 
                * 
            FROM 
                vbismiddle.invoicesent
            where 
                invno=$id';
            
            $params['$id'] = $request_param_id;

            $invoice_datas = _select($query, $params);

            $rec_query = '
            select 
                * 
            FROM 
                vbismiddle.invoicerec
            where 
                invno=$id';

            $rec_datas = _select($rec_query, $params);
            
            if (count($invoice_datas)>0) $invoice_datas[0]['rec_datas'] = $rec_datas;
            
            return json_encode([
                "success"=>true,
                "detail_datas"=>$invoice_datas,
            ]);
        }

        protected function inv_sent_delete() {
            $params['$invno'] = $this->params['id'];
            
            $query = '
                delete from vbismiddle.invoicerec where invno= $invno
            ';

            sql_execute($query, $params);
            $query = '
                delete from vbismiddle.invoicesent where invno= $invno
            ';

            sql_execute($query, $params);
            return json_encode([
                "success"=>true,
            ]);
        }

        protected function inv_rec_delete() {
            $query = 'delete from vbismiddle.invoiceRec where id= $id';
            $params['$id'] = $this->params['id'];
            sql_execute($query, $params);
            return json_encode([
                "success"=>true,
            ]);
        }

        protected function check_valid_data($arr, $_class, $required_fields, $reciever=False) {
            $_class->requested_arr = $arr; 
            $_class->is_reciever = $reciever; 
            foreach ($required_fields as $key => $value) {
                $_class->field_name = $value;
                $_class->field_value = get_or_null($arr[$value]); 
                $check_res = $_class->request_res();
                if(!$check_res['success']) {
                    return [
                        "success"=>false,
                        "info"=>$check_res['info']
                    ];
                }
            }
            return [
                "success"=>true,
                "info"=>'sdfsdfds',
            ];
        }

        protected function get_response_status($res) {
            if(!$res['success']) {
                return json_encode([
                    "success"=>false,
                    "info"=>$res['info']
                ]);
            }
            return False;
        }

        protected function check_invoice_arr($datas, $required_fields, $is_recieve_field=False) {
            $validation = new Validation();
            
            foreach ($datas as $key => $rec_arr) {
                $res = $this->get_response_status($this->check_valid_data($rec_arr, $validation, $required_fields, $is_recieve_field));
                if($res) return $res;
            }
            return False;
        }

        protected function inv_save() {

            
            $required_fields = ["custno", "handphone", "amount", "accntno", "invdesc", "rec_datas"];
            $res = $this->check_invoice_arr([$_POST], $required_fields);
            if($res) {
                return $res;
            };

            extract($_POST);

            $rec_datas = gettype($rec_datas) === 'string'? json_decode($rec_datas, true): $rec_datas; 
            $required_fields = ["custno", "handphone", "amount", "accntno"];
            $res = $this->check_invoice_arr($rec_datas, $required_fields, true);

            if($res) {
                return $res;
            };

            $invstatus = 1;
            $sent_values = [
                $amount, $custno, $accntno,
                $invstatus, $invdesc, 
            ];
            
            $sent_query = 'insert into vbismiddle.invoicesent(
            amount, custno, accntno, invstatus, invdesc
            ) values';

            $last_id = bulk_insert($sent_query, $sent_values);
            foreach ($rec_datas as $key => $value) {
                $amount = $value['amount'];
                $custno = $value['custno'];
                $accntno = $value['accntno'];
                $handphone = $value['handphone'];
                $rec_query = 'insert into vbismiddle.invoiceRec(
                    invno, amount, custno, accntno, invstatus, handphone
                    ) values';
    
    
                $recieve_datas = [
                    $last_id, $amount, $custno, $accntno, 
                    $invstatus, $handphone
                ];
                bulk_insert($rec_query, $recieve_datas);
            }
         
            return json_encode([
                "success"=>true,
                "info"=>'Aмжилттай хадгалагдлаа'
            ]);
        }

        protected function inv_edit() {

            $params['$invno'] = $this->params['invno'];

            $required_fields = ["amount", "accntno", "invdesc"];
            $res = $this->check_invoice_arr([$_POST], $required_fields);

            if($res) {
                return $res;
            };

            extract($_POST);
            $params['$amount'] = $amount;
            $params['$accntno'] = check_string($accntno);
            $params['$invdesc'] = check_string($invdesc);

            $query = '
                update
                    vbismiddle.invoicesent 
                SET 
                    amount=$amount,
                    invdesc=$invdesc
                 WHERE invno=$invno';

            sql_execute($query, $params);

            $add_param = "";
            if ($rec_datas) {
                
                $required_fields = ["amount", "accntno"];
                
                $rec_datas = gettype($rec_datas) === 'string'? json_decode($rec_datas, true): $rec_datas; 
                $res = $this->check_invoice_arr($rec_datas, $required_fields, true);
    
                if($res) {
                    return $res;
                };
                
                $recids = [];
                foreach ($rec_datas as $value) {
                    
                    $params['$recno'] = $value['recno'];
                    $params['$amount'] = $value['amount'];
                    $params['$accntno'] =$value['accntno'];
                    $query = '
                        update
                            vbismiddle.invoicerec
                        SET 
                            amount=$amount,
                            accntno=$accntno
    
                        WHERE recno=$recno';
                    sql_execute($query, $params);

                    array_push($recids, $value['recno']);
                }
                $add_param = 'and recno not in('.join(", " , $recids).")";
            }


            $query = '
                delete from vbismiddle.invoicerec where invno=$invno '.$add_param;

            sql_execute($query, $params);

            return json_encode([
                "success"=>true,
                "info"=>'Aмжилттай хадгалагдлаа'
            ]);
        }
        
        protected function insert_invoice_status() {
            $invoice_status_datas = [
                ["code"=> "send", "status_name"=> "илгээсэн"],
                ["code"=> "revoked", "status_name"=> "цуцласан"],
                ["code"=> "paid", "status_name"=> "төлөгдсөн"],
                ["code"=> "new", "status_name"=> "шинэ"]
            ];
            
            $query = 'insert into vbismiddle.invoicestatus(code, status_name) values';
            bulk_insert($query, $invoice_status_datas );
            echo "done";
        }

        protected  function create_tables() {

            $invoice_status_sql = 'create table '.DB_SCHEMA.'invoiceStatus(
                    id integer generated always as identity,
                    status_name varchar(40),
                    code varchar(40)
                )';
            
            $invoice_sql = 'create table '.DB_SCHEMA.'InvoiceSent(
                    invno integer generated always as identity,
                    amount integer,
                    custno character varying(16) NOT NULL,
                    accntno character varying(16) NOT NULL,
                    invstatus integer NOT NULL,
                    invdesc character varying(100) NOT NULL,
                    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
                    updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
                )';
            
            $invoice_rec_sql = 'create table '.DB_SCHEMA.'InvoiceRec(
                    recno integer generated always as identity,
                    invno integer,
                    amount integer,
                    custno character varying(16) NOT NULL,
                    accntno character varying(16) NOT NULL,
                    handphone character varying(16) NOT NULL,
                    invstatus integer NOT NULL,
                    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
                    updated_at timestamp DEFAULT CURRENT_TIMESTAMP
                )';
            sql_execute($invoice_status_sql);
            sql_execute($invoice_sql);
            sql_execute($invoice_rec_sql);
            echo "done";
        }

    }

?>
