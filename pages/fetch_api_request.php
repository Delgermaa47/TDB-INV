<?php
    define('ROOT',  dirname((dirname(__FILE__))));
    require ROOT."\inc\header.php";
    $request_url = get_or_null($_SERVER['REDIRECT_URL']);
    $request_url = replace_string('/', '\\', $request_url);
    if (!$request_url) {
        require ROOT."\pages\home.php";
    }
    else{
        $file_name = ROOT.'\pages'.$request_url.'.php';
        // echo $request_url;

        define( 'INCLUDE_DIR', dirname( __FILE__ ) . '/inc/' );

        $rules = array( 
            'page-detail'   => "/pages/(?'text'[^/]+)/(?'id'\d+)",    // '/picture/some-text/51'
            'album'     => "/album/(?'album'[\w\-]+)",              // '/album/album-slug'
            'category'  => "/category/(?'category'[\w\-]+)",        // '/category/category-slug'
            'page'      => "/page/(?'page'about|contact)",          // '/page/about', '/page/contact'
            'post'      => "/(?'post'[\w\-]+)",                     // '/post-slug'
            'home'      => "/"                                      // '/'
        );
        $uri = rtrim(dirname($_SERVER["SCRIPT_NAME"]), '/' );
        $uri = '/' . trim( str_replace( $uri, '', $_SERVER['REQUEST_URI'] ), '/' );
        $uri = urldecode( $uri );
        echo $uri;

        foreach ( $rules as $action => $rule ) {
            if ( preg_match( '~^'.$rule.'$~i', $uri, $params ) ) {
                /* now you know the action and parameters so you can 
                * include appropriate template file ( or proceed in some other way )
                */
                print_arr_values($params);
                // include( INCLUDE_DIR . $action . '.php' );

                // exit to avoid the 404 message 
                exit();
            }
            else {
                console_log("doesnt match");
            }
        }

        // nothing is found so handle the 404 error
        // include( INCLUDE_DIR . '404.php' );

        // if(!file_exists($file_name) ){
        //     http_response_code(404);
        //     include(ROOT."\pages\page404.php");
        //     die();
        // }
        // require $file_name;
    }
    require ROOT."\\inc\\footer.php";
?>
