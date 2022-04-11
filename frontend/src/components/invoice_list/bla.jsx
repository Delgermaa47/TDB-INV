import React, { Component } from "react"
import { NavLink } from "react-router-dom";
import {PortalDataTable} from '../../inc/DataTable'
import Modal from "../../inc/Modal/Modal"
import { service } from "../service"

export default class Welcomebla extends Component {
    render() {
        return (
            <a
                className="fa fa-pencil text-success"
                role="button"
                href="/invoice-save"
            />
        );
    }
}