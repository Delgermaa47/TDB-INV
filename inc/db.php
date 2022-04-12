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
        
       $conn = oci_connect($db_user, $db_pass, $db_host.'/'.$db_name, 'AL32UTF8');

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
            $row = array_change_key_case($row, CASE_LOWER);
            array_push($res, $row);
        }
        return $res;
    }
 
    
    function sql_execute($sql, $params=[]) {
        $query = strtr($sql, $params);
        $stid = oci_parse(PG_Conn, $query);
        oci_execute($stid);
        return $stid;
    }

    function _select($query, $params) {
        $stid = sql_execute($query, $params);
        return fetch_rows($stid);
    }

    function bulk_insert($query, $datas ) {
        
        $idNumber = '';
        $bla = $query.'('.join(", ", array_map("check_string", $datas)).')';
        $bla = $bla.' RETURNING invno INTO :invno1';

        $parsed = oci_parse(PG_Conn, $bla);
        oci_bind_by_name($parsed, ":invno1", $idNumber);
        oci_execute($parsed);
        return  intval($idNumber);
    }
?>
