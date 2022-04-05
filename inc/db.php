<?php

    define('DB_SCHEMA', 'vbismiddle');
    $db_user = (DB_SCHEMA === 'vbismiddle') ? 'gb' : 'postgres';
    $db_pass = (DB_SCHEMA === 'vbismiddle') ? 'gb96gb318454' : 'Ankle123';
    $db_name = (DB_SCHEMA === 'vbismiddle') ? 'gb96' : 'tdb_claim';
    $db_host = (DB_SCHEMA === 'vbismiddle') ? '172.29.2.71' : 'localhost';
    $db_port = (DB_SCHEMA === 'vbismiddle') ? '1521' : '5432';
    
    ini_set("dipley_errors", 1);
    
    if (empty(DB_SCHEMA)) {
        $db_con = pg_connect("host=$db_host port=$db_port dbname=$db_name user= $db_user password= $db_pass");
        define('PG_Conn', $db_con); 
    }
    else {
        
       $conn = oci_connect($db_user, $db_pass, $db_host.'/'.$db_name);

       if (!$conn) {
           $e = oci_error();
           echo htmlentities($e['message'], ENT_QUOTES);
           unset($db_user); unset($db_pass);
       }
       define('PG_Conn', $conn); 
    }

    function fetch_rows($stid) {
        $res = [];
        while (($row = oci_fetch_array($stid, OCI_ASSOC+OCI_RETURN_LOBS)) != false) {
            array_push($res, $row);
        }
        return $res;
    }
 
    
    function sql_execute($sql) {
        echo $sql;
        $stid = oci_parse(PG_Conn, $sql);
        oci_execute($stid);
        return $stid;
    }

    function _select($query, $params) {

        $query = strtr($query, $params);
        $stid = sql_execute($query);
        return json_encode(fetch_rows($stid));
    }

    function bulk_insert($query, $datas ) {
        
        foreach($datas as $key=>$value){
            // $inner_comma = ',';
            // if ($key === 0 || $key === count($datas)-1) {
            //     $inner_comma = ' ';
            // }
            $bla = $query.'('.join(", ", array_map("check_string", $value)).')';
            sql_execute($bla);
        }
        
    }
?>
