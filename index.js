const express = require('express');
const app = require('express')();
const logger = require('morgan');
const mongoose = require('mongoose');
const users = require('./routes/users');
const cars = require('./routes/cars');

// mongoose.Promise = global.Promise //telling mongoose to use global promise system
app.use(express.json());

mongoose.connect('mongodb://localhost/codeworkrapiproject', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
});

//middleware
app.use(logger('dev'));

//routes
app.use('/users', users);
app.use('/cars', cars);

//catch 404 error and forward them to error handler
app.use((req, res, next) => {
	const err = new Error('Not Fount');
	err.status = 400;
	next(err);
});

//Error handler function
app.use((err, req, res, next) => {
	const error = app.get('env') === 'development' ? err : {};
	const status = err.status || 500;

	//respond to client
	res.status(status).json({
		error: { message: error.message }
	});
});

app.listen(2000, () => console.log('Listening to server at 2000'));
