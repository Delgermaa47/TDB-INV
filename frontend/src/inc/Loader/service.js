import { Capabilities } from "./Capabilities"

export const service = {
    getAll,
    create,
    update,
    remove,
    getLayers,
    wmsLayerall,
    move,
    titleUpdate,
    layerAdd,
    layerRemove,
    detail,
    wmsIsActiveUpdate,
    pagination,
    getData,
    saveData,
    removeInvalidLayers
}

const prefix = '/back'

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text)
        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                // TODO auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                location.reload(true)
            }
            const error = (data && data.message) || response.statusText
            return Promise.reject(error)
        }

        return data
    })
}

function _getPostOptions() {
    return {
        method: 'POST',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFToken': getCookie('csrftoken'),
        },
    }
}

function _getGetOptions() {
    return {
        method: 'GET',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
        },
    }
}

function removeInvalidLayers(id, invalid_layers) {
    const requestOptions = {
        ..._getPostOptions(),
        body: JSON.stringify({invalid_layers}),
    }
    return fetch(`${prefix}/wms/${id}/remove/invalid-layer/`, requestOptions).then(handleResponse)
}

function pagination(last,first) {
    const requestOptions = {
        ..._getPostOptions(),
        body: JSON.stringify({last,first}),
    }
    return fetch(`${prefix}/wms/pagination/`, requestOptions).then(handleResponse)
}

function getAll() {
    const requestOptions = {
        ..._getGetOptions(),
    }
    return fetch(`${prefix}/wms/all/`, requestOptions).then(handleResponse)
}

function detail(id) {
    const requestOptions = {..._getGetOptions()}

    return fetch(`${prefix}/wms/${id}/updatemore/`, requestOptions).then(handleResponse)
}

function wmsLayerall(id) {
    const opts = {
        ..._getPostOptions(),
        body: JSON.stringify({id}),
    }

    return fetch(`${prefix}/wms/wmsLayerall/`, opts).then(handleResponse)
}
function titleUpdate(title, id) {
    const opts = {
        ..._getPostOptions(),
        body: JSON.stringify({title, id}),
    }

    return fetch(`${prefix}/wms/titleUpdate/`, opts).then(handleResponse)
}

function move(id, move, wmsId) {
    const opts = {
        ..._getPostOptions(),
        body: JSON.stringify({id, move, wmsId}),
    }

    return fetch(`${prefix}/wms/move/`, opts).then(handleResponse)
}
function layerAdd(id, wmsId, code) {
    const opts = {
        ..._getPostOptions(),
        body: JSON.stringify({id, wmsId, code}),
    }

    return fetch(`${prefix}/wms/layerAdd/`, opts).then(handleResponse)
}
function layerRemove(id, wmsId) {
    const opts = {
        ..._getPostOptions(),
        body: JSON.stringify({id, wmsId}),
    }

    return fetch(`${prefix}/wms/layerRemove/`, opts).then(handleResponse)
}

function create(values) {

    const opts = {
        ..._getPostOptions(),
        body: JSON.stringify(values),
    }

    return fetch(`${prefix}/wms/create/`, opts).then(handleResponse)
}


function update(values) {
    const opts = {
        ..._getPostOptions(),
        body: JSON.stringify(values),
    }

    return fetch(`${prefix}/wms/update/`, opts).then(handleResponse)
}

function wmsIsActiveUpdate(id, is_active) {
    const opts = {
        ..._getPostOptions(),
        body: JSON.stringify({id, is_active}),
    }

    return fetch(`${prefix}/wms/activeUpdate/`, opts).then(handleResponse)
}


function remove(id) {
    const opts = {
        ..._getPostOptions(),
        body: JSON.stringify({id}),
    }

    return fetch(`${prefix}/wms/delete/`, opts).then(handleResponse)
}


function getLayers(wms_url) {

    return new Promise((resolve, reject) => {

        const requestOptions = {
            method: 'GET',
        }

        const url = wms_url + '?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities'

        fetch(url, requestOptions)
            .then(rsp => rsp.blob())
            .then(data => {
                const reader = new FileReader()
                reader.onloadend = () => {
                    const layers = (new Capabilities(reader.result)).getLayers()
                    resolve(layers)
                }
                reader.readAsText(data)
            })
            .catch(reject)
    })
}

function getData(id, code) {
    const opts = {
        ..._getPostOptions(),
        body: JSON.stringify({id, code}),
    }

    return fetch(`${prefix}/wms/get-geo/`, opts).then(handleResponse)
}

function saveData(data, id, code) {
    const opts = {
        ..._getPostOptions(),
        body: JSON.stringify({data, id, code}),
    }

    return fetch(`${prefix}/wms/save-geo/`, opts).then(handleResponse)
}
