let mongoose = require('mongoose')


	

let listSchema = new mongoose.Schema({
	firstname: {
		type:mongoose.Schema.Types.ObjectId,
		ref: "Name"
		required: true
	},
	address: {
		type: String,
		required: true
	},
	item: {
		name: String,
		price: Number,
		image: String
	}
})

listSchema.methods.addItem = function (item, price, pic){
	return this.add({item: {
					name: item,
					price: price,
					image: pic
				}})
}

module.exports = mongoose.model('List', listSchema)