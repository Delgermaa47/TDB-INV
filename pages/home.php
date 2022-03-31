<?php
    require_once ROOT."\\inc\\header.php";
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

    $bla = json_decode(file_get_contents('http://172.26.153.11/api/invoice-list'), true);
    
    $employee->body_datas = $bla;
    ?>
    <div class="container">
        <div>
        </div>
        <?php

            $employee->diplay_table();
        ?>
    </div>
    <? require ROOT."\\inc\\footer.php"?>
    