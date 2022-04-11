import React, { Component } from "react"

export default class RecDataTable extends Component {
    
    constructor(props) {
        super(props)
        this.state={
        }
    }
    
    render() {
        const { table_header, body_data } = this.props
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
                                table_header.map((head, idy) =>
                                head === '№' ?
                                <td key={idy}>{idy+1}</td>
                                :                            
                                <td key={idy}>{item[head] || ''}</td>

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