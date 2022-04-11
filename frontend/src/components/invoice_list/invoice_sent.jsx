import React, { Component } from "react"
import {PortalDataTable} from '../../inc/DataTable'
import Modal from "../../inc/Modal/Modal"
import { service } from "../service"
import RedirectCom from "./redi";



export default class InvoiceSend extends Component {

    constructor(props) {

        super(props)
        this.state = {
            жагсаалтын_холбоос: 'http://172.26.153.11/api/invoice-list',
            талбарууд: [
                {'field': 'invno', "title": '№'},
                {'field': 'custno', "title": 'Хүлээн авагч'},
                {'field': 'accntno', "title": 'Хүлээн авах данс'},
                {'field': 'amount', "title": 'Нийт дүн'},
                {'field': 'invstatus', "title": 'Төлөв'},
                {'field': 'invdesc', "title": 'Тайлбар'},
                {'field': 'created_at', "title": 'Огноо'},
            ],
            нэмэлт_талбарууд: [
                {
                    "title": 'Засах',
                    "text": '', 
                    "icon": 'fa fa-pencil text-success',
                    // "action": (values) => Welcome(values),
                    "component": RedirectCom,
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
        this.props.history.push(`/invoice-edit/${values.invno}/`)
    }

    handleRemove() {
        const {values} = this.state
        service.remove(values.invno).then(({success}) => {
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
                                refresh={refresh}
                                per_page={1}
                            />
                        </div>
                    </div>
                </div>
                {
                    modal_status == 'open'
                    &&
                    <Modal
                        text={`Та "${values.invno}" дугаартай нэхэмжлэлийг устгахдаа итгэлтэй байна уу?`}
                        title={'Тохиргоог устгах'}
                        modal_icon={'text-warning fa fa-warning'}
                        model_type_icon={'success'}
                        status={modal_status}
                        has_button={ true }
                        modalClose={this.handleModalClose}
                        modalAction={this.handleRemove}
                    />
                }
                
            </div>
        )
    }
}
