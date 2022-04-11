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
                <div>done</div>
            </div>
        );
    }
}