
import React, {Component} from 'react'
import {
  Routes, Route
} from "react-router-dom";

import { InvoiceCreate } from './components/invoice_create/invoice_create';
import { InvoiceHistory } from './components/invoice_history/invoice_history';
import { InvoiceList } from './components/invoice_list/invoice_list';

import './App.css';

 export default class App extends Component {

    constructor(props) {
        super(props)
        this.state={
        }
    }

    render() {
        return (
            <div className="container">
               <Routes>
                   <Route 
                        path="/"
                        element={<InvoiceList/>}
                    />
                    <Route 
                        path="/invoice-save"
                        element={<InvoiceCreate/>}
                    />
                    <Route 
                        path="/invoice-history"
                        element={<InvoiceHistory/>}
                    />
               </Routes>
            </div>
        );
    }
}