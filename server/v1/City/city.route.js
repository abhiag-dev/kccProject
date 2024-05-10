const express = require("express");
const router = express.Router();
const cityController = require("./city.controller");

router.post("/add-city", cityController.addCity);

router.get("/list-city", cityController.listCity);

router.put("/change-city-status", cityController.changeCityStatus);

module.exports = router;
