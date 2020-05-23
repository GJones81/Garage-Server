let db = require('../models')
let router = require('express').Router()

//gets all the sales documents. Regardless of user Id
//Further filter by distance will happen on 
//the client side
router.get('/', (req, res) => {
    db.Sale.find()
    .populate('list')
    .then((publicSales) => {
        res.send({publicSales})
    })
    .catch(err => {
        console.log('Error', err)
    })
})


module.exports = router