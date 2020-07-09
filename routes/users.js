const router = require('express-promise-router')(); //this package allows us to automatically catch errors so we dont have to use try-catch over and over again in controller file
const usersController = require('../controllers/users');
const { validateParam, validateBody, schemas } = require('../helpers/routeHelpers');

router.route('/').get(usersController.index).post(validateBody(schemas.userSchema), usersController.newUser);

router
	.route('/:userId')
	.get(validateParam(schemas.idSchema, 'userId'), usersController.getUser)
	.put([ validateParam(schemas.idSchema, 'userId'), validateBody(schemas.userSchema) ], usersController.replaceUser)
	.patch(
		[ validateParam(schemas.idSchema, 'userId'), validateBody(schemas.userPatchSchema) ],
		usersController.updateUser
	);

router
	.route('/:userId/cars')
	.get(validateParam(schemas.idSchema, 'userId'), usersController.getUserCars)
	.post(
		[ validateParam(schemas.idSchema, 'userId'), validateBody(schemas.userCarSchema) ],
		usersController.postUserCar
	);

module.exports = router;
