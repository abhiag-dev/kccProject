const express = require("express");
const adminRoutes = require("./Admin/admin.route.js");
const cityRoutes = require("./City/city.route.js");
const ticketRoutes = require("./ticket/ticket.route.js");
const posRoutes = require("./POS/pos.route.js");
const golfKartRoutes = require("./GolfKart/golfkart.route.js");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("Root route (/) has been accessed");
  res.send("OK");
});
router.use("/admin", adminRoutes);
router.use("/city", cityRoutes);
router.use("/ticket", ticketRoutes);
router.use("/pos", posRoutes);
router.use("/golfkart", golfKartRoutes);
module.exports = router;
