let mongoose = require('mongoose')

let listSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	address: {
		type: String,
		required: true
	},
	item: {
		name: String,
		price: Number,
		image: String,
		condition: {
			type: Number,
			min: 1,
			max: 10
		}
	}
})

// listSchema.methods.addItem = function (item, price, pic, condition){
// 	return this.add({item: {
// 					name: item,
// 					price: price,
// 					image: pic,
// 					condition: condition 
// 				}})
// }

module.exports = mongoose.model('List', listSchema)