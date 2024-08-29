const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 3000;

    app.use(cors());
    app.use(bodyParser.json());


    const properties = [];

//Endpoint to add a new property
    app.post("/properties", (req, res) => {
        const {name, units} = req.body;
        const validUnits = ["kitchen", "bathroom", "bedroom", "living-room"];
        const isValid = units.every((unit) => validUnits.includes(unit.type) && Number.isInteger(unit.count) && unit.count > 0);

        if (!name || !isValid) {
        return res.status(400).json({ error: "Invalid property name or units"});
    }
    properties.push({name, units});
    res.status(201).json({message: "Property added successfully." });
    });

//Endpoint to delete a property
app.delete('/properties', (req, res) => {
    const { name } = req.body;
  
    const index = properties.findIndex((prop) => prop.name.trim().toLowerCase() === name.trim().toLowerCase());
  
    if (index === -1) {
      return res.status(404).json({ error: 'Property not found.' });
    }
  
    properties.splice(index, 1);
    res.status(200).json({ message: 'Property deleted successfully.' });
  });
  

//Endpoint to fetch all properties
    app.get("/properties", (req, res) => {
        let { bedrooms} = req.query;
        let filteredProperties = properties;

        if (bedrooms) {
            bedrooms = parseInt(bedrooms, 10);
            if (!isNaN(bedrooms)) {
                filteredProperties = properties.filter(property => {
                
                    const bedroomCount = property.units.reduce((count, unit) => {
                        return unit.type === "bedroom" ? count + unit.count : count;
                    }, 0);
                    return bedroomCount === bedrooms;
                });
            }
        }

        const sortedProperties = filteredProperties.sort((a, b) => a.name.localeCompare(b.name));
        res.status(200).json({ properties: sortedProperties});
    });

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });