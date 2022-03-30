<?php
    define('ROOT',  dirname((dirname(__FILE__))));
    define('ASSETS',  'http://localhost'.'\assets\\');
    require ROOT."\inc\header.php";
    $request_url = get_or_null($_SERVER['REDIRECT_URL']);
    $request_url = replace_string('/', '\\', $request_url);
    if (!$request_url) {
        require ROOT."\pages\home.php";
    }
    else{
        $file_name = ROOT.'\pages'.$request_url.'.php';
        if(!file_exists($file_name) ){
            http_response_code(404);
            include(ROOT."\pages\page404.php");
            die();
        }
        require $file_name;
    }
    require ROOT."\\inc\\footer.php";
?>
