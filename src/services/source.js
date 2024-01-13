
import AuthenticationRequired from "../exceptions/authenticationRequired"
import PermissionInvalid from "../exceptions/PermissionInvalid"
const resource = async ({ route, body, method, formData, tkn }) => {
    const url = import.meta.env.VITE_API
    const contenttype = body ? { "Content-type": "application/json" } : null
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
    if (resp.status === 401) throw new AuthenticationRequired();
    if (resp.status === 403) {
        const { message, status } = await resp.json()
        throw new PermissionInvalid(message, status);
    }


    return resp
}

export default resource