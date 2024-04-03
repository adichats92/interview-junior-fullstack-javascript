const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
	cityName: { type: String, required: [true, 'City name is required!'] },
	count: { type: Number, required: [true, 'Count is required!'] },
});
module.exports = mongoose.model('City', citySchema);
