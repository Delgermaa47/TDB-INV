<?php
    class NewTable
    {
        public $header_details;
        public $className;
        public $body_datas;
        function __set($propName, $propValue)
        {
            $this->$propName = $propValue;
        }

        public function diplay_table() {
            $table_class_name = $this->className ? $this->className : "table";
            $_header_className = get_or_null($this->header_details['class_name']);
            
            $header_body_req = get_or_null($this->header_details['header_data']);
            $header_body_req = $header_body_req ? $header_body_req : [];

            $header_body = '';
            foreach($header_body_req as $key=>$value) {
                extract($value);
                $header_body = $header_body.'<th scope='.$scope.'class='.$className.'>'.$value.'</th>';
            }

            $table_body = '';
            foreach($this->body_datas as $key=>$body_value) {
                $table_body = $table_body.'<tr scope='.$scope.'class='.$className.'>';
                foreach($header_body_req as $key=>$head_value) {
                    $table_body = $table_body.'<td>'.$body_value[$head_value['field']].'</td>';
                }
                $table_body = $table_body.'</tr>';
            }

            $bla =  makeBlockHTML(
                "<table class='{$table_class_name}'>
                <tr class='{$_header_className}'>
                    $header_body
                </tr>
                $table_body
              </table>"
            ,"table-responsive");
            echo $bla;
        }

    }
?>
