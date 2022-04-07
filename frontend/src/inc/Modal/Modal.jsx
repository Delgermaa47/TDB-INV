import React, {Component, Fragment} from "react"


export default class Modal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modal_status: this.props.modal_status || 'initial',
        }
        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleProceed = this.handleProceed.bind(this)
    }

    /*
        props-оор дамжуулах утгууд:
            Заавал өгөх утгууд:
                modal_status ---> анхны утга closed хааж нээхдээ initial, open
            Нэмэлт:
                modal_icon
                icon_color
                title
                text
                has_button ---> 2 button-г ашиглах уу (true, false)
                modal_bg ---> background color
                actionNameBack ---> Үгүй гэдэг утгыг солих
                actionNameDelete ---> Тийм гэдэг утгыг солих
                modalClose ---> x товч дарж modal хаахад хийж болох үйлдлүүд
                modalAction ---> Тийм товч дарж хийж болох үйлдлүүд
        // import:
            import Modal from "@utils/Modal/Modal"
        // Modal open function:
            handleModalOpen() {
                this.setState({ modal_status: 'open' }, () => {
                    this.setState({ modal_status: 'initial' })
                })
            }
        // Modal default value function(Хэрэв has_button==false байвал ModalAlert горимоор ажиллана):
            modalChange(modal_icon, modal_bg, icon_color, title, text, has_button, actionNameBack, actionNameDelete, modalAction, modalClose) {
                this.setState(
                    {
                        modal_icon,
                        modal_bg,
                        icon_color,
                        title,
                        text,
                        has_button,
                        actionNameBack,
                        actionNameDelete,
                        modalAction,
                        modalClose,
                    },
                    () => this.handleModalOpen()
                )
            }
        // Modal component value
            <Modal
                modal_status={ this.state.modal_status }
                modal_icon={ this.state.modal_icon }
                modal_bg={ this.state.modal_bg }
                icon_color={ this.state.icon_color }
                title={ this.state.title }
                text={ this.state.text }
                has_button={ this.state.has_button }
                actionNameBack={ this.state.actionNameBack }
                actionNameDelete={ this.state.actionNameDelete }
                modalAction={ this.state.modalAction }
                modalClose={ this.state.modalClose }
            />
    */

    componentDidMount() {
        if (this.state.modal_status == 'initial') {
            this.handleOpen()
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.modal_status != prevProps.modal_status) {
            if (['initial', 'open'].includes(this.props.modal_status)) {
                this.handleOpen()
            }
            if (['closing', 'closed'].includes(this.props.modal_status)) {
                this.handleClose()
            }
        }
    }

    handleOpen() {
        this.setState({modal_status: 'initial'})
        setTimeout(() => {
            this.setState({ modal_status: 'open' })
        }, 0)
    }

    handleClose(callback) {
        this.setState({ modal_status: 'closing' })
        setTimeout(() => {
            this.setState({ modal_status: 'closed' })
            if (callback) {
                callback()
            } else {
                this.setState({ modal_status: 'closed' })
                if (this.props.modalClose) {
                    this.props.modalClose()
                }
            }
        }, 150)
    }

    modalClose() {
        const { has_button } = this.props
        this.setState({ modal_status: 'closing' })
        setTimeout(() => {
            this.setState({ modal_status: 'closed' })
            if (this.props.modalClose) {
                this.props.modalClose()
            }
        }, 150)
    }

    handleProceed() {
        this.handleClose(this.props.modalAction)
    }

    render () {
        const {modal_status} = this.state

        const className =
            "modal fade" +
            (modal_status == 'initial' ? ' d-block' : '') +
            (modal_status == 'open' ? ' show d-block' : '') +
            (modal_status == 'closing' ? ' d-block' : '') +
            (modal_status == 'closed' ? ' d-none' : '')

        const classNameBackdrop =
            "modal-backdrop fade" +
            (modal_status == 'open' ? ' show' : '') +
            (modal_status == 'closed' ? ' d-none' : '')

            return (
            <Fragment>
                <div className={className}>
                    <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: this.props.custom_width }}>
                        <div className={`modal-content border-0 rounded-lg ${this.props.modal_bg ? this.props.modal_bg : 'bg-light'}`} >
                            <div className="col-md-12 offset-md-12 float-right my-1">
                                <button type="button" className="close mt-2 mr-2" aria-label="Close">
                                    <span aria-hidden="true" onClick={() => this.modalClose()} >&times;</span>
                                </button>
                            </div>
                            <div className="d-flex justify-content-center">
                                {
                                    this.props.modal_icon &&
                                        <i className={`${this.props.modal_icon} fa-3x my-3 animated bounceIn text-${this.props.icon_color}`}
                                            aria-hidden="true">
                                        </i>
                                }
                            </div>
                            <div className="text-center px-2">
                                <h5 >{ this.props.title && this.props.title }</h5>
                            </div>
                            {
                                this.props.text
                                ?
                                    <div className="modal-body text-wrap text-center ml-2 mr-2 ">
                                        {
                                            typeof(this.props.text) == 'string'
                                            ?
                                                <small className=''>{this.props.text}</small>
                                            :
                                            typeof(this.props.text) == 'function'
                                            ?
                                                <this.props.text/>
                                            :
                                                this.props.text
                                        }
                                    </div>
                                :
                                    null
                            }
                            {
                                this.props.has_button
                                ?
                                    <div className="modal-footer border-0">
                                        <button type="button" onClick={() => this.handleClose()} className="btn btn-primary waves-effect waves-light">
                                            <i className="fa fa-times pr-1"></i>
                                            {this.props.actionNameBack ? this.props.actionNameBack : "БУЦАХ"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={this.handleProceed}
                                            className="btn btn-outline-primary waves-effect waves-light">
                                            <i className="fa fa-check-square-o pr-1"></i>
                                            {this.props.actionNameDelete ? this.props.actionNameDelete : "УСТГАХ"}
                                        </button>
                                    </div>
                                :
                                    this.props.text
                                    ?
                                        typeof(this.props.text) == 'string'
                                        ?
                                            <div className="modal-body mt-3"></div>
                                        :
                                            null
                                    :
                                        <div className="modal-body mt-3"></div>
                            }
                        </div>
                    </div>
                </div>
                <div className={classNameBackdrop}></div>
            </Fragment>
        )
    }

}
