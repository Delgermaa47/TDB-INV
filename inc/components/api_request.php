<?php
    require ROOT."\inc\db.php";
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

            header('Content-Type: application/json; charset=utf-8');
            return json_encode($results);
        }

    }

?>
