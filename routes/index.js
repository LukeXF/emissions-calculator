const express = require('express');
const axios = require('axios');
const router = express.Router();
const config = require('../config');

router.get('/:km', function (req, res, next) {
    let {passengers, reg} = req.query;
    axios.get(`https://uk1.ukvehicledata.co.uk/api/datapackage/VehicleData?v=2&api_nullitems=1&auth_apikey=${config.apiKey}&user_tag=&key_VRM=` + reg)
        .then(function (response) {
            // res.send(response.data);
            let {Response} = response.data;
            let {km} = req.params;
            let yourCar, co2Kg, co2;
            if (Response.StatusCode === 'Success') {
                co2 = Response.DataItems.TechnicalDetails.Performance.Co2;
                co2Kg = Response.DataItems.TechnicalDetails.Performance.Co2 / 1000;
                yourCar = {
                    emissions: {
                        co2,
                        emissions: Response.DataItems.VehicleStatus.MotVed.VedCo2Emissions,
                        VedCo2Band: Response.DataItems.VehicleStatus.MotVed.VedCo2Band
                    },
                    consumption: Response.DataItems.TechnicalDetails.Consumption,
                    car: Response.DataItems.ClassificationDetails.Dvla,
                    co2KgForTrip: ((km) * (co2Kg)),
                    co2KgPerKm: co2Kg,
                }
            }
            // handle success
            let final = {
                yourCar,
                smallCar: {
                    co2KgForTrip: parseKgForTrip(km * config.smallCar),
                    co2KgPerKm: config.smallCar,
                },
                largeCar: {
                    co2KgForTrip: parseKgForTrip(km * config.largeCar),
                    co2KgPerKm: config.largeCar,
                },
                train: {
                    co2KgForTrip: parseKgForTrip(km * config.train),
                    co2KgPerKm: config.train,
                },
                coach: {
                    co2KgForTrip: parseKgForTrip(km * config.coach),
                    co2KgPerKm: config.coach,
                },
                plane: {
                    co2KgForTrip: parseKgForTrip(km * config.plane),
                    co2KgPerKm: config.plane,
                },
                meta: {
                    id: req.query.id,
                    km,
                    passengers
                }
            };
            if (passengers) {
                if (Response.StatusCode === 'Success') {
                    final.yourCar.co2KgForTripPerPerson = co2 / passengers;
                }
                final.smallCar.co2KgForTripPerPerson = 0.1276 / passengers;
                final.largeCar.co2KgForTripPerPerson = 0.257 / passengers;
                final.train.co2KgForTripPerPerson = 0.06 * passengers;
                final.coach.co2KgForTripPerPerson = 0.089 * passengers;
                final.plane.co2KgForTripPerPerson = 0.1753 * passengers;
            }
            res.send(final);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });

});

function parseKgForTrip(input) {
    return parseFloat(input.toFixed(2));
}

module.exports = router;
