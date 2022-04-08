import { handleResponse, getPostOptions } from "../helpers/service"

export const service = {
    list
}

function list(жагсаалтын_холбоос, page, perpage, query, sort_name, custom_query){
    const requestOptions = {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        // ...getPostOptions(),
        body: JSON.stringify({ page, perpage, query, sort_name, custom_query }),
    }
    console.log(requestOptions);
    return fetch(жагсаалтын_холбоос, requestOptions).then(handleResponse)
}
