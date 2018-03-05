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
                    .then(res => res.json())
                    .then(res => {
                        request = null
                        console.log(res)
                    }) 
            )
        }
    }
}

export default API;