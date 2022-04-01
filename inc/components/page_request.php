
<?php
    require_once ROOT."\\inc\\header.php";
    require_once ROOT."\\inc\\components\\table.php";

    
    class PageRequest
    {
        public $request_url;
        public $request_params;
        function __set($propName, $propValue)
        {
            $this->$propName = $propValue;
        }

        protected function page404() {
            console_log(
                '<div class="page404">
                    <span>404</span>      
                    <p>page not found</p>
                </div>
                '
            );
            
        }
        
        public function request_res() {
            if($this->request_url === '/') {
                $this->navbar();
                $this->home();
            }
            elseif(strstr($this->request_url, "invoice-history")) {
                $this->navbar();
                $this->invoice_history();
            }
            elseif(strstr($this->request_url, "invoice-detail")) {
                $this->navbar();
                $this->inv_detial();
            }
            elseif(strstr($this->request_url, "invoice-cancel")) {

            }
            elseif(strstr($this->request_url, "invoice-history-detail")) {

            }
            elseif(strstr($this->request_url, "invoice-save")) {
                $this->navbar();
                $this->inv_save();

            }

            elseif(strstr($this->request_url, "invoice-detail")) {

            }
            else $this->page404();

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
                $api_name = '\delete-invoice\\'.$id;
                return '
                    <a class="text-danger" href="\api\delete-invoice\\'.$id.'" role="button"><i class="fa fa-trash" aria-hidden="true"></i></a>
                ';
            }

            function _edit_comp($id) {
                return '<a class="text-success" ="\api\edit-invoice\\'.$id.'"><i class="fa fa-trash" aria-hidden="true"></i></a>';
            }
            
            $employee = new NewTable();
            $employee->className="table table-dark mt-4 pt-4";
            $employee->header_details= json_decode('{
                "class_name": "bg-dark text-white",
                "header_data":[
                    {"field":"id", "value":"№", "className":"", "scope": " ", "action":false, "have_icon": false},
                    {"field":"name", "value":"Name", "className":"", "scope": " ", "action":false, "have_icon": false},
                    {"field":"phone", "value":"Phone Number", "className":"", "scope": " ", "action":false, "have_icon": false},
                    {"field":"id", "value":"", "className":"", "scope": " ", "action":true, "have_icon": true, "key_name": "delete_row"},
                    {"field":"id", "value":"", "className":"", "scope": " ","action":true, "have_icon": true, "key_name": "edit_row"}
                ]
            }', true);

            $employee->added_datas = json_decode('
            {
                "delete_row": "_delete_comp",
                "edit_row": "_edit_comp"
            }
            ', true);

            $employee->body_datas = json_decode(file_get_contents('http://172.26.153.11/api/invoice-list'), true);
            console_log(
               '<div class="container">'.$employee->diplay_table().'</div>'
            );
        }

        protected function invoice_history() {
            echo '<div><h1 class="text-danger">invoice histtory</h1></div>';
        }

        protected function inv_detial() {
            echo '<div><h1 class="text-danger">invoice detail</h1></div>';
        }

        protected function inv_save() {
            echo '<div><h1 class="text-danger">invoice save</h1></div>';
        }

    }

    require ROOT."\\inc\\footer.php"
?>