const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const carSchema = Schema({
	make: {
		type: String
	},
	model: String,
	year: Number,
	seller: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	}
});

const Car = model('car', carSchema);
module.exports = Car;
