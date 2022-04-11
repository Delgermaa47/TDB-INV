import React, { Component } from "react"

export default class RecDataTable extends Component {
    
    constructor(props) {
        super(props)
        this.state={
        }
    }
    
    render() {
        const { table_header } = this.props
        return (
            <table className="table table_wrapper_table">
                <thead className={`bg-primary text-primary`}>
                    <tr>
                        {
                            table_header.map((header, idx) =>
                            <th scope="col" className={`bg-dark`}>{header}</th>
                          )
                        }
                    </tr>
                </thead>
                <tbody>
                </tbody>
        </table>
        );
    }
}