// import './App.css';

// function App() {
//   return (
//    <div>done</div>
//   );
// }

// export default App;



import React, {Component} from 'react'
import {
  Routes, Route
} from "react-router-dom";

import { InvoiceList } from './components/invoice_list';
import { InvoiceCreate } from './components/invoice_create';
import { InvoiceHistory } from './components/invoice_history';


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