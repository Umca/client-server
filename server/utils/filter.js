const cars = require('../db/data.json')

const filterOptions = {
    body: (val, obj) => {
        let splited;

        if(val.indexOf(',') == -1){
            splited = [val]
        } else {
            splited = val.split(',')
        }

        return splited.some( body => obj.bodyOptions.indexOf(body.toLowerCase()) > -1)
    },
    maker: (val, obj) => {
         let splited;

        if(val.indexOf(',') == -1){
            splited = [val]
        } else {
            splited = val.split(',')
        }
        return val.indexOf(obj.maker) > -1
    },
    year:(val, obj) => {
        return parseInt(obj.year) === parseInt(val);
    },
    price:(val, obj) => {
        return obj.price.max <= parseInt(val);
    },
    fuel: (val, obj) => {
        return obj.fuel.min >= parseInt(val);
    },
    model: (val, obj) => {
        return obj.model.toLowerCase().indexOf(val.toLowerCase()) > -1
    }
}

const filter = (queryObj) => {
    let result, copy
    result = []
    copy =  JSON.parse(JSON.stringify(cars));
    for(let key in queryObj){
        if(queryObj.hasOwnProperty(key)){
        
           let filtered = copy.filter(filterOptions[key].bind(this, queryObj[key]))
           result = [...filtered]
           copy = filtered;
        }
    }
    return result;
}

module.exports = { filter }