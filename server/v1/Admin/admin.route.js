const express = require("express");
const adminController = require("./admin.controller");

const router = express.Router();

router.post("/add-admin", adminController.addAdmin);

router.put("/edit-admin", adminController.editAdmin);

router.post("/login-admin", adminController.loginAdmin);

router.get("/list-admin", adminController.listAdmin);

module.exports = router;
