let db = require('../models')
let router = require('express').Router()
let jwt = require('jsonwebtoken')

//GET route to retrieve a current list
router.get('/', (req,res) => {
	db.List.find({ user: req.user._id})
	.populate('user')
	.then(currentList => {
		res.send(currentList)
	})
	.catch(err => {
		console.log('Error', err)
	})
})

//POST route to add items
router.post('/', (req, res) => {
	db.List.create({
		user: req.user,
		address: req.body.address,
		item: {
			name: req.body.item,
			price: req.body.price,
			image: req.body.image,
			condition: req.body.condition
		}
		.populate('sale')
	})
	.then(() => {
		res.send({message: "Successfully Updated List", status:'200'})
	})
	.catch(err => {
		console.log('Error', err)
	})
})

//PUT route to edit items
router.put('/:id', (req, res) => {
	db.List.findOneAndUpdate({ _id: req.params.id },{
		user: req.body.user,
		address: req.body.address,
		item: {
			name: req.body.item,
			price: req.body.price,
			image: req.body.image,
			condition: req.body.condition
}
})
	.then(() => {
		res.send({ message: "Successfully Updated List", status:'200'})
	})
	.catch(err => {
		console.log('Error', err)
	})
})

//DELETE route to delete items
router.delete('/:id', (req, res) => {
	db.List.findOneAndDelete({ _id: req.params.id})
	.then(() => {
		res.send({ message: "Successfully Deleted Item", status:"200"})
	})
	.catch(err => {
		console.log('Error', err)
	})
})

module.exports = router