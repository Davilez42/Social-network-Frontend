export default function logout() {
    window.localStorage.clear();
    setTimeout(() => {
        window.location = '/login'
    }, 4000);
}