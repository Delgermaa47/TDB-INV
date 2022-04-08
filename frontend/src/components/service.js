export const service = {
    detail_list,
    sub_detail_list
}

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

function getGetOptions() {
    return {
        method: 'GET',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
        },
    }
}

function getPostOptions() {
    return {
        method: 'POST',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFToken': getCookie('csrftoken'),
        },
    }
}


function detail_list(root_id, pk) {
    const opts = {...getGetOptions()}
return fetch(`/api/${root_id}/detail_list/${pk}/`, opts).then(handleResponse)
}

function sub_detail_list(pk) {
    const opts = {...getGetOptions()}
return fetch(`/api/sub_detail_list/${pk}/`, opts).then(handleResponse)

}