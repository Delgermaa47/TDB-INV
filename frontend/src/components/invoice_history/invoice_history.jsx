import React, {Component} from 'react'


export class InvoiceHistory extends Component {

    constructor(props) {
        super(props)
        this.state={
        }
    }

    componentDidMount() {
        const modal = {
            modal_status: 'open',
            modal_icon: 'fa fa-info-circle',
            icon_color: "warning",
            title: "title ",
        }
        console.log(MODAL)
    }


    render() {
        return (
            <div className="row">
               <label>history</label>
            </div>
        );
    }
}