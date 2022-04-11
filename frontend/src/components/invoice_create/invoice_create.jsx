import React, {Component} from 'react'
import SetFeild from './Fields'


export class InvoiceCreate extends Component {

    constructor(props) {
        super(props)
        this.state={
            send_datas: [
                {
                  "key": "custno",
                  "type": "text",
                  "value": null,
                  "label": "Sip Дугаар",
                  "classname": "col-md-6"
                },
                {
                  "key": "fname",
                  "type": "text",
                  "value": null,
                  "label": "Нэр",
                  "classname": "col-md-6"
                },
                {
                  "key": "amount",
                  "type": "number",
                  "value": null,
                  "label": "Нийт дүн",
                  "classname": "col-md-6"
                },
                {
                  "key": "account",
                  "type": "text",
                  "value": null,
                  "label": "Хүлээн авах данс",
                  "classname": "col-md-6"
                },
                {
                  "key": "handphone",
                  "type": "text",
                  "value": null,
                  "label": "Хүлээн авагчийн дугаар",
                  "classname": "col-md-6"
                },
                {
                    "key": "invdesc",
                    "type": "text",
                    "value": null,
                    "label": "Тайлбар",
                    "classname": "col-md-9"
                }
              ],

        }
        
        this.handleOnchange = this.handleOnchange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleOnchange(name, e) {
        console.log("name", e.target.name)
        console.log(name, e.target.value)

    }

    handleSubmit() {
        console.log("save")
    }

    render() {
        const { send_datas } = this.state
        return (
            <div className="row">
                <div className='card'>
                    <div className='card-body'>
                    <div className="container text-primary">
                        <div className="row">
                            <div className="form-row col-md-6">
                                <label className='col-md-12'>Илгээгч</label>
                                {
                                    send_datas.map((datas, idx) =>
                                    <SetFeild
                                        key={idx}
                                        values={datas}
                                        handleOnchange={this.handleOnchange}
                                    />
                                )
                                }
                            </div>
                            <div className="form-row col-md-6">
                                <label>Хүлээн авагч</label>
                            </div>
                            <button
                                type="submit"
                                className="btn btn btn-primary col-md-6 mt-4"
                            >
                            Хадгалах
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}