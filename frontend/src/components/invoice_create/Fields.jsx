import React, { Component } from "react"

export default class SetFeild extends Component {
    
    render() {
        const { main_class, label, key, name, classname, value, type } = this.props.values;
        return (
            <div className={`mx-2 ${main_class}`} key={key}>
                <label htmlFor="">{label}</label>
                <input
                    type={type}
                    name={key}
                    className="form-control mx-2 border border-primary"
                    value={value || ''}
                    onChange={(e)=>this.props.handleOnchange(e)}
                />
            </div>
        );
    }
}