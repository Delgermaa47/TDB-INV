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
            _delete($query, 'delete_user', [$requested_id]);
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

        public function request_res() {
            $request_name = strtolower($this->request_name);

            switch ($request_name) {
                case 'invoice-list':
                    return $this->inv_list();
                
                case 'invoice-save':
                    return $this->inv_save();
                
                case 'invoice-detail':
                        return $this->inv_detail();
                            
                case 'delete-invoice':
                    return $this->inv_delete();

                case 'invoice-history':
                    return $this->inv_list();
                
                case 'invoice-history-detail':
                    return $this->inv_list();
                
                case 'invoice-reffresh':
                    return $this->inv_list();
                    
            }

            return [];
        }

    }

?>
