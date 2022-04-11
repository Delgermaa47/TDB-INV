<?php
    class Validation
    {
        public $field_name;
        public $field_value;
        public $requested_arr;
        
        function __set($propName, $propValue)
        {
            $this->$propName = $propValue;
        }

        protected function check_amount_data() {
            if ($this->field_name === 'amount') {
                try {
                    $amount = floatval($this->field_value);
                    $request_data['amount'] = $amount;
                }
                catch(Exception $e) {
                    return [
                        "success"=>false,
                        "info"=> "Үнийн дүн тоон утга байна!!!. ",
                    ];
                }

                if ($request_data['amount'] <= 5000) {
                    return [
                        "success"=>false,
                        "info"=> "Илгээх үнийн дүн 5000 дээш утгатай байх ёстой. ",
                    ];
                }
            }
            
            return [
                "success"=>true,
                "info"=>'',
            ];
        }

        public function request_res() {
            $field_name = strtolower($this->field_name);

            switch ($field_name) {
                case 'amount':
                    return $this->check_amount_data();
            }

            return [
                "success"=>true,
                "info"=>'',
            ];
        }
    } 
?>
