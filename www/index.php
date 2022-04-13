<?php
    define('ROOT',  dirname((dirname(__FILE__))));
    require_once ROOT."\inc\utils.php";
    require_once ROOT."\inc\db.php";


    $uri = rtrim(dirname($_SERVER["SCRIPT_NAME"]), '/' );
    $uri = '/' . trim( str_replace( $uri, '', $_SERVER['REQUEST_URI'] ), '/' );
    $uri = urldecode( $uri );

    $get_requests = array( 
        'invoice-detail' => "/api/invoice-detail/(?'id'\d+)",
        'delete-sent-invoice' => "/api/delete-sent-invoice/(?'invno'\d+)",
        
        'get-fname' => "/api/get-fname/(?'handphone'\d+)",
        
        'invoice-rec-detail' => "/api/invoice-rec-detail/(?'recno'\d+)",
        'approve-rec-invoice' => "/api/approve-rec-invoice/(?'recno'\d+)",
        'invoice-rec-paid' => "/api/invoice-recieve-paid/(?'recno'\d+)",
        'revoke-rec-invoice' => "/api/delete-recieve-invoice/(?'recno'\d+)",
        
        'invoice-history' => "/api/invoice-history",
        'create-inv-tables' => '/api/create-inv-tables',
        'invoice-history-detail' => "/api/invoice-history-detail/(?'id'\d+)",
    );

    $page_requests = array( 
        'home' => "/",
        'invoice-history' => "/invoice-history",
        'invoice-detail' => "/invoice-detail/(?'id'\d+)",
        'invoice-save' => "/invoice-save",
        'invoice-cancel' => "/invoice-cancel/(?'id'\d+)" ,
        'invoice-history-detail' => "/invoice-history-detail/(?'id'\d+)",
        'delete-invoice' => "/delete-invoice/(?'id'\d+)",
    );

    $post_requests = array(
        'invoice-list' => "/api/invoice-sent-list",
        'invoice-save' => "/api/invoice-save",
        'invoice-edit' => "/api/invoice-edit/(?'invno'\d+)",

        'invoice-recieve-list' => "/api/invoice-recieve-list",
    );
    
    $request_method = $_SERVER['REQUEST_METHOD'];
    if (in_array($request_method, ['GET', 'POST'])) {

        if (strstr($uri, "api")) {
            $request_rules = $request_method === 'GET' ? $get_requests : $post_requests;
            require_once ROOT."\\inc\\components\\api_request.php";
            $req = new ApiList(); 
        }
        else {
            $request_rules = $page_requests;
            require_once ROOT."\\inc\\components\\page_request.php";
            $req = new PageRequest();
        }
        
        foreach ( $request_rules as $action_name => $rule ) {
            if ( preg_match( '~^'.$rule.'$~i', $uri, $params ) ) {
                $req->request_name = $action_name;
                $req->params = $params;
                $res = $req->request_res();
                if (strstr($uri, "api")) {
                    header('Access-Control-Allow-Origin: *');
                    header('Content-Type: application/json');
                    echo $res;
                    die();
                }
              
            }
        }

        http_response_code(404);
        console_log(
            '<div class="page404">
                <span>404</span>      
                <p>page not found</p>
            </div>
            '
        );

    }
    else {
        header($_SERVER["SERVER_PROTOCOL"]." 405 Method Not Allowed", true, 405);
        die();
    }
?>
