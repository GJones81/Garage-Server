let db = require('../models')
let router = require('express').Router()
let jwt = require('jsonwebtoken')

const corsOrigin = {
	origin: 'https://sam-guy-garage.herokuapp.com/'
  }

//GET route to retrieve a current list
router.get('/', cors(corsOrigin), (req,res) => {
	db.List.find({ user: req.user._id})
	.populate('user')
	.then(currentLists => {
		res.send({currentLists})
	})
	.catch(err => {
		console.log('Error', err)
	})
})

//POST route to create the start of a new list
router.post('/', cors(corsOrigin), (req, res) => {
	db.List.create({
		user: req.user,
		listTitle: req.body.listTitle,
	})
	.then(() => {
		res.send({message: "Successfully Created List", status:'200'})
	})
	.catch(err => {
		console.log('Error', err)
	})
})

//PUT route to edit the Title of a list
router.put('/:id', cors(corsOrigin), (req, res) => {
	db.List.findByIdAndUpdate({ _id: req.params.id },{
		listTitle: req.body.listTitle
	})
	.then(() => {
		res.send({message: 'Successfully Edited a List Title', status: '200'})
	})
	.catch(err => {
		console.log('Error', err)
	})
})

//DELETE route to delete a list (presumably once it's empty)
router.delete('/:id', cors(corsOrigin), (req, res) => {
	db.List.findByIdAndDelete({ _id: req.params.id})
	.then(() => {
		res.send({message: 'Successfully Deleted A List', status: '200'})
	})
	.catch(err => {
		console.log('Error', err)
	})
})

//POST route to add items to a created list
router.post('/item', cors(corsOrigin), (req, res) => {
	db.List.findOneAndUpdate({
		user: req.user._id,
		_id: req.body._id},
		{ $push: { item: {
			name: req.body.name,
			price: req.body.price,
			image: req.body.image,
			condition: req.body.condition
		}
	},
			new: true
	})
	.then(() => {
		res.send({ message: "Successfully Added Item to List", status:'200'})
	})
	.catch(err => {
		console.log('Error', err)
	})
})

//PUT route to edit an item on the list
//req.params.id NEEDS the item _id
//req.body.listId NEEDS the list _id
router.put('/item/:id', cors(corsOrigin), (req, res) => {
	db.List.findOne({ _id: req.body.listId })
	.then((list) => {
		let item = list.item.id(req.params.id)
		item.name = req.body.name
		item.price = req.body.price
		item.image = req.body.image
		item.condition = req.body.condition
		list.save()
		.then(() =>{
			res.send({ message: "Successfully Updated An Item", status:'200'})
		})
		
	})
	.catch(err => {
		console.log('Error', err)
	})
})

//DELETE route to delete items
router.delete('/item/:id', cors(corsOrigin), (req, res) => {
	db.List.findOne({ _id: req.body.listId })
	.then((list) => {
		let item = list.item.id(req.params.id)
		item.remove()
		return list.save()
	})
	.then(() => {
		res.send({ message: "Successfully Deleted Item", status:"200"})
	})
	.catch(err => {
		console.log('Error', err)
	})
})

module.exports = router