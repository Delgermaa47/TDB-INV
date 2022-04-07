import React, { Component } from "react"
import {GPIcon} from "@utils/Tools"


export class TableBody extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        var { idx, талбарууд, values, хувьсах_талбарууд, нэмэлт_талбарууд, хувьсах_талбаруудын_өгөгдлүүд } = this.props
        return (
            <tr className="tr-hover">
                <td style={{width: "40px"}}>{idx}</td>
                {талбарууд.map((item, idx) =>
                    item.has_action
                    ?
                        хувьсах_талбарууд.map((хувьс, index) =>
                            хувьс.field == item.field
                            &&
                                <td key={idx} className={`${item.is_center ? "text-center " : ' '}`} style={{width: хувьс.width ? хувьс.width : null}}>
                                    {
                                        хувьс.component
                                        ?
                                            <хувьс.component values={values} {...хувьс.props} хувьсах_талбаруудын_өгөгдлүүд={хувьсах_талбаруудын_өгөгдлүүд} collectRequestIds={this.props.collectRequestIds} collect_ids={this.props.collect_ids}/>
                                        :
                                            хувьс.action_type
                                            ?
                                                <span className={хувьс.action(values[item.field], хувьсах_талбаруудын_өгөгдлүүд)}>
                                                    {
                                                        хувьс.text
                                                        ?
                                                            хувьс.text
                                                        :
                                                            values[item.field]
                                                    }
                                                </span>
                                            :
                                                <a role="button" className="text-primary" onClick={() => хувьс.action(values, хувьсах_талбаруудын_өгөгдлүүд)}>
                                                    {values[item.field]}
                                                </a>
                                    }
                                </td>
                        )
                    :
                        <td key={idx} className={`${item.width ? 'text-wrap' : ''}`} style={{width: item.width ? item.width : null}}>{values[item.field]}</td>
                )}
                {нэмэлт_талбарууд.map((item, idx) =>
                    <td key={idx} style={{width: item.width ? item.width : null}}>
                        {
                            item.component
                            ?
                                <item.component values={values} {...item.props} хувьсах_талбаруудын_өгөгдлүүд={хувьсах_талбаруудын_өгөгдлүүд} collectRequestIds={this.collectRequestIds} collect_ids={this.props.collect_ids}/>
                            :
                                <a role="button" onClick={() => item.action(values)}>
                                    {
                                        item.text
                                        ?
                                            item.text
                                        :
                                            <GPIcon icon={item.icon} hover_color={'white'}></GPIcon>
                                    }
                                </a>
                        }
                    </td>
                )}
            </tr>
        )
    }

}
