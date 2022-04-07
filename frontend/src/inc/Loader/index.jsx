import React, { Component } from 'react'
import './style.css'

export default class Loader extends Component {

    render() {

        if (this.props.is_loading) {
            return (
                <div className="gp-loader text-center">
                    <div>
                        <i className={`${this.props.className ? this.props.className : "fa fa-spinner fa-pulse fa-3x fa-fw"}`}></i>
                        <br/>
                        {this.props.text ? this.props.text : 'Түр хүлээнэ үү...'}
                    </div>
                </div>
            )
        }

        return null
    }
}
