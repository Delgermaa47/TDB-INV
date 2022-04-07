import React, { Component } from "react"
import { service } from "./service"
import WMSCheckFormSort from './WMSCheckFormSort'
import ModalAlert from '../ModalAlert'
import {Notif} from '@utils/Notification'
import './styles.css'
import BackButton from "@utils/Button/BackButton"


export class WMSForm extends Component {

    constructor(props) {

        super(props)

        this.too = 0,

        this.state = {
            id: props.match.params.id,
            name: '',
            url: '',
            wmts_url: '',
            public_url: '',
            layers: [],
            layers_all: [],
            is_active:false,
            layer_choices: [],
            is_active_change:true,
            modal_alert_check: 'closed',
            timer: null,
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.handleLayerToggle = this.handleLayerToggle.bind(this)
        this.loadLayers = this.loadLayers.bind(this)
        this.loadData = this.loadData.bind(this)
        this.handleWmsLayerRefresh = this.handleWmsLayerRefresh.bind(this)
        this.ActiveChange=this.ActiveChange.bind(this)
        this.modalCloseTime=this.modalCloseTime.bind(this)
        this.addNotif = this.addNotif.bind(this)
        this.RemoveInvalidWmsLayer = this.RemoveInvalidWmsLayer.bind(this)

    }
    componentWillMount(){
        const id = this.props.match.params.id
        if (id) {
            this.loadData()
        }
    }


    handleSave() {
        const id = this.props.match.params.id
        const {name,url,public_url,layers,layer_choices,is_active_change, wmts_url}= this.state
        if(is_active_change){
            const values={
                'id':id, 'name':name,'url':url,
                "public_url":public_url,"layers":layers,
                "layer_choices":layer_choices,"is_active":true,
                'wmts_url': wmts_url
            }
            if (id) {
                service.update(values).then(({ success, item }) => {
                    this.setState({modal_alert_check: 'open'})
                })

            } else {

                service.create(values).then(({ success, item }) => {
                    if (success) {
                        this.setState({modal_alert_check: 'open'})
                    }
                })

            }
            this.modalCloseTime()
        }
        else{
            const values={'id':id, 'name':name,'url':url, "public_url":public_url,"layers":layers,"layer_choices":layer_choices,"is_active":false, wmts_url}
            if (id) {
                service.update(values).then(({ success, item }) => {
                    if (success) { this.props.history.push('/back/wms/') }
                })

            } else {

                service.create(values).then(({ success, item }) => {
                    if (success) { this.props.history.push('/back/wms/') }
                })

            }
        }

    }

    ActiveChange(e){
        const is_active=this.state.is_active
        this.setState({
            [e.target.name]:e.target.checked,

        })
        if(is_active){
            this.setState({
                is_active_change:false
            })
        }
        else{
            this.setState({
                is_active_change:true
            })
        }

    }

    loadData() {
        const id = this.props.match.params.id
        service.detail(id).then(({ wms_list }) => {
            if (wms_list) {
                {
                    wms_list.map((wms, idx) =>{
                        this.setState({ name: wms.name, url: wms.url, public_url: wms.public_url, layers: wms.layers, layers_all: [],is_active:wms.is_active, wmts_url: wms.wmts_url})}
                    )

                }
                this.loadLayers(this.state.public_url, wms_list[0].layers)

            }
        })
    }

    handleWmsLayerRefresh() {
        const id = this.props.match.params.id
        service.wmsLayerall(id).then(({ layers_all }) => {
            if (layers_all) {
                this.setState({ layers_all })
            }
        })
    }

    loadLayers(public_url, layers) {
        var invalid_layers = []
        service.getLayers(public_url).then((layer_choices) => {
            if (layer_choices && layer_choices.length >0) {
                layers.map((single_layer) => {
                    var value = obj => obj.code == single_layer
                    var index_of = layer_choices.findIndex(value)
                    if (index_of < 0) {
                        invalid_layers.push(single_layer)
                    }
                })
                if (invalid_layers.length > 0) {
                    this.RemoveInvalidWmsLayer(invalid_layers)
                }
                this.setState({ layer_choices })
                this.handleWmsLayerRefresh()
            }
        })
    }

    RemoveInvalidWmsLayer(invalid_layers) {
        const id = this.props.match.params.id
        service.removeInvalidLayers(id, invalid_layers).then(({success}) =>{
            if(success) {this.setState({layer_choices})}
        })
    }

    handleChange(field, e) {
        this.setState({ [field]: e.target.value })
    }

    handleLayerToggle(e, layer) {
        let layers = this.state.layers
        const wmsId = this.state.id
        const layerName = layer.name
        const layerCode = layer.code
        if (e.target.checked) {

            service.layerAdd(layerName, wmsId, layerCode).then(({ success }) => {
                if (success) {
                    this.addNotif('success', 'Амжилттай нэмлээ', 'check')
                    this.handleWmsLayerRefresh()
                }
            })

            layers.push(layerCode)

        } else {

            service.layerRemove(layerCode, wmsId).then(({ success }) => {
                if (success) {
                    this.addNotif('success', 'Амжилттай устгалаа', 'times')
                    this.handleWmsLayerRefresh()
                }
            })

            layers = layers.filter((layer) => layer != layerCode)


        }

        this.setState({ layers })
    }

    handleModalAlert(){
        this.props.history.push('/back/wms/')
        this.setState({modal_alert_ceck: 'closed'})
        clearTimeout(this.state.timer)
    }

    modalCloseTime(){
        this.state.timer = setTimeout(() => {
            this.props.history.push('/back/wms/')
            this.setState({modal_alert_check: 'closed'})
        }, 2000)
    }

    addNotif(style, msg, icon){
        this.too ++
        this.setState({ show: true, style: style, msg: msg, icon: icon })
        const time = setInterval(() => {
            this.too --
            this.setState({ show: true })
            clearInterval(time)
        }, 2000);
    }


    render() {
        const { layers_all, id,is_active } = this.state
        return (
            <div className="row">
                <Notif show={this.state.show} too={this.too} style={this.state.style} msg={this.state.msg} icon={this.state.icon}/>
                <div className="col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="id_name">Нэр</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="id_name basic-input"
                                    placeholder="Нэр"
                                    onChange={(e) => this.handleChange('name', e)}
                                    value={this.state.name}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="id_url">WMS URL</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="id_url basic-input"
                                    placeholder="WMS URL"
                                    onChange={(e) => this.handleChange('url', e)}
                                    value={this.state.url}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="id_url">WMTS URL</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="id_wmts_url basic-input"
                                    placeholder="WMTS URL"
                                    onChange={(e) => this.handleChange('wmts_url', e)}
                                    value={this.state.wmts_url}
                                />
                            </div>
                            <div className="icheck-primary">
                                <a>Хязгаарлах</a>
                                &nbsp;<input
                                type="checkbox"
                                id="primary"
                                name="is_active"
                                checked={this.state.is_active}
                                onChange={this.ActiveChange}/>
                            </div>
                            <div className="form-group">
                                <button className="btn gp-btn-primary btn-block waves-effect waves-light m-1" onClick={this.handleSave} >
                                    Хадгал
                                </button>
                                <ModalAlert
                                    title="Амжилттай хадгаллаа"
                                    model_type_icon = "success"
                                    status={this.state.modal_alert_check}
                                    modalAction={() => this.handleModalAlert()}
                                />
                            </div>

                            <a className="border-bottom row ml-2 mr-2"> Давхаргууд  </a>
                            <ul className="list-group wms-floor-scroll">
                                    {this.state.id && this.state.layer_choices.map((layer, idx) =>
                                        <li className="list-group-item align-items-left" key={idx}>
                                            <input
                                                id={idx}
                                                type="checkbox"
                                                checked={this.state.layers.indexOf(layer.code) > -1}
                                                onChange={(e) => this.handleLayerToggle(e, layer)}
                                                value={layer.code}
                                            />
                                            <label htmlFor={idx}>&nbsp; {layer.name} ({layer.code})</label>
                                        </li>
                                    )}
                                    {!this.state.id && 'Хадгалсаны дараагаар давхаргуудыг үзэх боломжтой болно'}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <WMSCheckFormSort
                        wmslayers={layers_all}
                        wmsId={id}
                        handleWmsLayerRefresh={this.handleWmsLayerRefresh}>
                    </WMSCheckFormSort>
                </div>
                <BackButton {...this.props} name={'Буцах'}></BackButton>
            </div>
        )
    }
}
