import React, {Component} from 'react'
import Modal from '../../inc/Modal/Modal'


export class InvoiceCreate extends Component {

    constructor(props) {
        super(props)
        this.state={
        }
    }

    render() {
        const { id } = this.props
        const modal_info = {
            modal_status: 'open',
            modal_icon: 'fa fa-info-circle',
            icon_color: "warning",
            title: "title ",
            text: "bla ",
        }
        console.log("this", this.props)
        return (
            <div className="row">
                <div>

                </div>
            </div>
        );
    }
}