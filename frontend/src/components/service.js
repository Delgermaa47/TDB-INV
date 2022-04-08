import { handleResponse, getGetOptions } from "../inc/helpers/service"
export const service = {
    remove,
}

function remove(invno) {
    const opts = {...getGetOptions()}
    return fetch(`http://172.26.153.11/apidelete-sent-invoice/${invno}/`, opts).then(handleResponse)
}