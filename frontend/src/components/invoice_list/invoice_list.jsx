import React, {Component} from 'react'
import InvoiceSend from './invoice_sent';

export class InvoiceList extends Component {

    constructor(props) {
        super(props)
        this.state={
        }
    }

    render() {
        return (
            <div className="row">
               <label>Илгээсэн</label>
               <InvoiceSend />
            </div>
        );
    }
}