import React, { Component } from "react"
import {service} from "./service"
import {TableBody} from './TableBody'
import { Pagination } from "./Pagination"
import {NavLink} from "react-router-dom"
import Loader from '../Loader'

export class PortalDataTable extends Component {

    constructor(props) {
        super(props)
        this.state = {
            items: [],
            items_length: null,
            current_page: 1,
            per_page: props.per_page || 20,
            query: '',
            уншиж_байгаа_эсэх: false,
            талбарууд: props.талбарууд,
            жагсаалтын_холбоос: props.жагсаалтын_холбоос,
            хоосон_байх_үед_зурвас: props.хоосон_байх_үед_зурвас || 'Хоосон байна.',
            уншиж_байх_үед_зурвас: props.уншиж_байх_үед_зурвас || 'Уншиж байна.',
            хувьсах_талбарууд: props.хувьсах_талбарууд || [],
            нэмэлт_талбарууд: props.нэмэлт_талбарууд || [],
            нэмэх_товч: props.нэмэх_товч || '',
            хайлт: props.хайлт || "open",
            sort_name: props.sort_name || '',
            color: props.color || "dark",
            max_data: props.max_data || 'open',
            table_head_color: props.table_head_color || 'white',
            start_index: 1,
            нэгдсэн_хүсэлт: props.нэгдсэн_хүсэлт || false,
            search_value: '',
            has_search_button: this.props.has_search_button || false,
            хувьсах_талбаруудын_өгөгдлүүд: '',
            урт_хуудаслалт: this.props.урт_хуудаслалт || false,
            нэмэгдэл_өгөгдөл: []

        }
        this.paginate = this.paginate.bind(this)
        this.handleSearch=this.handleSearch.bind(this)
        this.handleSort = this.handleSort.bind(this)
    }

    handleSort(sort_name, sort_type) {
        if(sort_type){
            this.setState({[sort_name]: false, sort_name})
        }else{
            this.setState({[sort_name]: true, sort_name: '-' + sort_name})
        }
    }

    paginate (page, query, sort_name, per_page, custom_query) {
        const { жагсаалтын_холбоос } = this.state
        this.setState({ уншиж_байгаа_эсэх: true })
        return service
            .list(жагсаалтын_холбоос, page, per_page, query, sort_name, custom_query)
            .then(page => {
                this.setState({ items: page.items, items_length: page.items.length, уншиж_байгаа_эсэх: false, start_index: page.start_index, хувьсах_талбаруудын_өгөгдлүүд: page.items_evl, нэмэгдэл_өгөгдөл: page.added_datas })
                return page
            })
    }

    handleSearch(field, e) {
        if(e.target.value.length >= 1)
        {
            this.setState({ [field]: e.target.value })
        }
        else
        {
            this.setState({ [field]: e.target.value })
        }
    }

    componentDidUpdate(pp, ps){
        if(pp.refresh !== this.props.refresh){
            this.setState({ refresh: this.props.refresh })
        }
        if(pp.жагсаалтын_холбоос !== this.props.жагсаалтын_холбоос) {
            this.setState({ жагсаалтын_холбоос: this.props.жагсаалтын_холбоос })
        }
        if(pp.нэмэх_товч !== this.props.нэмэх_товч) {
            this.setState({ нэмэх_товч: this.props.нэмэх_товч })
        }
        if(pp.нэмэлт_талбарууд !== this.props.нэмэлт_талбарууд) {
            this.setState({ нэмэлт_талбарууд: this.props.нэмэлт_талбарууд })
        }

        if(ps.нэмэгдэл_өгөгдөл !== this.state.нэмэгдэл_өгөгдөл) {
            if( this.props.getValues) this.props.getValues(this.state.нэмэгдэл_өгөгдөл)
        }
    }

