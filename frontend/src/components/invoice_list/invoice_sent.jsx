import React, { Component } from "react"
import {PortalDataTable} from '../../inc/DataTable'
import Modal from "../../inc/Modal/Modal"
import { service } from "../service"

export default class InvoiceSend extends Component {

    constructor(props) {

        super(props)
        this.state = {
            жагсаалтын_холбоос: 'http://172.26.153.11/api/invoice-list',
            талбарууд: [
                {'field': 'invno', "title": '№'},
                {'field': 'accntno', "title": 'Хүлээн авах данс'},
                {'field': 'amount', "title": 'Нийт дүн'},
                {'field': 'invstatus', "title": 'Төлөв'},
                {'field': 'invdesc', "title": 'Тайлбар'},
                {'field': 'created_at', "title": 'Хүлээн'},
            ],
            нэмэлт_талбарууд: [
                {
                    "title": 'Засах',
                    "text": '', "icon":
                    'fa fa-pencil-square-o text-success',
                    "action": (values) => this.go_link(values),
                },
                {
                    "title": 'Устгах',
                    "text": '',
                    "icon": 'fa fa-trash-o text-danger',
                    "action": (values) => this.handleRemoveAction(values),
                }
            ],
            refresh: true,
            modal_status: "closed",
            values: {}
        }
        this.handleRemove = this.handleRemove.bind(this)
        this.go_link = this.go_link.bind(this)
        this.handleModalOpen = this.handleModalOpen.bind(this)
        this.handleModalClose = this.handleModalClose.bind(this)
        this.handleRemoveAction = this.handleRemoveAction.bind(this)

    }

    set_active_color(boolean){
        let color = "text-danger fa fa-times"
        if(boolean) color = "text-success fa fa-check"
        return color
    }

    go_link(values){
        this.props.history.push(`/invoice-edit/${values.id}/`)
    }

    handleRemove() {
        const {values} = this.state
        service.remove(values.id).then(({success}) => {
            if (success) {
                this.setState({refresh: !this.state.refresh})
                this.handleModalClose()
            }
        })
    }

    handleModalOpen(){
        this.setState({modal_status: 'open'})
    }

    handleModalClose(){
        this.setState({modal_status: 'closed'})
    }

    handleRemoveAction(values){
        this.setState({values})
        this.handleModalOpen()
    }

    render() {
        const { талбарууд, жагсаалтын_холбоос, хувьсах_талбарууд, нэмэлт_талбарууд, refresh, values, modal_status } = this.state
        console.log("modal status", modal_status)
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <PortalDataTable
                                талбарууд={талбарууд}
                                жагсаалтын_холбоос={жагсаалтын_холбоос}
                                уншиж_байх_үед_зурвас={"Уншиж байна"}
                                хувьсах_талбарууд={хувьсах_талбарууд}
                                нэмэлт_талбарууд={нэмэлт_талбарууд}
                                нэмэх_товч={'/invoice-save'}
                                refresh={refresh}
                            />
                        </div>
                    </div>
                </div>
                {
                    modal_status == 'open'
                    &&
                    <Modal
                        text={`Та "${values.name}" нэртэй тохиргоог устгахдаа итгэлтэй байна уу?`}
                        title={'Тохиргоог устгах'}
                        model_type_icon={'success'}
                        status={modal_status}
                        modalClose={this.handleModalClose}
                        modalAction={this.handleRemove}
                    />
                }
                
            </div>
        )
    }
}
