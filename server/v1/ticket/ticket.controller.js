const Tickets = require("../../../models/sql/ticket.js");

async function createTicket(req, res) {
  try {
    const ticketData = req.body;
    const newTicket = await Tickets.create(ticketData);
    res.status(201).json(newTicket);
  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(500).json({ error: "Failed to create ticket" });
  }
}

async function listTicket(req, res) {
  try {
    const tickets = await Tickets.findAll();
    res.json(tickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
}

async function updateTicket(req, res) {
  try {
    const {
      id,
      pos_id,
      golfkart_id,
      no_adults,
      no_children,
      is_gov_official,
      is_foreigner,
      total_amount,
      payment_method,
      payment_status,
      ticket_id,
      date_time,
    } = req.body;
    const ticket = await Tickets.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    await ticket.update({
      pos_id,
      golfkart_id,
      no_adults,
      no_children,
      is_gov_official,
      is_foreigner,
      total_amount,
      payment_method,
      payment_status,
      ticket_id,
      date_time,
    });

    res.json(ticket);
  } catch (error) {
    console.error("Error updating ticket:", error);
    res.status(500).json({ error: "Failed to update ticket" });
  }
}

async function deleteTicket(req, res) {
  try {
    const { id } = req.body;

    const ticket = await Tickets.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    await ticket.destroy();

    res.json({ message: "Ticket deleted successfully" });
  } catch (error) {
    console.error("Error deleting ticket:", error);
    res.status(500).json({ error: "Failed to delete ticket" });
  }
}

module.exports = {
  createTicket,
  listTicket,
  updateTicket,
  deleteTicket,
};
