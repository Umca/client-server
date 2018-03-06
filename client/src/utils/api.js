import * as cancelableFetch  from 'cancelable-fetch'

let request = null

const API = {
    searchRequest(text){
        if(request){
            request.cancel()
        } else {
            request = cancelableFetch( 
                fetch (`http://localhost:6650/api/cars/search?model=${text}`, 
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                },)
                    .then(res => {
                        request = null
                        return res.json()
                    })
            )
            return request;
        }
    }
}

export default API;