<?php
    class InvoiceForm {
        public $fname;
        public $lname;
        public $phone_number;
        public function display_form() {

            echo '
            <div class="container text-primary">
                <form action="/api/invoice-save" method="POST">
                    <div className="row">
                        <div class="form-row col-md-8">
                            <div className="col-md-12 mt-4">
                                <label htmlFor="" class="col-md-3">Нэр</label>
                                <input
                                    type="text"
                                    name="fname"
                                    class="rounded col-5 mt-4"
                                    value='.$this->fname.'
                                ></input>
                            </div>
                            <div className="col-md-12 mt-4">
                                <label htmlFor="" class="col-md-3">Овог</label>
                                <input
                                    type="text"
                                    name="lname"
                                    class="rounded col-5 mt-4"
                                    value='.$this->lname.'
                                ></input>
                            </div>
                            <div className="col-md-12 mt-4">
                                <label htmlFor="" class="col-md-3">Дугаар</label>
                                <input
                                    type="text"
                                    name="phone_number"
                                    class="rounded col-5 mt-4"
                                    ></input>
                            </div>
                            <button
                                type="submit"
                                class="btn btn btn-primary col-md-6 mt-4"
                            >
                                Хадгалах
                            </button>
                        </div>
                    </div>
                </form>
            </div>';
        }
        
    }
    
?>