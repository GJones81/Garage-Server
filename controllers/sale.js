let db = require('../models')
let router = require('express').Router()
let jwt = require('jsonwebtoken')

//gets a list of all scheduled sales
router.get('/', (req, res) => {
	db.Sale.find({ user: req.user._id })
	.populate('user')
	.populate('list')
	.then((Sales) => {
		res.send({message: 'List of All Sales', status: '200'}, {Sales} )
	})
	.catch(err => {
		console.log('Error', err)
	})
})

//creates a sale 
router.post('/', (req, res) => {
	db.Sale.create({
		user: req.user,
		address: req.body.address,
		date: req.body.date,
		list: req.body.list
	})
	.populate('list')
	.then(() => {
		res.send({ message: "Successfully Created a Sale", status: '200'})
	})
	.catch(err => {
		console.log('Error', err)
	})

})

//edit a current sale
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
	db.Sale.findByIdAndDelete({_id: req.params.id})
	.then(() => {
		res.send({message: 'Successfully Deleted a Sale', status: '200'})
	})
	.catch(err => {
		console.log('Error', err)
	})
})

module.exports = router