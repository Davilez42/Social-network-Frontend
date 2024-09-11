import CryptoJS from 'crypto-js'
export const encryptDate = (data) => {
    return CryptoJS.AES.encrypt(data, import.meta.env.VITE_SECRET_KEY_CIFRATE).toString()
}
export const decryptDate = (data) => {
    if (!data) {
        return {}
    }
    return JSON.parse(CryptoJS.AES.decrypt(data, import.meta.env.VITE_SECRET_KEY_CIFRATE).toString(CryptoJS.enc.Utf8))
}

