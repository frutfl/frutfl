const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  volume: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isCurrentlyAvailable: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  photos: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
})

module.exports = Product;
