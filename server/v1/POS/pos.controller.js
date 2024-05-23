const POS = require("../../../models/sql/pos.js");
const { Op, literal, fn, col } = require('sequelize');
const Tickets = require('../../../models/sql/ticket.js');
POS.hasMany(Tickets, { foreignKey: 'pos_id' });
async function addPOS(req, res) {
    try {
        const posData = req.body;

        const newPOS = await POS.create(posData);

        res.status(201).json(newPOS);
    } catch (error) {
        console.error("Error creating POS:", error);
        res.status(500).json({ error: "Failed to create POS" });
    }
}

async function listPOS(req, res) {
    try {
        const posList = await POS.findAll();

        res.json(posList);
    } catch (error) {
        console.error("Error fetching POS:", error);
        res.status(500).json({ error: "Failed to fetch POS" });
    }
}
async function editPOS(req, res) {
    try {
        const { id, pos_id, pos_name, pos_key, city, is_active } = req.body;

        const pos = await POS.findByPk(id);

        if (!pos) {
            return res.json({ error: "POS not found" });
        }

        await pos.update({
            pos_id,
            pos_name,
            pos_key,
            city,
            is_active,
        });

        res.json(pos);
    } catch (error) {
        console.error("Error updating POS:", error);
        res.status(500).json({ error: "Failed to update POS" });
    }
}

async function changePOSStatus(req, res) {
    try {
        const { id, is_active } = req.body;

        const pos = await POS.findByPk(id);
        if (!pos) {
            return res.status(404).json({ error: "POS not found" });
        }

        await pos.update({ is_active });

        res.json(pos);
    } catch (error) {
        console.error("Error changing POS status:", error);
        res.status(500).json({ error: "Failed to change POS status" });
    }
}
async function getpos(req, res) {
    try {
        const { date } = req.body;

        // If to date is not mentioned, set it as the current date
        const toDate = date ? new Date(date) : new Date();
        toDate.setDate(toDate.getDate() + 1);
        // If from date is not mentioned and to date is mentioned, give error
        if (!req.body.date) {
            return res.status(400).json({ error: "From date is not mentioned" });
        }

        const fromDate = new Date(date);

        const posMachines = await POS.findAll({
            attributes: [
                'id',
                'pos_id',
                'pos_name',
                'pos_key',
                'city',
                'is_active', [fn('COALESCE', fn('COUNT', col('Tickets.id')), 0), 'totalTicketSale'],
                [fn('COALESCE', fn('SUM', col('Tickets.total_amount')), 0), 'totalCollectionAmount'],
                [fn('COALESCE', fn('SUM', literal("CASE WHEN Tickets.payment_method = 'Online' THEN Tickets.total_amount ELSE 0 END")), 0), 'onlinePayment'],
                [fn('COALESCE', fn('SUM', literal("CASE WHEN Tickets.payment_method = 'Cash' THEN Tickets.total_amount ELSE 0 END")), 0), 'cashPayment']
            ],
            include: [{
                model: Tickets,
                attributes: [],
                where: {
                    date_time: {
                        [Op.gte]: fromDate,
                        [Op.lt]: toDate,
                    },
                },
                required: false, // Use LEFT JOIN
            }],
            group: ['POS.id'],
        });
        const formattedPOS = posMachines.map(pos => ({
            id: pos.id,
            pos_id: pos.pos_id,
            pos_name: pos.pos_name,
            pos_key: pos.pos_key,
            city: pos.city,
            is_active: pos.is_active,
            totalTicketSale: pos.totalTicketSale,
            totalCollectionAmount: {
                online: pos.onlinePayment,
                cash: pos.cashPayment,
                total: pos.totalCollectionAmount
            }
        }));

        res.json({ posDetails: formattedPOS });
    } catch (error) {
        console.error('Error fetching POS machines:', error);
        res.status(500).json({ error: 'Failed to fetch POS machines' });
    }
}

module.exports = {
    addPOS,
    listPOS,
    editPOS,
    changePOSStatus,
    getpos
};