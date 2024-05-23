const Camera = require('../../../models/sql/Camera');
const GolfKart = require('../../../models/sql/GolfKart');
const { Op, fn, col } = require("sequelize");

Camera.belongsTo(GolfKart, { foreignKey: 'golf_kart_id' });

async function addCamera(req, res) {
    try {
        const { golf_kart_id, total_passenger_count } = req.body;
        const date = new Date();
        const newCamera = await Camera.create({ golf_kart_id, total_passenger_count, date });
        res.status(201).json(newCamera);
    } catch (error) {
        console.error('Error adding camera:', error);
        res.status(500).json({ error: 'Failed to add camera' });
    }
}

async function listCameras(req, res) {
    try {
        const { golf_kart_id, date } = req.body;
        const whereClause = {};

        if (golf_kart_id) {
            whereClause.golf_kart_id = golf_kart_id;
        }

        if (date) {
            const startDate = new Date(date);
            const endDate = new Date(date);
            endDate.setDate(endDate.getDate() + 1);

            whereClause.date = {
                [Op.gte]: startDate,
                [Op.lt]: endDate
            };
        }
        const cameras = await Camera.findAll({ where: whereClause });
        res.json(cameras);
    } catch (error) {
        console.error('Error fetching cameras:', error);
        res.status(500).json({ error: 'Failed to fetch cameras' });
    }
}
async function getCameraDetails(req, res) {
    try {
        const { date } = req.body;

        if (!date) {
            return res.status(400).json({ error: "Date is required" });
        }

        const startDate = new Date(date);
        const endDate = new Date(date);
        endDate.setDate(endDate.getDate() + 1);

        const cameras = await Camera.findAll({
            attributes: [
                'golf_kart_id', [fn('SUM', col('total_passenger_count')), 'total_passenger_count'],
            ],
            // include: [{
            //     model: GolfKart,
            //     attributes: [
            //         'golfkart_id',
            //         'city',
            //         'rtmp_url',
            //         'rtmp_key',
            //         'capacity',
            //         'driver_name',
            //         'driver_phone_number',
            //         'is_active'
            //     ],
            // }],
            where: {
                date: {
                    [Op.gte]: startDate,
                    [Op.lt]: endDate,
                }
            },
            group: ['golf_kart_id']
        });

        res.json(cameras);
    } catch (error) {
        console.error('Error fetching cameras:', error);
        res.status(500).json({ error: 'Failed to fetch cameras' });
    }
}

module.exports = {
    addCamera,
    listCameras,
    getCameraDetails,
};