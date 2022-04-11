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
        var { send_datas } = this.state
        var values = {
            "custno": send_datas['custno'], 
            "fname": send_datas['fname'],
            "amount": send_datas['amount'],
            "account": send_datas['account'], 
            "handphone": send_datas['handphone'] 
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