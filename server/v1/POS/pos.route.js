const express = require("express");
const posController = require("./pos.controller");

const router = express.Router();

router.post("/add-pos", posController.addPOS);

router.get("/list-pos", posController.listPOS);

router.put("/edit-pos", posController.editPOS);

router.put("/change-status", posController.changePOSStatus);

module.exports = router;
