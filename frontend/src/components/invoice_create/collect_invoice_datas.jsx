import React, {Component} from 'react'
import SetFeild from './Fields'

export class CollectRecDatas extends Component {

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
        this.findIndexOfData = this.findIndexOfData.bind(this)
    }

    findIndexOfData(arr_datas, key, value) {
        var value_of_data = obj => obj[key] === value
        var index_of = arr_datas.findIndex(value_of_data)
        return index_of
    }

    handleOnchange(e) {
        console.log("sdfsfds", e.target.name)
        var name = e.target.name
        var value = e.target.value
        var choice_datas = [...this.state.send_datas]
        var index_of = this.findIndexOfData(choice_datas, 'key', name)
        if (index_of > -1) {
            choice_datas[index_of]['value'] = value
            this.setState({send_datas: choice_datas})
        }
    }

    handleSubmit() {
        var { send_datas } = this.state
        var cust_index = this.findIndexOfData(send_datas, 'key', 'custno')
        var fname_index = this.findIndexOfData(send_datas, 'key', 'fname')
        var amount_index = this.findIndexOfData(send_datas, 'key', 'amount')
        var account_index = this.findIndexOfData(send_datas, 'key', 'account')
        var handphone_index = this.findIndexOfData(send_datas, 'key', 'handphone')

        var values = {
            "custno": send_datas[cust_index]['value'], 
            "fname": send_datas[fname_index]['value'],
            "amount": send_datas[amount_index]['value'],
            "account": send_datas[account_index]['value'], 
            "handphone": send_datas[handphone_index]['value'] 
        }
        this.props.handleSubmit(values)
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