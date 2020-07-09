const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = Schema({
	firstName: {
		type: String
	},
	lastName: String,
	email: String,
	cars: [
		{
			type: Schema.Types.ObjectId,
			ref: 'car'
		}
	]
});

const User = model('user', userSchema);
module.exports = User;
