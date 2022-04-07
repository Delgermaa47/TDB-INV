// import './App.css';

// function App() {
//   return (
//    <div>done</div>
//   );
// }

// export default App;



import React, {Component, Fragment} from 'react'
import {
  Routes, Route
} from "react-router-dom";

import { InvoiceList } from './components/invoice_list';

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
               </Routes>
            </div>
        );
    }
}