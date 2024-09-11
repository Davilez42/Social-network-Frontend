


const formatDate = (date) => {
    const date_comment = new Date(date)
    const current_date = new Date()
    const mils = current_date - date_comment

    if (mils > 0 && mils < 60000) {
        const seconds = parseInt(mils * 1.7 * Math.pow(10, -4))
        return `${seconds}s`
    }
    if (mils >= 60000 && mils < 3600000) {
        const minuts = parseInt(mils * 1.7 * Math.pow(10, -5))
        return `${minuts}min`
    }
    if (mils >= 3600000 && mils < 86400000) {
        const hours = parseInt(mils * 2.778 * Math.pow(10, -7))
        return `${hours}h`
    }
    if (mils >= 86400000 && mils < 604800016.56) {
        const days = parseInt(mils * 1.1574 * Math.pow(10, -8))
        return `${days}d`
    }
    if (mils >= 604800016.56 && mils < 2629800000) {
        const week = parseInt(mils * 1.653 * Math.pow(10, -9))
        return `${week}sem`
    }
    if (mils >= 2629800000.56 && mils < 31557600000) {
        const month = parseInt(mils * 3.8 * Math.pow(10, -10))
        return `${month}mes`
    }
    if (mils >= 31557600000) {
        const years = parseInt(mils * 3.2 * Math.pow(10, -11))
        return `${years}año`
    }
    return 'hace unos segundos'
}

export default formatDate