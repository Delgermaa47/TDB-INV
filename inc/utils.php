<?php

    function print_arr_values($arr, $desc=""){
        echo $desc;
        echo '<pre>';
        print_r($arr);
        echo '<pre>';

    }

    function console_log($desc="", $any_data="") {
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
        // $request_url = replace_string('/', '\\', $request_url
        return str_replace($old_str, $new_str, $main_str);
    }

    function get_or_null(&$var, $default=null) {
        return isset($var) ? $var : $default;
    }

    function makeBlockHTML($replStr, $_element_class){
        $template = 
            '<div class=$_element_class>
                $str
            </div>';
    return strtr($template, array( '$str' => $replStr, '$_element_class'=>$_element_class));
    }

    function write_to_file($data, $path="", $filename="new_file.txt"){
        $myfile = fopen($path.$filename, "w") or die("Unable to open file!");
        fwrite($myfile, $data);
        fclose($myfile); 
    }

    function requests($url, $body=[]) {
        $postvars='';
        $sep='';
        foreach($body as $key=>$value)
        {
                $postvars.= $sep.urlencode($key).'='.urlencode($value);
                $sep='&';
        }

        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, count($body));
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postvars);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $result = curl_exec($ch);
        
        curl_close($ch);
        return $result;
    }
?>