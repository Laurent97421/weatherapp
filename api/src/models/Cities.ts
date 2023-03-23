var mongoose = require('mongoose');

var citySchema = mongoose.Schema({
    name: String,
    weather: String,
    img: String,
    temp_min: Number,
    temp_max: Number,
    lon: Number,
    lat: Number
});

var cityModel = mongoose.model('cities', citySchema);

module.exports = cityModel;