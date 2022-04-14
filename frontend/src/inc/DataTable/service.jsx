import { handleResponse} from "../helpers/service"

export const service = {
    list
}

function list(жагсаалтын_холбоос, page, perpage, query, sort_name, custom_query){
    var form_data = new FormData();  
    form_data.append("perpage", perpage)
    form_data.append("last_id", "")
    form_data.append("is_prev_page", true)
    const requestOptions = {
        method: 'POST',
        body: form_data
    }
    return fetch(жагсаалтын_холбоос, requestOptions).then(handleResponse)
}
