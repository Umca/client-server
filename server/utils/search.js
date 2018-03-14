const cars = require('../db/data.json')

const search = (name, list) => {
    let where
    where = list ? list : cars
    return where.filter(car => car.model.toLowerCase().indexOf(name.toLowerCase()) > -1)
}
module.exports = { search }