const express = require('express');

const citiesRouter = express.Router();

const {
	createCity,
	getAllCities,
	getCityById,
	getCityByName,
	updateCity,
	deleteCity,
} = require('../controllers/cities');

citiesRouter.get('/:id', getCityById);
citiesRouter.get('/name/:cityName', getCityByName);
citiesRouter.get('/', getAllCities);
citiesRouter.put('/:id', updateCity);
citiesRouter.post('/', createCity);
citiesRouter.delete('/:id', deleteCity);

module.exports = citiesRouter;
