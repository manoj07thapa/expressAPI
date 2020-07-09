const User = require('../models/user');
const Car = require('../models/car');

module.exports = {
	index: async (req, res, next) => {
		const users = await User.find({});

		res.status(200).json(users);
	},

	newUser: async (req, res, next) => {
		const newUser = new User(req.value.body);
		const user = await newUser.save();
		res.status(201).json(user);
	},

	getUser: async (req, res, next) => {
		// const { userId } = req.params; //this way of getting params is for not using validation middleware
		const { userId } = req.value.params; // after joi validation we extract params from value object
		const user = await User.findById(userId);
		res.status(200).json(user);
	},

	replaceUser: async (req, res, next) => {
		//in put req.body must contains all the fields
		const { userId } = req.value.params;
		const newUser = req.value.body;
		const result = await User.findByIdAndUpdate(userId, newUser);
		res.status(200).json(result);
	},

	updateUser: async (req, res, next) => {
		//in patch req.body contains any number of field
		const { userId } = req.value.params;
		const newUser = req.value.body;
		const result = await User.findByIdAndUpdate(userId, newUser);
		res.status(200).json(result);
	},

	getUserCars: async (req, res, next) => {
		const { userId } = req.value.params;
		const user = await User.findById(userId).populate('cars');
		res.status(200).json(user.cars);
	},

	postUserCar: async (req, res, next) => {
		const newCar = new Car(req.value.body);

		const { userId } = req.value.params;
		const user = await User.findById(userId);
		newCar.seller = user;
		await newCar.save();

		user.cars.push(newCar);
		await user.save();

		res.status(201).json(newCar);
	}
};
