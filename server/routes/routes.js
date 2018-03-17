const express = require('express')
const router = express.Router()
const math = require('mathjs')
const filter = require('../utils/filter.js').filter

const PER_PAGE = 4

const throwError = (next) => {
    let err = new Error("Something went wrong.")
    err.statusCode = 503
    next(err)
}


router.get('/filter', (req, res, next) => {
    let queryParams = req.query

    let errorTimer = 0.1//math.random()

    console.log('params', queryParams, errorTimer)

    if (errorTimer > 0.5) {
        throwError(next)
    } else {
        let filtered = filter(queryParams)
        res.send(JSON.stringify(filtered))
    }
})


module.exports = router