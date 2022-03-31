
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
                                            <a class="nav-link  col-md-12"  href="\invoice-create">Нэхэмжлэл Үүсгэх</a>
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

            $employee->body_datas = json_decode(file_get_contents('http://172.26.153.11/api/invoice-list'), true);
            console_log(
               '<div class="container">'.$employee->diplay_table().'</div>'
            );
        }

        protected function invoice_history() {
            return '<div><h1 class="text-danger">invoice histtory</h1></div>';
        }

        protected function inv_detial() {
            return '<div><h1 class="text-danger">invoice detail</h1></div>';
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

            }
            elseif(strstr($this->request_url, "invoice-cancel")) {

            }
            elseif(strstr($this->request_url, "invoice-history-detail")) {

            }
            elseif(strstr($this->request_url, "invoice-save")) {

            }

            elseif(strstr($this->request_url, "invoice-detail")) {

            }
            else $this->page404();

        }

    }

    require ROOT."\\inc\\footer.php"
?>