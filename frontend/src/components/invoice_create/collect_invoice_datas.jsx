import React, {Component} from 'react'
import { findIndexOfData } from '../../inc/helpers/service'
import SetFeild from './Fields'

export class CollectRecDatas extends Component {

    constructor(props) {
        super(props)
        this.state={
            send_datas: [
                {
                    "key": "invno",
                    "type": "number",
                    "value": null,
                    "label": "Invoice Дугаар",
                    "classname": "col-md-6"
                },
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
                "№", "invno", "custno", "fname","amount",
                "account", "handphone", 
            ],
            modal_status: 'closed'

        }
        
        this.handleOnchange = this.handleOnchange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    
    }

    handleOnchange(e) {
        var name = e.target.name
        var value = e.target.value
        var choice_datas = [...this.state.send_datas]
        var index_of = findIndexOfData(choice_datas, 'key', name)
        if (index_of > -1) {
            choice_datas[index_of]['value'] = value
            this.setState({send_datas: choice_datas})
        }
    }

    handleSubmit() {
        var { send_datas } = this.state
        var invno_index = findIndexOfData(send_datas, 'key', 'invno')
        var cust_index = findIndexOfData(send_datas, 'key', 'custno')
        var fname_index = findIndexOfData(send_datas, 'key', 'fname')
        var amount_index = findIndexOfData(send_datas, 'key', 'amount')
        var account_index = findIndexOfData(send_datas, 'key', 'account')
        var handphone_index = findIndexOfData(send_datas, 'key', 'handphone')

        var values = {
            "invno": send_datas[invno_index]['value'], 
            "custno": send_datas[cust_index]['value'], 
            "fname": send_datas[fname_index]['value'],
            "amount": send_datas[amount_index]['value'],
            "account": send_datas[account_index]['value'], 
            "handphone": send_datas[handphone_index]['value'] 
        }
        this.props.handleSubmit(values)

        var temp_arr = [...send_datas]
        temp_arr.forEach(element => {
            element['value'] = ''
        });

        this.setState({ send_datas: temp_arr })
    }

    render() {
        const { 
            send_datas
        } = this.state
        return (
            <div className='border border-primary row'>
            {
                send_datas.map((datas, idx) =>
                <SetFeild
                        key={idx}
                        values={datas}
                        handleOnchange={this.handleOnchange}
                    />
                )
            }
            <button
                type="button"
                className="btn btn btn-primary col-md-12 mt-4"
                onClick={this.handleSubmit}
            >
                Хадгалах
            </button>
            </div>
        );
    }
}