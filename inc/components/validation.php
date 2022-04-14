<?php
    class Validation
    {
        public $field_name;
        public $field_value;
        public $requested_arr;
        public $is_reciever;
        
        
        function __set($propName, $propValue)
        {
            $this->$propName = $propValue;
        }

        
        public function request_res() {
            $field_name = strtolower($this->field_name);
            $check_empty_data = $this->check_required_field_empty();

            if(!$check_empty_data['success']) {
                return [
                    "success"=>false,
                    "info"=>$check_empty_data['info']
                ];
            }
            
            switch ($field_name) {
                case 'amount':
                    return $this->check_amount_data();

                case 'custno':
                    return $this->check_custno_data();

                case 'account':
                    return $this->check_account_data();
                
                case 'rec_datas':
                    return $this->check_rec_data();
            }

            return [
                "success"=>true,
                "info"=>'',
            ];
        }

        protected function check_required_field_empty() {
            $field_name = strtolower($this->field_name);

            $check_datas = array(
                "amount"=>"Үнийн дүн хоосон байна",
                "handphone"=>"Утасны дугаар хоосон байна",
                "custno"=>"Харилцагчийн сип дугаар хоосон байна",
                "invdesc"=>"Нэхэмжлэлийн утга хоосон байна",
                "fname"=>"Харилцагчийн нэр хоосон байна",
                "rec_datas"=>"Нэхэмжлэлийг хоёроос дээш хүн уруу илгээнэ !!!",
                "account"=>"Дансны дугаар хоосон байна !!!",
            );
            
            $field_data = get_or_null($this->requested_arr[$field_name]);            

            if(!$field_data || $field_data === 'null') {
                return [
                    "success"=>false,
                    "info"=>get_or_null($check_datas[$field_name]) ? get_or_null($check_datas[$field_name]) : "Шаарлагатай талбар бууруу байна. Системийн админд хандана уу !!!",
                ];
            }
           
            return [
                "success"=>true,
                "info"=>'',
            ];
        }

        protected function check_amount_data() {
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

            if ($request_data['amount'] <= 5000 && !$this->is_reciever) {
                return [
                    "success"=>false,
                    "info"=> "Илгээх үнийн дүн 5000 дээш утгатай байх ёстой. ",
                ];
            }
        
            return [
                "success"=>true,
                "info"=>'',
            ];
        }


        protected function check_rec_data() {
            $field_data = json_decode($this->field_value, true);
                // if (count($field_data)<3) {
            if (count($field_data)<1) {
                return [
                    "success"=>false,
                    "info"=>'Нэхэмжлэлийг хоёроос дээш хүн уруу илгээнэ !!!',
                ]; 
            }

            return [
                "success"=>True,
                "info"=>""
            ];

        }

        protected function check_custno_data() {
            
            $query = '
            select 
                handphone 
            FROM 
                gb.cust
            where 
                custno=$custno';
            
            $params['$custno'] = check_string($this->field_value);
            $temp_data = _select($query, $params);
            if (count($temp_data)<1) {
                return [
                    "success"=>false,
                    "info"=>'"'.$this->field_value.'" дугаартай харилцагч олдсонгүй',
                ];
            }

            $cust_phone = get_or_null($temp_data[0]['handphone']);

            if (!$cust_phone) {
                return [
                    "success"=>false,
                    "info"=>'"'.$this->field_value.'" дугаартай харилцагчид утасны дугаар бүртгэлгүй байна. Системийн админд хандана уу !!!',
                ]; 
            }

            return [
                "success"=>True,
                "info"=>""
            ];
        }

        protected function check_account_data() {
            $query = '
            select 
                *
            FROM 
                gb.dpacnt
            where 
                custno=$custno
                and
                acntno=$acntno
            ';
            
            $params['$acntno'] = check_string($this->field_value);
            $params['$custno'] = check_string($this->requested_arr['custno']);
            $temp_data = _select($query, $params);
            if (count($temp_data)<1) {
                return [
                    "success"=>false,
                    "info"=>'"'.$this->requested_arr['custno'].'" дугаартай харилцагч дээр "'.$this->field_value.'" дугаартай данс олдсонгүй',
                ];
            }

            return [
                "success"=>True,
                "info"=>""
            ];
        }

    } 
?>
