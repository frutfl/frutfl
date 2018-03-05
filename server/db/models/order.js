const Sequelize = require('sequelize');
const db = require('../db');
const OrderItem = require('./orderItem');
const Product = require('./product');
const Address = require('./address');

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
                },
                {
                    model: Address,
                    as: 'shippingAddress'
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
};

module.exports = Order;
