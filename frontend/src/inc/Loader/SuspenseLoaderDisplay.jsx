import React, { Component } from "react"

import SuspenseLoader from "./SuspenseLoader"


export default class SuspenseLoaderDisplay extends Component {

    constructor(props) {
        super(props);
        this.too = 0
        this.state = {
            text: '',
            is_loading: false
        }
        this.setLoader = this.setLoader.bind(this)
    }

    componentDidMount() {
        this.props.getFunc(this.setLoader)
    }

    setLoader(is_loading, text) {
       this.setState({ is_loading, text })
    }

    render() {
        const { is_loading, text } = this.state
        return (
            <SuspenseLoader is_loading={is_loading} text={text ? text : 'Түр хүлээнэ үү !!!'}/>
        );
    }
}
