<?php
    require_once ROOT."\\inc\\components\\table.php";
    $employee = new NewTable();
    $employee->className="table table-dark mt-4 pt-4";
    $employee->header_details= json_decode('{
        "class_name": "bg-dark text-white",
        "header_data":[
            {"field":"id", "value":"№", "className":"", "scope": " "},
            {"field":"name", "value":"Name", "className":"", "scope": " "},
            {"field":"phone", "value":"Phone Number", "className":"", "scope": " "}
        ]
    }', true);

    $employee->body_datas= json_decode('[
        {"id":" ", "name":"deegii", "phone":"999999"},
        {"id":1, "name":" ", "phone":"999999"},
        {"id":2, "name":"deegii", "phone":""}
        ]', true);
    $employee->diplay_table();
?>