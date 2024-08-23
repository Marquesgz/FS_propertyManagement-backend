const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

//Endpoint to add a new property
    app.use(bodyParser.json());
    const properties = [];

    app.post("/properties", (req, res) => {
        const {name, units} = req.body;
    if (!name || !units) {
        return res.status(400).json({ error: "Property name and units are required"});
    }
    properties.push({name, units});
    res.status(201).json({message: "Property added successfully." });
    });