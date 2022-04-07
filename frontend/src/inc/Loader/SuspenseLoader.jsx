import React, { Component } from 'react'
import './style.css'


export default class SuspenseLoader extends Component {

    render() {
        const {color, is_loading, text} = this.props
        if (is_loading) {
            return (
                <div className="suspense-loader text-center">
                    <div>
                        <i className="fa fa-spinner fa-pulse fa-3x fa-fw" style={{color: color ? color : '#0088CA'}}></i>
                        <br/>
                        <p style={{color: color ? color : '#0088CA'}}>{text ? text : 'Түр хүлээнэ үү...'}</p>
                    </div>
                </div>
            )
        }

        return null
    }
}
