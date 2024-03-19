const resource = async ({ route, body, method, formData, tkn }) => {
    const url = import.meta.env.VITE_API
    let contenttype
    if (body) {
        contenttype = { "Content-type": "application/json" }
    }

    const resp = await fetch(url + route, {
        method: method || 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            ...contenttype,
            authorization: `Bearer ${tkn}`
        },
        body: body ? JSON.stringify(body) : formData
    })



    return resp
}

export default resource