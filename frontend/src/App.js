
import React, {Component} from 'react'
import {
  Routes, Route
} from "react-router-dom";

import { InvoiceCreate } from './components/invoice_create/invoice_create';
import { InvoiceHistory } from './components/invoice_history/invoice_history';
import { InvoiceList } from './components/invoice_list/invoice_list';
// import { DisplayNotif } from './inc/Notification';
// import DisplayModal from './inc/Modal/DisplayModal';

 export default class App extends Component {

    constructor(props) {
        super(props)
        this.state={
        }
        this.getModalFunc = this.getModalFunc.bind(this)
        this.getNotifFunc = this.getNotifFunc.bind(this)

    }

    getModalFunc(setModal) {
        global.MODAL = setModal 
    }

    getNotifFunc(setNotif) {
        global.NOTIF = setNotif
    }

    render() {
        return (
            <div className="container">
                {/* <DisplayModal getModalFunc={this.getModalFunc}/> */}
                {/* <DisplayNotif getNotifFunc={this.getNotifFunc}/> */}
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
                        path="/invoice-edit/:id/"
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