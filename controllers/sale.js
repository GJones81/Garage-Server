let db = require('../models')
let router = require('express').Router()
let jwt = require('jsonwebtoken')

const corsOrigin = {
	origin: 'https://sam-guy-garage.herokuapp.com/'
  }

//gets a list of all scheduled sales
router.get('/', cors(corsOrigin), (req, res) => {
	db.Sale.find({ user: req.user._id })
	.populate('user')
	.populate('list')
	.then((currentSales) => {
		res.send({currentSales})
	})
	.catch(err => {
		console.log('Error', err)
	})
})

//creates a sale event
//req.body.list requires the list _id 
router.post('/', cors(corsOrigin), (req, res) => {
	db.Sale.create({
		user: req.body.user,
		address: req.body.address,
		date: req.body.date,
		list: req.body.list
	})
	.then(() => {
		res.send({ message: "Successfully Created a Sale", status: '200'})
	})
	.catch(err => {
		console.log('Error', err)
	})

})

//edit a current sale
router.put('/:id', cors(corsOrigin), (req, res) => {
	db.Sale.findByIdAndUpdate({_id: req.params.id},{
		address: req.body.address,
		date: req.body.date,
		list: req.body.list
	})
	.populate('list')
	.then(() =>{
		res.send({ message: 'Successfully Edited a Sale', status: '200'})
	})
	.catch(err => {
		console.log('Error', err)
	})
})

//delete a sale
router.delete('/:id', cors(corsOrigin), (req, res) => {
	db.Sale.findByIdAndDelete({_id: req.params.id})
	.then(() => {
		res.send({message: 'Successfully Deleted a Sale', status: '200'})
	})
	.catch(err => {
		console.log('Error', err)
	})
})

module.exports = router