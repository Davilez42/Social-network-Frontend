class AuthenticationRequired extends Error {
    constructor() {
        super('Inicia sesion nuevamente')
        this.stack = ''
    }
}
export default AuthenticationRequired