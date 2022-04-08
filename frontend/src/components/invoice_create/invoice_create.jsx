import React, {Component} from 'react'
import Modal from '../../inc/Modal/Modal'


export class InvoiceCreate extends Component {

    constructor(props) {
        super(props)
        this.state={
        }
    }

    render() {
        const modal_info = {
            modal_status: 'open',
            modal_icon: 'fa fa-info-circle',
            icon_color: "warning",
            title: "title ",
            text: "bla ",
        }
        return (
            <div className="row">
               <Modal
                    modal_status={'open'}
                    modal_icon={modal_info.modal_icon}
                    icon_color={modal_info.icon_color}
                    title={modal_info.title}
                    text={modal_info.text}
                />
            </div>
        );
    }
}