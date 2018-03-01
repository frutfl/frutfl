const Sequelize = require('sequelize');
const db = require('../db');
const OrderItem = require('./orderItem');
const Product = require('./product');

const Order = db.define('order', {
    status: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    scopes: {
        orderItems: {
            include: [
                {
                    model: OrderItem,
                    include: [Product]
                }
            ]
        }
    }
});

Order.STATUSES = {
    CREATED: 'CREATED',
    PROCESSING: 'PROCESSING',
    CANCELLED: 'CANCELLED',
    COMPLETED: 'COMPLETED'
}

module.exports = Order;
