
<?php
    require_once ROOT."\\inc\\header.php";
    require_once ROOT."\\inc\\components\\table.php";
    require_once ROOT."\\inc\\components\\sub_components\\invoice_form.php";

    
    class PageRequest
    {
        public $request_name;
        public $params;
        function __set($propName, $propValue)
        {
            $this->$propName = $propValue;
        }

        protected function page404() {
            http_response_code(404);
            console_log(
                '<div class="page404">
                    <span>404</span>      
                    <p>page not found</p>
                </div>
                '
            );
            
        }
        
        public function request_res() {

            $request_name = strtolower($this->request_name);

            switch ($request_name) {
                case 'home':
                    $this->navbar();
                    $this->home();
                    die();
                
                case 'invoice-history':
                    $this->navbar();
                    $this->invoice_history();
                    die();
              
                case 'invoice-detail':
                    $this->navbar();
                    $this->inv_detial();
                    die();
                              
                case 'invoice-cancel':
                    return '';
                              
                case 'invoice-history-detail':
                    return '';
                
                case 'invoice-save':
                    $this->navbar();
                    $this->inv_save();
                    die();
                                    
                default: $this->page404();

            }
        }
        protected function  navbar() {
            echo 
                '<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div class="container main_header">
                        <nav class="navbar navbar-expand-lg navbar-light bg-light">
                            <div class="container-fluid">
                                <div class="collapse navbar-collapse">
                                    <ul class="navbar-nav list-unstyled">
                                        <li class="nav-item">
                                            <a class="nav-link col-md-12" href="\">Нэхэмжлэлийн жагсаалт</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link  col-md-12" href="\invoice-history">Нэхэмжлэлийн түүх</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link  col-md-12"  href="\invoice-save">Нэхэмжлэл Үүсгэх</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            </nav>
                        </div>
                    </div>
                </nav>';
        }

        protected function home() {

            function _delete_comp($id) {
                return '
                    <a class="text-danger" href="\api\delete-invoice\\'.$id.'" role="button"><i class="fa fa-trash" aria-hidden="true"></i></a>
                ';
            }

            function _edit_comp($id) {
                return '<a class="text-success" href="\invoice-detail\\'.$id.'" role="button"><i class="fa fa-user" aria-hidden="true"></i></a>';
            }

            $employee = new NewTable();
            $employee->className="table table-dark mt-4 pt-4";
            // array("Peter"=>"35", "Ben"=>"37", "Joe"=>"43");
            $employee->header_details = array(
                "class_name" => "bg-dark text-white",
                "header_data" => array(
                    array("field"=>"id", "value"=>"№", "className"=>"", "scope"=> " ", "action"=>false, "have_icon"=> false),
                    array("field"=>"name", "value"=>"Нэр", "className"=>"", "scope"=> " ", "action"=>false, "have_icon"=> false),
                    array("field"=>"phone", "value"=>"Утас", "className"=>"", "scope"=> " ", "action"=>false, "have_icon"=> false),
                    array("field"=>"id", "value"=>"", "className"=>"", "scope"=> " ", "action"=>true, "have_icon"=> true, "key_name"=> "edit_row"),
                    array("field"=>"id", "value"=>"", "className"=>"", "scope"=> " ", "action"=>true, "have_icon"=> true, "key_name"=> "delete_row")
                )
            );

            $employee->added_datas = array(
                "delete_row" => "_delete_comp",
                "edit_row" => "_edit_comp"
            );

            $employee->body_datas = json_decode(file_get_contents('http://172.26.153.11/api/invoice-list'), true);
            console_log(
               '<div class="container">'.$employee->diplay_table().'</div>'
            );
        }

        protected function invoice_history() {
            echo '<div><h1 class="text-danger">invoice histtory</h1></div>';
        }

        protected function inv_detial() {
            $invoice_form = new InvoiceForm();
            $invoice_id = $this->params['id'];
            $invoice_form->action_uri = '/api/invoice-edit/'.$this->params['id'];
            $data = json_decode(file_get_contents('http://172.26.153.11/api/invoice-detail/'.$invoice_id), true);
            if (count($data)>0) {
                extract($data[0]);
                $invoice_form->fname = $fname;
                $invoice_form->lname = $lname;
                $invoice_form->phone_number = $phone_number;
            }
            echo $invoice_form->display_form();
        }

        protected function inv_save() {
            $invoice_form = new InvoiceForm();
            echo $invoice_form->display_form();
        }

    }

    require ROOT."\\inc\\footer.php"
?>