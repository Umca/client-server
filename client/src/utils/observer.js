
const callback = (entries, observer) =>{

    entries.forEach(entry => {
        if(entry.intersectionRatio > 0){
            fetch(`http://localhost:6650/api/cars/search?model=bm`, 
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(res => console.log(res))
        }
    }
    )   
}

const observer = new IntersectionObserver(callback)

export default observer