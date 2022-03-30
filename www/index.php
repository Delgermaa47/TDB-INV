<?php
    define('ROOT',  dirname((dirname(__FILE__))));
    require ROOT."\inc\header.php";


    $request_url = get_or_null($_SERVER['REDIRECT_URL']);
    // $request_url = replace_string('/', '\\', $request_url);
    if (!$request_url) {
        require ROOT."\pages\home.php";
    }
    else{

        $uri = rtrim(dirname($_SERVER["SCRIPT_NAME"]), '/' );
        $uri = '/' . trim( str_replace( $uri, '', $_SERVER['REQUEST_URI'] ), '/' );
        $uri = urldecode( $uri );

        $get_requests = array( 
            'invoice-list' => "/invoice-list",
            'invoice-history' => "/invoice-history",
            'invoice-template' => "/invoice-template",
            'invoice-detail' => "/invoice-detail/(?'id'\d+)",
            'invoice-cancel' => "/invoice-cancel/(?'id'\d+)" ,
            'invoice-template-detail' => "/invoice-template-detail/(?'id'\d+)" ,
            'invoice-history-detail' => "/invoice-history-detail/(?'id'\d+)" ,
        );

        $post_requests = array(
            'invoice-save' => "/invoice-save",
            'invoice-template-save' => "/invoice-template-save" ,
        );


        $request_method = $_SERVER['REQUEST_METHOD'];
        if (in_array($request_method, ['GET', 'POST'])) {
            $request_rules = $request_method === 'GET' ? $get_requests : $get_requests;
            foreach ( $request_rules as $action => $rule ) {
                if ( preg_match( '~^'.$rule.'$~i', $uri, $params ) ) {
                    require ROOT."\\inc\\components\\table.php";
                    $api_request_func = new ApiList();
                    
                    print_arr_values($params);
                    exit();
                }
                else {
                    echo "here";
                    http_response_code(404);
                    include(ROOT."\pages\page404.php");
                    die();
                }
            }


        }
        else {
            header($_SERVER["SERVER_PROTOCOL"]." 405 Method Not Allowed", true, 405);
            die();
        }
        
        // if(!file_exists($file_name) ){
        //     http_response_code(404);
        //     include(ROOT."\pages\page404.php");
        //     die();
        // }
        // require $file_name;
    }
    require ROOT."\\inc\\footer.php";
?>
