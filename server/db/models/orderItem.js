const Sequelize = require('sequelize');
const db = require('../db');

const OrderItem = db.define('orderItems', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: { min: 1 }
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      min: 0
    }
  },
});

module.exports = OrderItem;
