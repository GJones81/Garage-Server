let db = require('../models')
let router = require('express').Router()
let jwt = require('jsonwebtoken')

//gets a list of all scheduled sales
router.get('/', (req, res) => {
	db.Sale.find({ user: req.user._id })
	.populate('user', 'list')
	.then(currentSales => {
		res.send(currentSales)
	})
	.catch(err => {
		console.log('Error', err)
	})
})

//creates a sale WITHOUT any list attached
router.post('/', (req, res) => {
	db.Sale.create({
		user: req.user,
		address: req.body.address,
		date: req.body.date,
	})
	.then(newSale => {
		res.send(newSale)
	})
	.catch(err => {
		console.log('Error', err)
	})

})

module.exports = router