import { handleResponse, getPostOptions } from "@helpUtils/handleRequest"

export const service = {
    list
}

function list(жагсаалтын_холбоос, page, perpage, query, sort_name, custom_query){
    const requestOptions = {
        ...getPostOptions(),
        body: JSON.stringify({ page, perpage, query, sort_name, custom_query }),
    }
    return fetch(жагсаалтын_холбоос, requestOptions).then(handleResponse)
}