    render() {
        const { items, current_page, items_length, per_page,
            талбарууд, хоосон_байх_үед_зурвас, нэмэх_товч, уншиж_байх_үед_зурвас,
            уншиж_байгаа_эсэх, хувьсах_талбарууд, нэмэлт_талбарууд,
            хайлт, color, max_data, table_head_color, start_index,
            нэгдсэн_хүсэлт, has_search_button, search_value, хувьсах_талбаруудын_өгөгдлүүд,
            урт_хуудаслалт
        } = this.state
        return (
            <div>
                {
                    хайлт === "closed" && нэмэх_товч === '' && max_data === 'closed'
                    ?
                        null
                    :
                        <div className="row">
                            {
                                хайлт === "open" && has_search_button
                                ?
                                    <div className="search-bar">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Хайх"
                                            onChange={(e) => this.handleSearch('search_value', e)}
                                            onKeyPress={e => e.key === 'Enter' && this.setState({ query: search_value })}
                                            value={ search_value }
                                        />
                                        <a
                                            role='button'
                                            onClick={() => this.setState({ query: search_value })}
                                        >
                                            <i className="icon-magnifier"></i>
                                        </a>
                                    </div>
                                :
                                    <div className="search-bar">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Хайх"
                                            onChange={(e) => this.handleSearch('query', e)}
                                            value={this.state.query}
                                        />
                                        <a><i className="icon-magnifier"></i></a>
                                    </div>
                            }
                            {
                                max_data === 'open'
                                &&
                                    <div className="col-xl-4 col-sm-4">
                                        <div className="row text-right">
                                            <div className="col">
                                                <p className={`text-right mt-1 text-${color}`}>Өгөгдлийн хэмжээ:&nbsp;</p>
                                            </div>
                                            <div className="row">
                                                <select className="form-control form-control-sm" value={per_page} onChange={(e) => this.setState({per_page: e.target.value})}>
                                                    <option value="10">10</option>
                                                    <option value="20">20</option>
                                                    <option value="30">30</option>
                                                    <option value="40">40</option>
                                                    <option value="50">50</option>
                                                    <option value="100">100</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                            }
                            {
                                ( нэгдсэн_хүсэлт || нэмэх_товч )
                                &&
                                    <div className="col">
                                        {
                                            нэмэх_товч
                                            &&
                                            <div className="float-sm-right">
                                                <NavLink className="btn gp-btn-primary waves-effect waves-light btn-sm mr-2" to={нэмэх_товч}>
                                                    Нэмэх
                                                </NavLink>
                                            </div>
                                        }
                                        {
                                            нэгдсэн_хүсэлт && this.props.collect_ids && Object.keys(this.props.collect_ids).length >0
                                            &&
                                            <div className="float-sm-right">
                                                <button
                                                    className="btn btn-primary waves-effect waves-light btn-sm mr-2"
                                                    onClick={this.props.totalRequestActive}
                                                >
                                                    {
                                                        this.props.request_button_name
                                                        ?
                                                            this.props.request_button_name
                                                        :
                                                            <i className="fa fa-podcast px-2" aria-hidden="true"></i>
                                                    }
                                                </button>
                                            </div>
                                        }
                                    </div>
                            }
                        </div>
                }
                <div className="row my-2">
                    <div className="col-lg-12">
                        <div className="table-responsive table_wrapper">
                            <Loader is_loading={уншиж_байгаа_эсэх} text={уншиж_байх_үед_зурвас}/>
                            <table className="table table_wrapper_table">
                                <thead className={`bg-primary text-${table_head_color}`}>
                                    <tr>
                                        <th scope="col" className={`bg-${color}`}>№</th>
                                        {талбарууд.map((item, index) =>
                                            item.is_sort
                                            ?
                                                <th key={index}>
                                                    {item.title}
                                                </th>
                                            :
                                                <th key={index} onClick={() => this.handleSort(item.field, this.state[item.field])} key={index} className={`bg-${color} ${item.is_center ? 'text-center' : null}`}>
                                                    {item.title}&nbsp;
                                                    <a><i className={this.state[item.field] ? "fa fa-caret-up" : "fa fa-caret-down"} aria-hidden="true"></i></a>
                                                </th>
                                        )}
                                        {(нэмэлт_талбарууд && нэмэлт_талбарууд.length >0 ) && нэмэлт_талбарууд.map((item, index) =>
                                            <th className={`bg-${color}`} key={index}>{item.title}</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        !уншиж_байгаа_эсэх
                                        &&
                                            (items_length === 0
                                            ?
                                                <tr><td>{хоосон_байх_үед_зурвас}</td></tr>
                                            :
                                                items.map((login, idx) =>
                                                    <TableBody
                                                        талбарууд={талбарууд}
                                                        key={idx}
                                                        idx={start_index + idx}
                                                        values={login}
                                                        хувьсах_талбаруудын_өгөгдлүүд={хувьсах_талбаруудын_өгөгдлүүд}
                                                        хувьсах_талбарууд={хувьсах_талбарууд}
                                                        нэмэлт_талбарууд={нэмэлт_талбарууд}
                                                        collect_ids={this.props.collect_ids}
                                                        collectRequestIds={this.props.collectRequestIds}
                                                    >
                                                    </TableBody>
                                                )
                                            )
                                    }
                                </tbody>
                            </table>
                        </div>
                        {/* <Pagination
                            refresh={this.state.refresh}
                            current_page={current_page}
                            custom_query={this.props.custom_query}
                            paginate={this.paginate}
                            query={this.state.query}
                            sort_name={this.state.sort_name}
                            per_page={per_page}
                            color={color}
                            урт_хуудаслалт={урт_хуудаслалт}
                        /> */}
                    </div>
                </div>
           </div>
        )
    }
}
