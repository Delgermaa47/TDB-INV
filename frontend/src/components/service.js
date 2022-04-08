import { handleResponse, getGetOptions } from "../inc/helpers/service"
export const service = {
    detail_list,
    sub_detail_list
}

function detail_list(root_id, pk) {
    const opts = {...getGetOptions()}
return fetch(`/api/${root_id}/detail_list/${pk}/`, opts).then(handleResponse)
}

function sub_detail_list(pk) {
    const opts = {...getGetOptions()}
return fetch(`/api/sub_detail_list/${pk}/`, opts).then(handleResponse)

}