const router = require('express-promise-router')();
const { validateParam, validateBody, schemas } = require('../helpers/routeHelpers');
const carsController = require('../controllers/cars');

router.route('/').get(carsController.index).post(validateBody(schemas.carSchema), carsController.newCar);

router
	.route('/:carId')
	.get(validateParam(schemas.idSchema, 'carId'), carsController.getCar)
	.put([ validateParam(schemas.idSchema, 'carId'), validateBody(schemas.putCarSchema) ], carsController.replaceCar)
	.patch([ validateParam(schemas.idSchema, 'carId'), validateBody(schemas.patchCarSchema) ], carsController.updateCar)
	.delete(validateParam(schemas.idSchema, 'carId'), carsController.deleteCar);
module.exports = router;

/*The only difference between put and patch request is that put needs all the fields
 to be required during update and patch dont */
