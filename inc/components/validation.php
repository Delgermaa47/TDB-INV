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

        
        public function request_res() {
            $field_name = strtolower($this->field_name);
            $check_empty_data = $this->check_required_field_empty();

            if(!$check_empty_data['success']) {
                return json_encode([
                    "success"=>false,
                    "info"=>$check_empty_data['info']
                ]);
            }
            
            switch ($field_name) {
                case 'amount':
                    return $this->check_amount_data();

                case 'custno':
                    return $this->check_custno_data();

                case 'account':
                    return $this->check_account_data();
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
                "rec_datas"=>"Нэхэмжлэлийг хоёроос дээш хүн уруу илгээнэ !!!"
            );
            
            $field_data = get_or_null($_POST[$field_name]);            

            if(!$field_data) {
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

            if ($request_data['amount'] <= 5000) {
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

        protected function check_custno_data() {
            
            $query = '
            select 
                handphone 
            FROM 
                gb.cust
            where 
                custno=$custno';
            
            $params['$custno'] = $this->field_value;
            $request_data = json_decode(_select($query, $params), true);
            if (count($request_data)<1) {
                return [
                    "success"=>false,
                    "info"=>'"'.$this->field_value.'" дугаартай харилцагч олдсонгүй',
                ];
            }

            $cust_phone = get_or_null($request_data[0]['handphone']);

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
                gb.cust
            where 
                custno=$custno
                and
                acntno=$acntno
            ';
            
            $params['$acntno'] = $this->field_value;
            $params['$custno'] = $this->requested_arr['custno'];
            $request_data = json_decode(_select($query, $params), true);
            if (count($request_data)<1) {
                return [
                    "success"=>false,
                    "info"=>'"'.$this->requested_arr['custno'].'" дугаартай харилцагч дээр "'.$this->field_value.'" дугаартай данс олсонгүй олдсонгүй',
                ];
            }

            return [
                "success"=>True,
                "info"=>""
            ];
        }

    } 
?>
