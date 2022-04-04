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
            $query = 'select id, first_name as name, phone_number as phone from users';
            $results = json_decode(_select($query, 'select_users'), true);
            return json_encode($results);
        }

        protected function inv_detail() {
            $request_param = $this->params['id'];
            $query = 'select id, first_name as fname, phone_number, last_name  as lname from users where id=$1';
            $results = json_decode(_select($query, 'select_user_detail', [$request_param]), true);
            return json_encode($results);
        }

        protected function inv_delete() {
            $requested_id = $this->params['id'];
            $query = 'delete from users where id=$1';
            
            sql_execute($query, 'delete_user', [$requested_id]);
            redirect("/");
            // return json_encode('{"success": "true"}');
        }

        protected function inv_save() {
            extract($_POST);
            $values = [[$fname, $lname, $phone_number]];
            $query = 'insert into users(first_name, last_name, phone_number) values';
            bulk_insert($query, $values );
            redirect("/");
            // return json_encode('{"success": "true"}');
        }

        protected function inv_edit() {
            extract($_POST);
            $invoice_id = $this->params['id'];
            $params = [$fname, $lname, $phone_number, $invoice_id];
            
            $query = '
                update
                    users SET first_name=$1, last_name=$2, phone_number=$3 WHERE id=$4';
            sql_execute($query, 'update_user_data', $params);
            redirect("/");
            // return json_encode('{"success": "true"}');
        }
        
        protected function insert_invoice_status() {
            $invoice_status_datas = [
                ["code"=> "send", "name"=> "илгээсэн"],
                ["code"=> "revoked", "name"=> "цуцласан"],
                ["code"=> "paid", "name"=> "төлөгдсөн"],
            ];
            
            $query = 'insert into invoicestatus(code, name) values';
            bulk_insert($query, $invoice_status_datas );
            echo "done";
        }

        protected  function create_tables() {

            $invoice_status_sql = 'create table '.DB_SCHEMA.'invoiceStatus(
                    id integer generated always as identity,
                    name varchar(40),
                    code varchar(40)
                )';
            
            $invoice_sql = 'create table '.DB_SCHEMA.'Invoice(
                    invno integer generated always as identity,
                    recno integer,
                    amount integer,
                    fromcustno character varying(16) NOT NULL,
                    fromaccntno character varying(16) NOT NULL,
                    tocustno character varying(16) NOT NULL,
                    toaccntno character varying(16) NOT NULL,
                    invstatus integer NOT NULL,
                    invdesc character varying(100) NOT NULL,
                    created_at timestamp 
                )';
            
            sql_execute($invoice_status_sql, 'create_table');
            sql_execute($invoice_sql, 'invoice_sql');
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
