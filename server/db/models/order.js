const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
    quantity: {
        type: Sequelize.INTEGER,
        validate: { min: 0 }
    },
    price: {
        type: Sequelize.FLOAT,
        validate: {
            allowNull: false,
            min: 0.01
        }
    },
    status: {
        type: Sequelize.STRING,
        validate: {
            allowNull: false
        }
    }
})

module.exports = Order
