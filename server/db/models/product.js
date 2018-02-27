const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  species: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  variety: {
    type: Sequelize.STRING,
  },
  organic: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
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
  unit: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isCurrentlyAvailable: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  photos: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  name: {
    type: Sequelize.VIRTUAL,
    get () {
      return (this.getDataValue('organic') ? this.getDataValue('organic') + 'Organic ' : '') + (this.getDataValue('variety') ? this.getDataValue('variety') + ' ' : '') + this.getDataValue('species');
    }
  }
});

module.exports = Product;
