const express = require('express')
const router = express.Router()
const math = require('mathjs')
const filter = require('../utils/filter.js').filter
const search = require('../utils/search.js').search

let errorTimer //math.round(math.random() * 30)
const PER_PAGE = 4
let filtered

const throwError = (next) => {
    let err = new Error("Something went wrong.")
    err.statusCode = 503
    next(err)
}


router.get('/filter', (req, res, next) => {
    let queryParams = req.query

    errorTimer = 0.1//math.random()

    console.log('params', queryParams, errorTimer)

    if (errorTimer > 0.5) {
        throwError(next)
    } else {
        filtered = filter(queryParams, filtered)
        res.send(JSON.stringify(filtered.slice(0, 2)))
    }
})

router.get('/search', (req, res, next) => {
    let {
        model
    } = req.query

    errorTimer = 0.1//math.random()

    console.log('params', model, errorTimer)

    if (errorTimer > 0.5) {
        throwError(next)
    } else {
        filtered = search(model, filtered)
        res.send(JSON.stringify(filtered.slice(0,2)))
    }
})

module.exports = router