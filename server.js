const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

    app.use(bodyParser.json());
    const properties = [];

//Endpoint to add a new property
    app.post("/properties", (req, res) => {
        const {name, units} = req.body;
        if (!name || !units) {
        return res.status(400).json({ error: "Property name and units are required"});
    }
    properties.push({name, units});
    res.status(201).json({message: "Property added successfully." });
    });

//Endpoint to delete a property
    app.delete("/properties", (req, res) => {
        const {name} = req.body;
        const index = properties.findIndex((porp) => properties.name === name);

        if (index === -1) {
            return res.status(404).json({ error: "Property not found."});  
        }
        properties.splice(index, 1);
    res.status(200).json({ message: "Property deleted succssfully."});
    });

//Endpoint to fetch all properties
    app.get("/properties", (req, res) => {
        const sortedProperties = properties.sort((a, b) => a.name.localeCompare(b.name));
        res.status(200).json({ properties: sortedProperties});
    });

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });