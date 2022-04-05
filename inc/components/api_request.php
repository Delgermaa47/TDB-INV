<?php
    class ApiList
    {
        public $request_name;
        public $request_params;
        
        function __set($propName, $propValue)
        {
            $this->$propName = $propValue;
        }

        protected function inv_list() {
            $query = '
                select 
                    *
                FROM 
                    vbismiddle.invoice
                ';
            return _select($query, []);
        }

        protected function inv_detail() {
            $request_param_id = $this->params['id'];
            
            $query = '
            select 
                custno, id1, email, handphone 
            FROM 
                vbismiddle.invoice
            where 
                id=$id';
            
            $params['$id'] = $request_param_id;
            // $params['$custno'] = check_string('90400005635');
            return json_decode(_select($query, $params), true);
        }

        protected function inv_delete() {
            $query = 'delete from vbismiddle.invoice where id=$id';
            $params['$id'] = $this->params['id'];
            sql_execute($query, $params);
            redirect("/");
            // return json_encode('{"success": "true"}');
        }

        protected function inv_save() {
            $number_values = ['all_amount', 'current_amount', 'invstatus'];
            foreach ($_POST as $key => $value) {
                if (in_array($key, $number_values) && !empty($value)) {
                    $_POST[$key] = floatval($value);
                }
            }

            extract($_POST);
            
            $created_at = now();

            $values = [[
                $all_amount, $current_amount, $fromcustno, $fromaccntno, 
               $tocustno, $toaccntno, $invstatus, 
               $invdesc, $tophone
            ]];

            $query = 'insert into vbismiddle.invoice(
            all_amount, current_amount, fromcustno, fromaccntno, 
            tocustno, toaccntno, invstatus, 
            invdesc, tophone
            ) values';
            bulk_insert($query, $values);
            // redirect("/");
            return json_encode('{"success": "true"}');
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
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                )';
            
            $invoice_rec_sql = 'create table '.DB_SCHEMA.'InvoiceRec(
                    recno integer generated always as identity,
                    invno integer,
                    amount integer,
                    
                    custno character varying(16) NOT NULL,
                    accntno character varying(16) NOT NULL,
                    handphone character varying(16) NOT NULL,
                    invstatus integer NOT NULL,
                    
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                )';
            sql_execute($invoice_status_sql);
            sql_execute($invoice_sql);
            sql_execute($invoice_rec_sql);
            echo "done";
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
                            
                case 'delete-invoice':
                    return $this->inv_delete();

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

    }

?>
