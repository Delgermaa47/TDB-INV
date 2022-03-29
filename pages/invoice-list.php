<?php
    require ROOT."\inc\db.php";
    $query = 'select last_name from users';
    $result = _select($query, 'select_users');
    print_arr_values(json_decode($result));
?>