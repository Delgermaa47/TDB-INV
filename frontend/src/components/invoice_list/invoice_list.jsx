import React, {Component} from 'react'
import InvoiceSend from './invoice_sent';
import InvoiceRec from './invoice_rec';

export class InvoiceList extends Component {

    constructor(props) {
        super(props)
        this.state={
        }
    }

    render() {
    return (
            <div className='card'>
                <div className="card-body">
                    <label className='text-dark text-uppercase font-weight-bold my-4'>Илгээсэн</label>
                    <InvoiceSend /> 
                </div>
                <div className="card-body">
                    <label className='text-dark text-uppercase font-weight-bold my-4'>Хүлээн авсан</label>
                    <InvoiceRec /> 
                </div>
            </div>
        );
    }
}