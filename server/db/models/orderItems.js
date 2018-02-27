const Sequelize = require('sequelize');
const db = require('../db');

const OrderItems = db.define('orderItems', {
  quantity: {
    type: Sequelize.INTEGER,
    validate: { min: 1 }
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      min: 0
    }
  },
});

module.exports = OrderItems;
