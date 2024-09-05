import AuthenticationRequired from "../exceptions/AuthenticationRequired"
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
    if (resp.status === 401) {
        const data = await resp.clone().json()
        const code = data.error.code
        if (code === 594 || code === 601 || code === 602) {
            throw new AuthenticationRequired()
        }
    }
    return resp
}

export default resource