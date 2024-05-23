const Tickets = require("../../../models/sql/ticket.js");
const GolfKart = require('../../../models/sql/GolfKart.js');
const POS = require("../../../models/sql/pos.js");

const { Op } = require('sequelize');
async function createTicket(req, res) {
    try {
        const {
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
        } = req.body;

        const golfKart = await GolfKart.findByPk(golfkart_id);

        if (!golfKart) {
            return res.status(404).json({ error: "Golf Kart not found" });
        }

        if ((no_adults + no_children) > golfKart.capacity) {
            return res.status(400).json({ error: 'The number of adults and children exceeds the capacity of the golf kart.' });
        }

        const pos = await POS.findByPk(pos_id);

        if (!pos || !pos.is_active) {
            return res.status(400).json({ error: 'The POS is not active.' });
        }

        date_time = new Date();
        const newTicket = await Tickets.create({
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
            date_time
        });
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
async function getTickets(req, res) {
    try {
        const {
            fromDate,
            toDate,
            golfkart_id,
            pos_id,
            payment_method,
            is_gov_official,
            is_foreigner
        } = req.body;


        if (toDate && !fromDate) {
            return res.status(400).json({ error: "From date is not mentioned" });
        }


        const finalToDate = toDate ? new Date(toDate) : new Date();
        finalToDate.setDate(finalToDate.getDate() + 1);


        const finalFromDate = new Date(fromDate);


        const whereClause = {
            date_time: {
                [Op.between]: [finalFromDate, finalToDate]
            }
        };

        if (golfkart_id) {
            whereClause.golfkart_id = golfkart_id;
        }

        if (pos_id) {
            whereClause.pos_id = pos_id;
        }

        if (payment_method) {
            whereClause.payment_method = payment_method;
        }

        if (typeof is_gov_official !== 'undefined') {
            whereClause.is_gov_official = is_gov_official;
        }

        if (typeof is_foreigner !== 'undefined') {
            whereClause.is_foreigner = is_foreigner;
        }

        const tickets = await Tickets.findAll({
            where: whereClause,
            // include: [{
            //     model: GolfKart,
            //     attributes: ['golfkart_id', 'driver_name'],
            // }, ]
        });

        res.json(tickets);
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ error: 'Failed to fetch tickets' });
    }
}
module.exports = {
    createTicket,
    listTicket,
    updateTicket,
    deleteTicket,
    getTickets
};