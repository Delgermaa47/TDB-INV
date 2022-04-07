import { set } from "ol/transform"
import React, { Component } from "react"
import './style.css'

export class Pagination extends Component {

    constructor(props) {

        super(props)
        this.state = {
            items:[],
            page: props.current_page,
            total_page: props.total_page,
            is_loading: false,
            query: props.query,
            sort_name: props.sort_name,
            custom_query: props.custom_query,
            per_page: props.per_page,
            jump_to_page: props.current_page,
            active_page: props.current_page,
        }

        this.loadPage = this.loadPage.bind(this)
        this.nextPage = this.nextPage.bind(this)
        this.prevPage = this.prevPage.bind(this)
        this.addPage = this.addPage.bind(this)
        this.setCurrentPage = this.setCurrentPage.bind(this)
    }

    setCurrentPage(current_page) {
        this.loadPage(current_page, this.state.query, this.state.sort_name, this.state.per_page, this.props.custom_query)
    }

    componentDidMount() {3206
        this.loadPage(this.state.page, this.state.query, this.state.sort_name, this.state.per_page, this.props.custom_query)
    }

    componentDidUpdate(prevProps) {
        if(prevProps.query !== this.props.query)
        {
            const query = this.props.query
            this.setState({ query })
            this.loadPage(1, query, this.props.sort_name, this.state.per_page, this.props.custom_query)
        }
        if(prevProps.sort_name !== this.props.sort_name)
        {
            const sort_name = this.props.sort_name
            const query = this.props.query
            this.setState({ sort_name })
            this.loadPage(1, query, sort_name, this.state.per_page, this.props.custom_query)
        }
        if(prevProps.current_page !== this.props.current_page)
        {
            const current_page = this.props.current_page
            this.setState({ page: current_page, jump_to_page: current_page, active_page: current_page })
            this.loadPage(current_page, this.state.query, this.state.sort_name, this.state.per_page, this.props.custom_query)
        }
        if(prevProps.refresh !== this.props.refresh)
        {
            this.loadPage(1, this.state.query, this.state.sort_name, this.state.per_page, this.props.custom_query)
        }
        if(prevProps.per_page !== this.props.per_page)
        {
            const per_page = this.props.per_page
            this.setState({ per_page })
            this.loadPage(1, this.props.query, this.props.sort_name, per_page, this.props.custom_query)
        }
        if(this.props.custom_query){
            if(prevProps.custom_query !== this.props.custom_query){
                this.setState({ custom_query: this.props.custom_query })
                this.loadPage(1, this.props.query, this.props.sort_name, this.state.per_page, this.props.custom_query)
            }
        }
    }

    nextPage() {
        this.loadPage(this.state.page + 1, this.state.query, this.state.sort_name, this.state.per_page, this.state.custom_query)
    }

    prevPage() {
        this.loadPage(this.state.page - 1, this.state.query, this.state.sort_name, this.state.per_page, this.state.custom_query)
    }

    loadPage(page, query, sort_name, per_page, custom_query) {
        if (this.state.is_loading) {
            return
        }
        page = Math.max(page, 1)
        page = Math.min(page, this.state.total_page)
        this.setState({is_loading: true})
        this.props.paginate(page, query, sort_name, per_page, custom_query)
        .then(({ page, total_page }) => {
            this.setState({
                page: page || 1,
                jump_to_page: page,
                active_page: page,
                total_page,
                is_loading: false,
            })
        })
    }

    addPage(id) {
        const page = id.target.value
        this.setState({ page })
        this.loadPage(page, this.state.query, this.state.sort_name, this.state.per_page, this.state.custom_query)
    }

    render() {
        const {page, total_page} = this.state
        const pages = []
        const { color, урт_хуудаслалт } = this.props
        return (
            <div className="row">
                <div className="col-md-12 d-flex justify-content-between pt-1">
                    <div className="float-left d-flex">
                        <p className={`text-${color} f-size`}>Хуудас:&nbsp;{page}-{total_page}</p>&nbsp;
                    </div>
                    <div className="btn-group group-round mt-2 pt-3">
                        <button
                            type=" button"
                            value="1"
                            className={`btn btn-${color} waves-effect waves-light btn-sm` + (this.state.is_loading ? " disabled" : "")}
                            onClick={(e) => this.addPage(e)}
                        >
                            &lt;&lt;
                        </button> {}
                        {
                            page > 1
                            &&
                                <button
                                    type=" button"
                                    className={`btn btn-${color} waves-effect waves-light btn-sm` + (this.state.is_loading ? " disabled" : "")}
                                    onClick={() => this.prevPage()}
                                >
                                    &lt;
                                </button>
                        }
                        {
                            !урт_хуудаслалт
                            &&
                                <button
                                    type=" button"
                                    value={page}
                                    className={`btn btn-${color} waves-effect waves-light btn-sm` + (this.state.is_loading ? " disabled" : "")}
                                >
                                    {page}
                                </button>
                        }
                        {
                            урт_хуудаслалт
                            &&
                                Array.from(Array(total_page), (e, i) =>
                                        i < 9
                                        &&
                                        <button
                                            key={i}
                                            type="button"
                                            className={`btn btn-${color} waves-effect waves-light btn-sm ${this.state.is_loading ? " disabled" : ""} ${this.state.active_page === i + 1 ? 'dt-active' : ""}`}
                                            onClick={() => this.setCurrentPage(i+1)}
                                        >
                                            {i + 1}
                                        </button>
                                )
                        }
                        {
                            page < total_page
                            &&
                                <button
                                    type="button"
                                    className={`btn btn-${color} waves-effect waves-light btn-sm` + (this.state.is_loading ? " disabled" : "")}
                                    onClick={() => this.nextPage()}
                                >
                                    &gt;
                                </button>
                        }
                        <button
                            type=" button"
                            value={total_page}
                            className={`btn btn-${color} waves-effect waves-light btn-sm` + (this.state.is_loading ? " disabled" : "")}
                            onClick={(e) => this.addPage(e)}
                        >
                            &gt;&gt;
                        </button> {}
                    </div>
                    <div className="float-right d-flex pt-1">
                        {
                            урт_хуудаслалт
                            &&
                                <span className={`paginate d-flex`}
                                    onKeyPress={e => e.key === 'Enter' && this.setCurrentPage(e.target.value)}>
                                    <p className={`text-${color} f-size`}>&nbsp;&nbsp;&nbsp;Хуудас руу очих:&nbsp;</p>
                                    <input
                                        type="number"
                                        className={"form-control paginate-input px-2 h-75 text-secondary cursor-center"}
                                        onChange={(event) => this.setState({ jump_to_page: event.target.value })}
                                        value={this.state.jump_to_page || ""}
                                    />
                                    {/* <p className={`text-${color} f-size cursor-pointer`} onClick={() => this.setCurrentPage(this.state.jump_to_page)}>&nbsp; очих <i className="fa fa-chevron-right"></i></p> */}
                                </span>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
