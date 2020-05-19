let mongoose = require('mongoose')

let saleSchema = new mongoose.Schema({
	address: {
		type: String,
		required: true
	},
	date: {
		type: String,
		required: true
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	list: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "List"
	}
})

module.exports = mongoose.model('Sale', saleSchema)