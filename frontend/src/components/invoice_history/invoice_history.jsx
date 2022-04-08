import React, {Component} from 'react'
import Modal from '../../inc/Modal/Modal'


export class InvoiceHistory extends Component {

    constructor(props) {
        super(props)
        this.state={
        }
    }

    componentDidMount() {
       
    }


    render() {
         const modal_info = {
            modal_status: 'open',
            modal_icon: 'fa fa-info-circle',
            icon_color: "warning",
            title: "title ",
        }
        return (
            <div className="row">
               <label>history</label>
               <Modal
                    modal_status={'open'}
                    modal_icon={modal_info.modal_icon}
                    modal_bg={modal_info.modal_bg}
                    custom_width={modal_info.custom_width}
                    icon_color={modal_info.icon_color}
                    text={modal_info.text}
                    title={modal_info.title}
                />
            </div>
        );
    }
}