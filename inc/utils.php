<?php

function print_arr_values($arr, $desc=""){
    echo $desc;
    echo '<pre>';
    print_r($arr);
    echo '<pre>';

}

function console_log($any_data, $desc="") {
    $desc = empty($desc) ?  " " : $desc.": ";
    echo "<br>".$desc.$any_data."<br>";
}

function new_line() {
    echo "<br>";
}

function check_string( $key_value ) {
    if(gettype($key_value) === 'string') {
        $key_value = "'".$key_value."'";
    }
    return $key_value;
}

function replace_string($old_str, $new_str, $main_str) {
    return str_replace($old_str, $new_str, $main_str);
}

function get_or_null(&$var, $default=null) {
    return isset($var) ? $var : $default;
}

function testBlockHTML($replStr){
    $template = 
     '<html>
       <body>
         $str
       </body>
     </html>';
   return strtr($template, array( '$str' => $replStr));
  }
?>