import React, { Component } from "react"

export default class RecDataTable extends Component {
    
    constructor(props) {
        super(props)
        this.state={
        }
    }
    
    render() {
        const { table_header, body_data } = this.props
        console.log("table_header", table_header)
        return (
            <table className="table table_wrapper_table">
                <thead className={`bg-primary text-primary`}>
                    <tr>
                        {
                            table_header.map((header, idx) =>
                            <th key={idx} scope="col" className={`bg-dark`}>{header}</th>
                          )
                        }
                    </tr>
                </thead>
                <tbody>
                {
                    body_data.map((item, idx) =>
                    <tr className="tr-hover" key={idx}>
                         {
                                table_header.map((head, idx) =>
                                                                
                                <td >{item[head] || ''}</td>

                                )
                         }
                      
                    </tr>
                    // <tr className="tr-hover" key={idx}>
                    //     <td >{item}</td>
                    // </tr>
                    )
                
                }
                    
                </tbody>
        </table>
        );
    }
}