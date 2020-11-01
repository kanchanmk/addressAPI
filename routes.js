"user strict";

const express = require("express");

const routes = express.Router();

const addresses = [
    {
        id: 1,
        name: "Ms. Erwin",
        addressLine1: "1234 Center dr",
        addressLine2: "Unit 34",
        addressLine3: "",
        city: "Troy",
        state: "MI",
        zipcode: 48084
    },
    {
        id: 2,
        name: "Mrs. Angelman",
        addressLine1: "33 Centerpoint dr",
        addressLine2: "",
        addressLine3: "",
        city: "Troy",
        state: "MI",
        zipcode: 48085
    },
    {
        id: 3,
        name: "Mr. Martin",
        addressLine1: "55 Thistlelane dr",
        addressLine2: "Unit 34",
        addressLine3: "",
        city: "Holland",
        state: "MI",
        zipcode: 40043
    },
    {
        id: 4,
        name: "Mr. Blake",
        addressLine1: "3231 Charter dr",
        addressLine2: "Unit 123",
        addressLine3: "Charter Square Apartments",
        city: "Troy",
        state: "MI",
        zipcode: 48085
    },
    {
        id: 5,
        name: "Ms. March",
        addressLine1: "79 Stony creek rd",
        addressLine2: "",
        addressLine3: "",
        city: "Shelby Twp",
        state: "MI",
        zipcode: 48315
    }
];

let nextId = 6;


//GET /addresses - respond with a JSON array of addresses
routes.get("/addresses", (req,res)=>{
    res.json(addresses);
});

// GET /addresses/# - respond with a JSON for a particular address
routes.get("/addresses/:id", (req, res) => {

    const id = parseInt(req.params.id);
    const address = addresses.find(address => address.id === id);
    if (address) {
      res.json(address);
    } else {
      res.status(404);
      res.send(`No address with id ${id} exists.`);
    }
});

// POST /addresses - add a address
routes.post("/addresses", (req, res) => {
    // use JSON body of the request for the new address data
    const address = req.body;
    address.id = nextId++;
    addresses.push(address);
  
    res.status(201);
    res.json(address);
});

// UPDATE /addresses/# - update an address
routes.put("/addresses/:id", (req, res) => {
	let id = parseInt(req.params.id);
	let body = req.body;
	let index = addresses.findIndex((adrs) => {
		return adrs.id === id;
	});
	addresses[index] = body;
	addresses[index].id = id;
	res.status(200);
	res.json(addresses[index]);
});

  
// DELETE /addresses/# - delete an address
routes.delete("/addresses/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = addresses.findIndex(address => address.id === id);
    if (index !== -1) {
      addresses.splice(index, 1);
    }
    res.status(204);
    res.send(); // <-- empty send to finish response with no body
});



module.exports = routes;