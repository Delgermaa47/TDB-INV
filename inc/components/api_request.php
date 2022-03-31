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

        protected function inv_detial() {
            $request_param = $this->params['id'];
            $query = 'select id, first_name as name, phone_number as phone from users where id=$1';
            $results = json_decode(_select($query, 'select_user_detail', [$request_param]), true);
            return json_encode($results);
        }

        public function request_res() {
            $request_name = strtolower($this->request_name);

            switch ($request_name) {
                case 'invoice-list':
                    return $this->inv_list();
                
                case 'invoice-history':
                    return $this->inv_list();
                
                case 'invoice-template-detail':
                    return $this->inv_list();
                                
                case 'invoice-history-detail':
                    return $this->inv_list();
            }

            return [];
        }

    }

?>
