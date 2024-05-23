const Sequelize = require("sequelize");
const sequelize = require("../../config/database");


const GolfKart = require("./GolfKart");
const Camera = sequelize.define(
    "Camera", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        golf_kart_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: GolfKart,
                key: 'id',
            },
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        total_passenger_count: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    }, {
        timestamps: false,
        tableName: "Camera",
    }
);



module.exports = Camera;