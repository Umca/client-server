import * as cancelableFetch  from 'cancelable-fetch'

const API = {
    current: null,
    request(url) {
        if(this.current) {
            this.current.cancel()
            return Promise.reject('Another request')
        } else {
            return this.current = cancelableFetch( 
                fetch(`http://localhost:6650/api/cars/${url}`, 
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }))
        }
    }
}

export default API;