<?php
    define('PG_Conn', pg_connect("host=localhost port=5432 dbname=tdb_claim user=postgres password=Ankle123"));
    
    function sql_execute($sql, $execute_name, $params) {
        pg_prepare(PG_Conn, $execute_name, $sql);
        return pg_execute(PG_Conn, $execute_name, [...$params]);
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
        echo $query;
        pg_query(PG_Conn, $query);
    }
?>
