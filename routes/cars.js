const router = require('express-promise-router')();
const { validateParam, validateBody, schemas } = require('../helpers/routeHelpers');
const carsController = require('../controllers/cars');

router.route('/').get(carsController.index).post(validateBody(schemas.newCarSchema), carsController.newCar);

module.exports = router;
