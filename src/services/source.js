const resource = async (route, body, method = 'POST', tkn, formData) => {
    const url = 'https://nt4mmhp7-8000.use2.devtunnels.ms'
    const contenttype = body ? { "Content-type": "application/json" } : null
    const resp = await fetch(url + route, {
        method,
        mode: 'cors',
        credentials: 'include',
        headers: {
            ...contenttype,
            "auth": `Bearer token:${tkn} `
        },
        body: body ? JSON.stringify(body) : formData
    })
    if ([404, 401, 403].includes(resp.status)) throw new Error((await resp.json()).message)
    return resp
}

export default resource