const express = require('express')
const router = express.Router()
const math = require('mathjs')
const filter = require('../utils/filter.js').filter
const search = require('../utils/search.js').search

const errorTimer = 11 //math.round(math.random() * 30)

const throwError = (next) => {
    let err = new Error("Something went wrong.")
    err.statusCode = 503;
    next(err)
}

router.get('/filter', (req, res, next) => {
    let queryParams = req.query

    console.log('params', queryParams)

    if(errorTimer % 10 == 0){
        throwError(next)
    } else {
        let filtered = filter(queryParams)
        res.send(JSON.stringify(filtered))
    }
})

router.get('/search', (req, res, next) => {
    let { model } = req.query

    console.log('params', model)
    
    if(errorTimer % 10 == 0){
        throwError(next)
    } else {
        let filtered = search(model)
        res.send(JSON.stringify(filtered))
    }
})

module.exports = router