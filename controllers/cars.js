const User = require('../models/user');
const Car = require('../models/car');

module.exports = {
	index: async (req, res, next) => {
		const cars = await Car.find({}).populate('seller');

		res.status(200).json(cars);
	},

	newCar: async (req, res, next) => {
		const seller = await User.findById(req.value.body.seller);
		const newCar = req.value.body;
		delete newCar.seller;
		const car = new Car(newCar);
		car.seller = seller;
		await car.save();
		seller.cars.push(car);
		await seller.save();
		res.status(201).json(car);
	},

	getCar: async (req, res, next) => {
		const car = await Car.findById(req.value.params.carId).populate('seller');
		res.status(200).json(car);
	},

	replaceCar: async (req, res, next) => {
		const { carId } = req.value.params;
		const newCar = req.value.body;
		const result = await Car.findByIdAndUpdate(carId, newCar);
		res.status(200).json({ success: true });
	},

	updateCar: async (req, res, next) => {
		const { carId } = req.value.params;
		const newCar = req.value.body;
		const result = await Car.findByIdAndUpdate(carId, newCar);
		res.status(200).json({ success: true });
	},

	/*not only we delete cars from cars model we also need to delete
	cars from user model */
	deleteCar: async (req, res, next) => {
		const { carId } = req.value.params;
		const car = await Car.findById(carId);
		if (!car) return res.status(404).json({ errors: "Car doesn't exist" }); // "Cannot set headers after they are sent to the client" for this error - add "return" statement to the response
		const sellerId = car.seller;
		const seller = await User.findById(sellerId);

		await car.remove();

		//removing particular car from user's cars list
		seller.cars.pull(car);
		await seller.save();
		res.status(200).json({ success: true });
	}
};
