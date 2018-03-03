const express = require('express')
const router = express.Router()
const filter = require('../utils/filter.js').filter;

router.get('/', (req, res) => {
    let queryParams = req.query;

    console.log('params', queryParams)

    let filtered = filter(queryParams)

    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(filtered))

})

module.exports = router