import express, { Request, Response, NextFunction } from "express";
import { Session } from "express-session";
import { ParsedQs } from "qs";
var request = require('sync-request');

var citiesModel = require('../models/Cities')
const weatherRouter = express.Router();

weatherRouter.get('/', async function (req, res, next) {

    try {
        var cityList = await citiesModel.find();
        res.send({ cityList: cityList });
    } catch (err: any) {
        res.status(400).send(err.message); // renvoie une erreur 401 avec le message d'erreur
    }
});

// Add city
weatherRouter.post('/add-city', async function (req, res, next) {

    // let alreadyExist = false;
    var cityList = await citiesModel.find();

    // On utilite l'API openweatherapp
    var data = request("GET", "https://api.openweathermap.org/data/2.5/weather?q=" + req.body.city + "&lang=fr&appid=04f90e64a8301a62b963b3fad2894157&units=metric");
    var dataApi = JSON.parse(data.body);

    if (dataApi.name) {
        dataApi.name = dataApi.name.charAt(0).toUpperCase() + dataApi.name.substr(1).toLowerCase()
        req.body.city = req.body.city.charAt(0).toUpperCase() + req.body.city.substr(1).toLowerCase()
    }


    var doublonCity = await citiesModel.findOne({ name: req.body.city })


    if (doublonCity == null && dataApi.name) {
        var newCity = new citiesModel({
            name: dataApi.name,
            weather: dataApi.weather[0].description,
            img: "http://openweathermap.org/img/w/" + dataApi.weather[0].icon + ".png",
            temp_min: dataApi.main.temp_min,
            temp_max: dataApi.main.temp_max,
            lon: dataApi.coord.lon,
            lat: dataApi.coord.lat
        })
        await newCity.save()
    }
    cityList = await citiesModel.find()

    res.send({ cityList: cityList });
});

// Delete city
weatherRouter.delete('/delete/:id', async function (req, res, next) {
    var cityList = await citiesModel.deleteOne({ _id: req.params.id })
    var cityList = await citiesModel.find();
    res.send({ cityList: cityList });
});

export default weatherRouter;