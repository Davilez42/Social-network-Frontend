class PermissionInvalid extends Error {
    constructor(message, code) {
        super(message ? message : 'Permisos insuficientes para realizar esta accion')
        this.code = code
        this.stack = ''
    }
}


export default PermissionInvalid