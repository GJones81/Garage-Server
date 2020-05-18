let bcrypt = require('bcryptjs')
let mongoose = require('mongoose')

// Create user schema
let userSchema = new mongoose.Schema({
	firstname: {
		type: String,
		required: true
	},
	lastname: String,
	email: {
		type: String,
		required: true,
		unique: true,
		minlength: 5
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
		maxlength: 20
	},
	pic: String,
	admin: {
		type: Boolean,
		default: false
	}
})

// Hash passwords
userSchema.pre('save', function(done) {
	//Make sure the password being hashed is a new password
	if (this.isNew) { 
		this.password = bcrypt.hashSync(this.password, 12)
	}
	//Indicate it's okay to move on
	done()
})
// JSON representation of user for sending on the 
// JWT payload
userSchema.set('toJSON', {
	transform: (doc, user) =>{
		delete user.password
		delete user.__v
		return user
	}
})

// make a function that compares passwords
// typedPassword is the password just typed in
// this.password refers to the user object (password from above)
userSchema.methods.validPassword = function (typedPassword) {
	return bcrypt.compareSync(typedPassword, this.password)
}

// Export user model
module.exports = mongoose.model('User', userSchema)
