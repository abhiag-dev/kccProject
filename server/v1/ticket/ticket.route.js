const express = require("express");
const router = express.Router();
const ticketsController = require("./ticket.controller");

router.post("/create-ticket", ticketsController.createTicket);

router.get("/list-ticket", ticketsController.listTicket);

router.put("/edit-ticket", ticketsController.updateTicket);

router.delete("/delete-ticket", ticketsController.deleteTicket);

router.post('/get-tickets', ticketsController.getTickets);

module.exports = router;