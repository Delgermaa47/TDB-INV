<?php

    define('DB_SCHEMA', '');
    $db_user = (DB_SCHEMA === 'vbismiddle') ? "gb" : "postgres";
    $db_pass = (DB_SCHEMA === 'vbismiddle') ? "*" : "Ankle123";
    $db_name = (DB_SCHEMA === 'vbismiddle') ? "gb96" : "tdb_claim";
    $db_host = (DB_SCHEMA === 'vbismiddle') ? "172.29.2.71" : "localhost";
    $db_port = (DB_SCHEMA === 'vbismiddle') ? "1521" : "5432";
    
    ini_set("dipley_errors", 1);

    $db_con = pg_connect("host=$db_host port=$db_port dbname=$db_name user= $db_user password= $db_pass");
    if (!$db_con) {
        echo "Датабааз-тай холбогдоход алдаа гарлаа !!!";
    }
    else define('PG_Conn', $db_con); 

    
    function sql_execute($sql, $execute_name, $params=[]) {
    
        pg_prepare(PG_Conn, $execute_name, $sql);
        
        $result = pg_execute(PG_Conn, $execute_name, [...$params]);
        if(!$result) {
            return  ["status" => false, "info" => "Холболт үүсгэхэд алдаа гарлаа", "result"=> []];
        }
        return $result;
    }

    function _select($sql, $execute_name, $params=[]) {
        $result = sql_execute($sql, $execute_name, $params);
        $result = pg_fetch_all($result);
        pg_close();
        return json_encode($result);
    }


    function bulk_insert($query, $datas ) {
        
        foreach($datas as $key=>$value){
            $inner_comma = ',';
            if ($key === 0 || $key === count($datas)-1) {
                $inner_comma = ' ';
            }
            $query = $query.$inner_comma.'('.join(",", array_map("check_string", $value)).')'. $inner_comma;
        }
        
        pg_query(PG_Conn, $query);
        pg_close();
    }
?>
