import { handleResponse, getGetOptions } from "../inc/helpers/service"
export const service = {
    remove,
    save_invoice
}

function remove(invno) {
    const opts = {...getGetOptions()}
    return fetch(`http://172.26.153.11/api/delete-sent-invoice/${invno}/`, opts).then(handleResponse)
}

function save_invoice(invoice_data) {
    var form_data = new FormData();  
    form_data.append("body_data", invoice_data || [])
    const requestOptions = {
        method: 'POST',
        body: form_data
    }
    return fetch(`http://172.26.153.11/api/invoice-save`, requestOptions).then(handleResponse)
}
