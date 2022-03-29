<?php
    define('PG_Conn', pg_connect("host=localhost port=5432 dbname=tdb_claim user=postgres password=Ankle123"));

    function _select($sql, $execute_name, $params=[], $type="all") {

        $result = pg_prepare(PG_Conn, $execute_name, $sql);
        $result = pg_execute(PG_Conn, $execute_name, [...$params]);
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
    }
    
    function _update($table_name, $datas, $condition) {
        $query = 'update '.$table_name.' set ';
        $query = $query.$datas.' where '.$condition;
        pg_query(PG_Conn, $query);
    }
?>

<!-- 

/* ---select---
$query = "select * from users where first_name=$1";

_select($query, 'select_users', ['deegi']);

*/

/* ---insert---
$datas = [['svhee', 'luwsan', '99999911'],['orgil', 'bat', '99999912'],['odko', 'dorj', '99999913']];
$query = "insert into users(first_name, last_name, phone_number) values ";
bulk_insert($query, $datas )
*/

// _update('users', "last_name='sanj'", "first_name='deegi'"); -->