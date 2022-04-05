<?php
    class InvoiceForm {
        public $fname;
        public $recfname;
        public $cip;
        public $all_amount;
        public $current_amount;
        public $fromcustno;
        public $fromaccntno;
        public $tocustno;
        public $toaccntno;
        public $invstatus;
        public $created_at;
        public $invdesc;
        public $tophone;
        
        public function __construct() {
            $this->action_uri ='/api/invoice-save';
        }
     
        protected function _display_in_label($label, $key, $value, $classname='col-md-6', $main_class='col-md-6') {
            $content  = ' 
            <div className="'.$main_class.'">
                <label htmlFor="" class="'.$classname.'">'.$label.'</label>
                <input
                    type="text"
                    name='.$key.'
                    class="rounded col-5 mt-4"
                    value='.$value.'
                ></input>
            </div>';
            return $content;
        }
           
        protected function _append_datas($datas) {
            $current_data = '';
            
            foreach ($datas as $key =>  &$value) {
                extract($value);
                $current_data = $current_data.$this -> _display_in_label($label, $key, $value, $classname);
            }
            return $current_data;
        }


        public function display_form() {
        
            $send_keys = [
                ['key'=>'fromcustno', 'value'=>$this->fromcustno, 'label'=>'Sip Дугаар', 'classname'=>'col-md-6'],
                ['key'=>'fname', 'value'=>$this->fname, 'label'=>'Нэр', 'classname'=>'col-md-6'],
                ['key'=>'all_amount', 'value'=>$this->all_amount, 'label'=>'Нийт дүн', 'classname'=>'col-md-6'],
                ['key'=>'fromaccntno', 'value'=>$this->fromaccntno, 'label'=>'Данс', 'classname'=>'col-md-6'],
                ['key'=>'tophone', 'value'=>$this->tophone, 'label'=>'Хүлээн авагчийн дугаар', 'classname'=>'col-md-6']
            ];

            $rec_keys = [
                ['key'=>'tocustno', 'value'=>$this->tocustno, 'label'=>'Sip Дугаар', 'classname'=>'col-md-6'],
                ['key'=>'recfname', 'value'=>$this->recfname, 'label'=>'Нэр', 'classname'=>'col-md-6'],
                ['key'=>'current_amount', 'value'=>$this->current_amount, 'label'=>'Нийт дүн', 'classname'=>'col-md-6'],
                ['key'=>'toaccntno', 'value'=>$this->fromaccntno, 'label'=>'Данс', 'classname'=>'col-md-6'],
                ['key'=>'fromaccntno', 'value'=>$this->fromaccntno, 'label'=>'Хүлээн авагчийн дугаар', 'classname'=>'col-md-6']
            ];

            $both_keys = [
                ['key'=>'invstatus', 'value'=>$this->invstatus, 'label'=>'Төлөв', 'classname'=>'col-md-9'],
                ['key'=>'status_name', 'value'=>$this->status_name, 'label'=>'Нэр', 'classname'=>'col-md-9'],
                ['key'=>'invdesc', 'value'=>$this->invdesc, 'label'=>'Тайлбар', 'classname'=>'col-md-9']
            ];

            $sender_data =  $this->_append_datas($send_keys);
            $recieve_data = $this->_append_datas($rec_keys);
            $both_data = $this->_append_datas($both_keys);

            echo '
            <div class="container text-primary">
                <form action="'.$this->action_uri.'" method="POST">
                    <div className="row">
                        <div class="form-row col-md-6 border-bottom border-danger">
                            <label>Илгээгч</label>
                            '.$sender_data.'
                        </div>
                        <div class="form-row col-md-6">
                            <label>Хүлээн авагч</label>
                            '.$recieve_data.'
                        </div>
                        <div class="form-row col-md-12 mt-4">
                            '.$both_data.'
                        </div>
                        
                        <button
                            type="submit"
                            class="btn btn btn-primary col-md-6 mt-4"
                        >
                        Хадгалах
                    </button>
                    </div>
                </form>
            </div>';
        }
        
    }
    
?>