<?php
    class PopUP {
        public $status;
             
        function __set($propName, $propValue)
        {
            $this->$propName = $propValue;
        }

        function __construct() {
            $this->status = false;
        }

        function show_modal() {
            echo '
                <div class="container">
                    <div class="popup text-primary">
                        <label class="h4 text-center mt-4">Хүлээн авагч</label>
                    </div>
                </div>
            ';
        }

    }
?>