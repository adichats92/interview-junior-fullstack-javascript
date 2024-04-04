const City = require('../models/city');

const createCity = async (req, res) => {
	try {
		const newCity = await City.create(req.body);
		res.status(201).json(newCity);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
const getAllCities = async (req, res) => {
	try {
		const cities = await City.find();
		res.json(cities);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
const getCityById = async (req, res) => {
	const { id } = req.params;
	try {
		const cities = await City.find({ _id: id });
		if (cities.length === 0) {
			res.status(404).json({ message: `City with id ${id} Not Found` });
		} else {
			res.json(cities[0]);
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
const getCityByName = async (req, res) => {
	const { cityName } = req.params;
	try {
		// using regex for match by search input and 'i' for case insensitive, (optional: limit of 5 results per req in case needed for big data)
		const regex = new RegExp(`${cityName}`, 'i');
		const cities = await City.find({ cityName: regex });
		// .limit(5);
		if (cities.length === 0) {
			res.status(404).json({ message: `City with name ${cityName} Not Found` });
		} else {
			res.json(cities);
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
const updateCity = async (req, res) => {
	const { id } = req.params;
	try {
		const updatedCity = await City.findOneAndUpdate({ _id: id }, req.body, {
			new: true,
		});
		if (!updatedCity) {
			res.status(404).json({ message: `City with id ${id} Not Found` });
		} else {
			res.json(updatedCity);
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
const deleteCity = async (req, res) => {
	const { id } = req.params;
	try {
		const deleteRes = await City.findOneAndDelete({ _id: id });
		console.log('Delete Res', deleteRes);
		if (!deleteRes) {
			res.status(404).json({ message: `City with id ${id} Not Found` });
		} else {
			res.json({ message: 'City Deleted!' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	createCity,
	getAllCities,
	getCityById,
	getCityByName,
	updateCity,
	deleteCity,
};
