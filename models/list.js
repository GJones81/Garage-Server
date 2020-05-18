let mongoose = require('mongoose')

let listSchema = new mongoose.Schema({
	firstname: {
		type:mongoose.Schema.Types.ObjectId,
		ref: "Name"
		required: true
	},
	
})