export default class AuthenticationRequired extends Error {
    constructor() {
        super('Tu sesión ha expirado. Por favor, inicia sesión de nuevo para continuar.')
        this.stack = ''
    }
}
