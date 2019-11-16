# Emissions Travel Calculator
Calculate the best way to travel based on the distance and amount of passengers you have.

It will feedback emissions data for small cars, large cars, trains, planes and coaches. You can even provide your own car into the mix.
 
For #lincolnHack19, A 24 hour hackathon in Lincoln. Nov 16-17th 2019
- Website: https://2019.lincolnhack.org
- Twitter https://twitter.com/techlincs


### Setup
- `yarn install` and `yarn start` to run the project.
- Edit the `config.json` to change the emissions values.
- Runs on `http://localhost:3000/:km`.

### Inputs
- For 30 KM emissions use `http://localhost:3000/30`.
- For 2 passengers add `?&passengers=2` to the end.
- See below on how to add a custom registration plate.

### To use your own car emission data
- *UK registration plates only*
- Get your API key from https://uk1.ukvehicledata.co.uk.
- Use `?reg=WG17ASV` for example in the url to load a specific car's emissions.
- A free sandbox account only allows registration plates containing the letter `A` and data is 12 months old.
- Some valid registration plates (that work in sandbox):
`RY65AYA`,`NJ63YRA`,`YM55AOW`,`DV61MWA`,`T595UAK`,`WG17ASV`,`KM14AKK`,`GU09AOC`,`KM12AKK`,`CX57AUO`,`DA57NMK`,`YG08KJA`,`AEZ8878`.

### References
- Small and large car journeys averages data is provided by The RAC.
- Air journeys averages data (planes) is provided by The National Atmospheric Emissions Inventory.
- Bus / Coach and Light Rail journeys averages data is provided by The Department for Environment, Food and Rural Affairs.

### Useful Links
- [Car fuel data, CO2 and vehicle tax tools](https://carfueldata.vehicle-certification-agency.gov.uk/) 
- [Car carbon footprint calculator](https://calculator.carbonfootprint.com/calculator.aspx?tab=4) 

### Example Response:
```
{ 
   "yourCar":{ 
      "emissions":{ 
         "co2":93,
         "emissions":93,
         "VedCo2Band":"E"
      },
      "consumption":{ 
         "ExtraUrban":{ 
            "Lkm":3.6,
            "Mpg":78.5
         },
         "UrbanCold":{ 
            "Lkm":5,
            "Mpg":56.5
         },
         "Combined":{ 
            "Lkm":99.9,
            "Mpg":2.8
         }
      },
      "car":{ 
         "Model":"AYGO X-PRESS VVT-I",
         "Make":"TOYOTA"
      },
      "co2KgForTrip":107.415,
      "co2KgPerKM":0.093,
      "co2KgForTripPerPerson":46.5
   },
   "smallCar":{ 
      "co2KgForTrip":147.38,
      "co2KgPerKM":0.1276,
      "co2KgForTripPerPerson":0.0638
   },
   "largeCar":{ 
      "co2KgForTrip":296.83,
      "co2KgPerKM":0.257,
      "co2KgForTripPerPerson":0.1285
   },
   "train":{ 
      "co2KgForTrip":69.3,
      "co2KgPerKM":0.06,
      "co2KgForTripPerPerson":0.12
   },
   "coach":{ 
      "co2KgForTrip":102.8,
      "co2KgPerKM":0.089,
      "co2KgForTripPerPerson":0.178
   },
   "plane":{ 
      "co2KgForTrip":202.47,
      "co2KgPerKM":0.1753,
      "co2KgForTripPerPerson":0.3506
   },
   "meta":{ 
      "km":"1155",
      "passengers":"2"
   }
}
```
