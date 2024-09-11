

const numberFormat = (n) => {
    const aux = (value) => {
        const int_part = parseInt(n / value)
        const rest = Math.abs(n - (int_part * value))
        return [int_part, rest]
    }

    if (n >= 1000 && n <= 1000000) {
        const calc = aux(1000)
        return `${calc[0]}${calc[1] !== 0 ? `.${calc[1].toString()[0]}` : ''}k`
    }
    if (n >= 1000000) {
        const calc = aux(1000000)
        return `${calc[0]}${calc[1] !== 0 ? `.${calc[1].toString()[0]}` : ''}m`
    }
    return n
}


export default numberFormat