const GolfKart = require("../../../models/sql/GolfKart.js");
const Tickets = require('../../../models/sql/ticket.js');
const { Op, fn, col, literal } = require('sequelize');
GolfKart.hasMany(Tickets, { foreignKey: 'golfkart_id' });
Tickets.belongsTo(GolfKart, { foreignKey: 'golfkart_id' });
async function addGolfKart(req, res) {
    try {
        const golfKartData = req.body;
        const newGolfKart = await GolfKart.create(golfKartData);
        res.status(201).json(newGolfKart);
    } catch (error) {
        console.error("Error adding golfKart:", error);
        res.status(500).json({ error: "Failed to add golfKart" });
    }
}

async function listGolfKart(req, res) {
    try {
        const golfKarts = await GolfKart.findAll();
        res.json(golfKarts);
    } catch (error) {
        console.error("Error fetching golfKarts:", error);
        res.status(500).json({ error: "Failed to fetch golfKarts" });
    }
}

async function editGolfKart(req, res) {
    try {
        const {
            id,
            golfkart_id,
            city,
            rtmp_url,
            rtmp_key,
            capacity,
            driver_name,
            driver_phone_number,
            is_active,
        } = req.body;

        const golfKart = await GolfKart.findByPk(id);
        if (!golfKart) {
            return res.status(404).json({ error: "Golf Kart not found" });
        }

        await golfKart.update({
            golfkart_id,
            city,
            rtmp_url,
            rtmp_key,
            capacity,
            driver_name,
            driver_phone_number,
            is_active,
        });

        res.json(golfKart);
    } catch (error) {
        console.error("Error editing golfKart:", error);
        res.status(500).json({ error: "Failed to edit golfKart" });
    }
}

async function deleteGolfKart(req, res) {
    try {
        const { id } = req.body;

        const golfKart = await GolfKart.findByPk(id);
        if (!golfKart) {
            return res.status(404).json({ error: "golfKart not found" });
        }

        await golfKart.destroy();

        res.json({ message: "golfKart deleted" });
    } catch (error) {
        console.error("Error deleting golfKart:", error);
        res.status(500).json({ error: "Failed to delete golfKart" });
    }
}

async function getGolfKartDetails(req, res) {
    try {
        const { date } = req.body;

        const startDate = new Date(date);
        const endDate = new Date(date);
        endDate.setDate(endDate.getDate() + 1);

        const golfKarts = await GolfKart.findAll({
            attributes: [
                'id',
                'golfkart_id',
                'city',
                'rtmp_url',
                'rtmp_key',
                'capacity',
                'driver_name',
                'driver_phone_number',
                'is_active', [fn('COALESCE', fn('SUM', col('Tickets.total_amount')), 0), 'total_ticket_sale'],
                [fn('COALESCE', fn('SUM', literal('Tickets.no_adults + Tickets.no_children')), 0), 'total_passenger_count'],
            ],
            include: [{
                model: Tickets,
                attributes: [],
                where: {
                    date_time: {
                        [Op.gte]: startDate,
                        [Op.lt]: endDate,
                    },
                    payment_status: 'SUCCESSFUL'
                },
                required: false,
            }],
            group: ['GolfKart.id'],
        });

        res.json(golfKarts);
    } catch (error) {
        console.error('Error fetching golf karts:', error);
        res.status(500).json({ error: 'Failed to fetch golf karts' });
    }
}

module.exports = {
    addGolfKart,
    listGolfKart,
    editGolfKart,
    deleteGolfKart,
    getGolfKartDetails,
};