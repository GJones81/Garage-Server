let db = require('../models')
let router = require('express').Router()

const corsOrigin = {
    origin: 'https://sam-guy-garage.herokuapp.com/'
  }

//gets all the sales documents. Regardless of user Id
//Further filter by distance will happen on 
//the client side
router.get('/', cors(corsOrigin), (req, res) => {
    db.Sale.find()
    .populate('list')
    .then((publicSales) => {
        res.send([
            {publicSales},
            {'Access-Control-Allow-Origin': 'https://sam-guy-garage-server.herokuapp.com/'}
        ])
    })
    .catch(err => {
        console.log('Error', err)
    })
})


module.exports = router