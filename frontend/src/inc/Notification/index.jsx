import React, { Component } from "react"


export class Notif extends Component {

    constructor(props) {

        super(props)
        this.alerts = [],
        this.total = [],
        this.array=[],
        this.key = 0
        this.state = {
        }

        this.loadNotif = this.loadNotif.bind(this)
    }

    componentDidUpdate(pP){
        if(pP.too !== this.props.too){
            this.loadNotif()
        }
    }

    loadNotif(){
        const length = this.total.length
        const {too, style, msg} = this.props
        const style_list = 'list-group-item rounded animated slideInLeft'
        if(this.props.show){
            this.key++
            if(length > too && length !=  1){
                this.total.shift()
                this.setState({ status: 'устгасан' })
            }
            if(too > length && length > 0){
                this.total = this.total.concat([
                    <li key={this.key} className={`${style_list} list-group-item-${style} my-1 text-wrap`}>
                        <a><i className={`fa fa-${this.props.icon}-circle fa-1x my-3 animated bounceIn my-1`}></i> {msg}</a>
                    </li>
                ])
                this.setState({ status: 'нэмсэн' })
            }
            if(length == 0){
                this.total.push(
                    <li key={this.key} className={`${style_list} list-group-item-${style} my-1 text-wrap`}>
                        <a><i className={`fa fa-${this.props.icon}-circle fa-1x my-3 animated bounceIn my-1`}></i> {msg}</a>
                    </li>
                )
                this.setState({ status: 'нэмсэн' })
            }
            if(length == 1 && too == 0){
                this.total.pop();
                this.setState({ status: 'устгасан' })
            }
        }
    }

    render() {
        const {arr} = this.state
        return (
            <div className="position-fixed bg-transparent col-md-4 col-12" style={{zIndex: 1030, top:0, right:0}}>
                <ul className="bg-transparent">
                    {this.total}
                </ul>
            </div>
        )
    }
}

export class DisplayNotif extends Component {

    constructor(props) {
        super(props);
        this.too = 0
        this.state = {
            show: false
        }
        this.addNotif = this.addNotif.bind(this)
    }

    componentDidMount() {
        this.props.getNotifFunc(this.addNotif)
    }

    addNotif(style, msg, icon, time_limit=3000) {
        this.too ++
        this.setState({ show: true, style, msg, icon })
        const time = setInterval(() => {
            this.too --
            this.setState({ show: true })
            clearInterval(time)
        }, time_limit);
    }

    render() {
        const { show, style, msg, icon } = this.state
        return (
            <Notif show={show} too={this.too} style={style} msg={msg} icon={icon}/>
        );
    }
}