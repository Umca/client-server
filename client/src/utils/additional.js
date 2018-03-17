const fillWith = (str, what, amount) => {
    return str.padStart(amount, what)
}

export const formatString = (str) => {
    const thousands = Math.floor(parseInt(str) / 1000)
    const remainder = parseInt(str) % 1000
    const afterCommma = 3
    const remainderWithZeros = fillWith(String(remainder), '0', afterCommma)
    return `${thousands},${remainderWithZeros}`
}

const createUrlQuery = (state, initialState) => {
    let query = ""

    for (let key in state) {
        if (state.hasOwnProperty(key) && key !== 'data' && key !== 'errors') {
            if (state[key] === initialState[key] || (Array.isArray(state[key]) && state[key].length == 0)) {
                continue;
            }
            if (Array.isArray(state[key])) {
                query += `${key}=`
                query += state[key].join(',') + '&'
            } else {
                query += `${key}=${state[key]}&`
            }
        }
    }
    return query.slice(0, query.length-1);
}

export const formatUrl = (state, initialState) => {

    let result = `filter?${createUrlQuery(state, initialState)}`
    
    return result
}

