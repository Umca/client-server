const cars = require('../db/data.json')

const search = (name) => {
    return cars.filter(car => car.model.toLowerCase().indexOf(name.toLowerCase()) > -1)
}
module.exports = { search }