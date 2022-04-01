<?php
    define('ROOT',  dirname((dirname(__FILE__))));
    require_once ROOT."\inc\utils.php";
    require_once ROOT."\inc\db.php";


    $uri = rtrim(dirname($_SERVER["SCRIPT_NAME"]), '/' );
    $uri = '/' . trim( str_replace( $uri, '', $_SERVER['REQUEST_URI'] ), '/' );
    $uri = urldecode( $uri );

    $get_requests = array( 
        'invoice-list' => "/api/invoice-list",
        'invoice-history' => "/api/invoice-history",
        'invoice-detail' => "/api/invoice-detail/(?'id'\d+)",
        'invoice-cancel' => "/api/invoice-cancel/(?'id'\d+)" ,
        'invoice-history-detail' => "/api/invoice-history-detail/(?'id'\d+)",
        'delete-invoice' => "/api/delete-invoice/(?'id'\d+)",
    );

    $post_requests = array(
        'invoice-save' => "/api/invoice-save",
    );

    $request_method = $_SERVER['REQUEST_METHOD'];
    if (in_array($request_method, ['GET', 'POST'])) {
        $request_rules = $request_method === 'GET' ? $get_requests : $post_requests;
        foreach ( $request_rules as $action_name => $rule ) {
            if ( preg_match( '~^'.$rule.'$~i', $uri, $params ) ) {
                require_once ROOT."\\inc\\components\\api_request.php";
                $req = new ApiList();
                $req->request_name = $action_name;
                $req->params = $params;
                $res = $req->request_res();
                header('Access-Control-Allow-Origin: *');
                header('Content-Type: application/json');
                echo $res;
                die();
            }
        }
        
        require_once ROOT."\\inc\\components\\page_request.php";
        $req = new PageRequest();
        $req->request_url = $uri;
        $req->params = $params;
        $res = $req->request_res();
        die();
        
        // $uri = ROOT.'\\pages\\'.replace_string('/', '\\', $uri).'.php';
        // if (file_exists($uri)) {
        //     require $uri;
        // }
    }
    else {
        header($_SERVER["SERVER_PROTOCOL"]." 405 Method Not Allowed", true, 405);
        die();
    }
?>
