const express = require('express')
const router = express.Router()
const math = require('mathjs')
const filter = require('../utils/filter.js').filter

const PER_PAGE = 3

let filtered;

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
        filtered = filter(queryParams)
        console.log(filtered)
        res.send(JSON.stringify(filtered.slice(0, PER_PAGE)))
    }
})

router.get('/page', (req, res, next) => {
    let queryParams = req.query

    let errorTimer = 0.1//math.random()
    let  since  = parseInt(queryParams.since)

    if (errorTimer > 0.5) {
        throwError(next)
    } else {
        if (filtered && PER_PAGE * since < filtered.length) {
            let toSend = filtered.slice(since * PER_PAGE, since * PER_PAGE + PER_PAGE)
            res.send(JSON.stringify(toSend))
        } else {
            filtered = null
            res.send(JSON.stringify(null))
        }
        
    }
})


module.exports = router