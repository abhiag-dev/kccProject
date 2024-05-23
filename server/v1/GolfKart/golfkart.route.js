const express = require("express");
const router = express.Router();
const golfKartController = require("./golfkart.controller.js");

router.post("/add-golfKart", golfKartController.addGolfKart);

router.get("/list-golfKart", golfKartController.listGolfKart);

router.put("/edit-golfKart", golfKartController.editGolfKart);

router.delete("/delete-golfKart", golfKartController.deleteGolfKart);

router.post('/golfKart-details', golfKartController.getGolfKartDetails);
module.exports = router;