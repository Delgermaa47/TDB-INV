import React, {Component} from 'react'
import SetFeild from './Fields'
import RecDataTable from './rec_data_table'
import Modal from '../../inc/Modal/Modal'
import { CollectRecDatas } from './collect_invoice_datas'

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

            rec_table_header: [
                "№", "custno", "fname","amount",
                "account", "handphone", 
            ],
            rec_datas: [],
            modal_status: 'closed'

        }
        
        this.handleOnchange = this.handleOnchange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.addInvoiceRec = this.addInvoiceRec.bind(this)
        this.openInvoiceCollector = this.openInvoiceCollector.bind(this)
        this.handleCollectDatas = this.handleCollectDatas.bind(this)
    }

    openInvoiceCollector(datas) {
        this.setState({modal_status: 'open'})
    }

    addInvoiceRec(datas) {
        var rec_datas = [...this.state.rec_datas]
        rec_datas.push(datas)
        this.setState({ rec_datas, modal_status: 'closed' })
    }

    handleCollectDatas() {
        return <CollectRecDatas handleSubmit={this.addInvoiceRec}/>
    }

    handleOnchange(name, e) {
        var name = e.target.name
        var value = e.target.value
        
        var choice_datas = [...this.state.send_datas]
        var value_ind = obj => obj.key == name
        var index_of = choice_datas.findIndex(value_ind)
        if (index_of > -1) {
            choice_datas[index_of]['value'] = value
            this.setState({send_datas: choice_datas})
        }
    }

    handleSubmit() {
        console.log("save")
    }

    render() {
        const { 
            send_datas, rec_datas, rec_table_header,
            modal_status, 
        } = this.state
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
                                {
                                    <RecDataTable
                                        body_data={rec_datas} 
                                        table_header={rec_table_header}
                                    />
                                }
                                <div className='col-md-12'>
                                    <button
                                        className='btn btn-outline-warning text-dark'
                                        onClick={this.openInvoiceCollector}
                                    >Нэхэмжлэгч нэмэх</button>
                                </div>
                                
                            </div>
                            <button
                                type="button"
                                className="btn btn btn-primary col-md-6 mt-4"
                            >
                            Хадгалах
                        </button>
                        </div>
                        {
                            <Modal 
                                modal_status={modal_status}
                                title={'Хүлээн авагчийн мэдээлэл цуглуулах'}
                                text={this.handleCollectDatas}
                            />
                        }
                        
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}