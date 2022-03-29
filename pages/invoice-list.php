<?php
    require ROOT."\inc\db.php";
    $query = 'select last_name from users';
    $result = json_decode(_select($query, 'select_users'));
?>