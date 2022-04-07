<?php
    
    class ButtonList
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
                case 'open-modal':
                    return $this->openModal();
                    
            }

            return [];
        }

        protected function openModal() {
            if(isset($_POST['datas'])) {
                $data= $_POST['datas'];
                $inp = file_get_contents('array.json');
                $tempArray = json_decode($inp);
                
                if($tempArray) {
                    array_push($tempArray, $data);
                    $jsonData = json_encode($tempArray);
                }
                else {
                    $jsonData=json_encode(array($data));
                }
                  
                file_put_contents('array.json', $jsonData);
                $inp = file_get_contents('array.json');
                return json_encode($inp);
            }

            return json_encode('{"success": "hooson"}');
        }

    }
?>
