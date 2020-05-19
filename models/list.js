let mongoose = require('mongoose')

let itemSchema = new mongoose.Schema({
		name: String,
		price: Number,
		image: String,
		condition: Number
})

let listSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	listTitle: {
		type: String,
		required: true
	},
	item: [itemSchema]
})

module.exports = mongoose.model('List', listSchema)