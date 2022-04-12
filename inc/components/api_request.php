<?php

    require_once ROOT."\\inc\\components\\validation.php";
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

        protected function inv_list() {
            $page = get_or_null($_POST['page']);
            $perpage = get_or_null($_POST['perpage']);
            $sort_name = get_or_null($_POST['sort_name']);
            $custom_query = get_or_null($_POST['custom_query']);

            $query = '
                select 
                    *
                from 
                vbismiddle.invoicesent
                order by invno desc
                fetch next 20 rows only

           
            ';
            $res = _select($query, []);
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
            $invoice_datas[0]['recieve_datas'] = $rec_datas;
            return json_encode([
                "success"=>true,
                "detail_datas"=>$invoice_datas,
            ]);
        }

        protected function inv_sent_delete() {
            $query = '
                delete from vbismiddle.invoicesent where invno= $invno
            ';
            $params['$invno'] = $this->params['id'];
            sql_execute($query, $params);
            return json_encode([
                "success"=>true,
            ]);
        }

        protected function inv_rec_delete() {
            $query = 'delete from vbismiddle.invoiceRec where id= $id';
            $params['$id'] = $this->params['id'];
            sql_execute($query, $params);
            redirect("/");
            // return json_encode('{"success": "true"}');
        }


        protected function inv_save() {

            function _check_datas($arr, $_class, $required_fields, $reciever=False) {
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
            // foreach ($_POST as $key => $value) {
            //     if (in_array($key, $number_values) && !empty($value)) {
            //         $_POST[$key] = floatval($value);
            //     }
            // }
            $validation = new Validation();
            $required_fields = ["custno", "handphone", "amount", "account", "invdesc", "rec_datas"];
            $check_field = _check_datas($_POST, $validation, $required_fields);
            if(!$check_field['success']) {
                return json_encode([
                    "success"=>false,
                    "info"=>$check_field['info']
                ]);
            }

            extract($_POST);
            $rec_datas = json_decode($rec_datas, true); 
            $required_fields = ["custno", "handphone", "amount", "account"];
            foreach ($rec_datas as $key => $rec_arr) {
                $check_field = _check_datas($rec_arr, $validation, $required_fields,true);
    
                if(!$check_field['success']) {
                    return json_encode([
                        "success"=>false,
                        "info"=>$check_field['info']
                    ]);
                }
            }

            $invstatus = 1;
            $sent_values = [
                $amount, $custno,$account,
                $invstatus, $invdesc, 
            ];
            
            $sent_query = 'insert into vbismiddle.invoicesent(
            amount, custno, accntno, invstatus, invdesc
            ) values';

            $last_id = bulk_insert($sent_query, $sent_values);
            foreach ($rec_datas as $key => $value) {
                $amount = $value['amount'];
                $custno = $value['custno'];
                $accntno = $value['account'];
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
            ]);;
        }

        protected function inv_edit() {
            extract($_POST);

            $params['$id'] = $this->params['id'];;
            $params['$fromcustno'] = $fromcustno;
            $params['$fromaccntno'] = $fromaccntno;
            $params['$tocustno'] = $tocustno;
            $params['$toaccntno'] = $toaccntno;
            $params['$invstatus'] = $invstatus;
            $params['$invdesc'] = $invdesc;
            $params['$tophone'] = $tophone;
            $params['$all_amount'] = $all_amount;
            $params['$current_amount'] = $current_amount;
            $params['$updated_at'] = now();

            $query = '
                update
                    vbismiddle.invoice 
                SET 
                    amount=$amount, fromcustno=$fromcustno, 
                    fromaccntno=$fromaccntno, 
                    tocustno=$tocustno, toaccntno=$toaccntno, 
                    invstatus=$invstatus, 
                    invdesc=$invdesc, created_at=$created_at,
                    tophone=$tophone
                 WHERE id=$id';
            sql_execute($query, $params);
            redirect("/");
            // return json_encode('{"success": "true"}');
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
