import { handleResponse, getGetOptions } from "../inc/helpers/service"
export const service = {
    remove,
    save_invoice,
    rec_rekove
}

function remove(invno) {
    const opts = {...getGetOptions()}
    return fetch(`http://172.26.153.11/api/delete-sent-invoice/${invno}/`, opts).then(handleResponse)
}

function rec_rekove(recno) {
    const opts = {...getGetOptions()}
    return fetch(`http://172.26.153.11/api/delete-recieve-invoice/${recno}`, opts).then(handleResponse)
}

function save_invoice(invoice_data) {
    var form_data = new FormData();  
    form_data.append("invno", invoice_data['invno'] || null)
    form_data.append("custno", invoice_data['custno'] || null)
    form_data.append("fname", invoice_data['fname'] || null)
    form_data.append("amount", invoice_data['amount'] || null)
    form_data.append("account", invoice_data['account'] || null)
    form_data.append("handphone", invoice_data['handphone'] || null)
    form_data.append("invdesc", invoice_data['invdesc'] || null)
    form_data.append("rec_datas", JSON.stringify(invoice_data['rec_datas']))
    const requestOptions = {
        method: 'POST',
        body: form_data
    }
    return fetch(`http://172.26.153.11/api/invoice-save`, requestOptions).then(handleResponse)
}
