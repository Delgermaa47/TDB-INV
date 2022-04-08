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
            <div className='card'>
                <div className="card-body">
                    <div className="row">

                    </div>
                    <label className='text-dark text-uppercase font-weight-bold my-4'>Илгээсэн</label>
                    <InvoiceSend /> 
                </div>
                
            </div>
        );
    }
}