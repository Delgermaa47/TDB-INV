import React, { Component } from "react"

export default class RedirectCom extends Component {
    render() {
        const { invno } = this.props.values;
        return (
            <a
                className="fa fa-pencil text-success"
                role="button"
                href={`/invoice-save/${invno}/`}
            />
        );
    }
}