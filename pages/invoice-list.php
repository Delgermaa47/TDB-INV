<?php
    require ROOT."\inc\db.php";
    $query = 'select * from users';
    $result = _select($query, 'select_users');
    print_arr_values(json_decode($result));
?>