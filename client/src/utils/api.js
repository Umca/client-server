import * as cancelableFetch  from 'cancelable-fetch'

let request = null

const API = {
    request(url){
        if(request){
            request.cancel()
        } else {
            request = cancelableFetch( 
                fetch (`http://localhost:6650/api/cars/${url}`, 
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