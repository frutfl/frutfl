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
    allowNull: false,
    defaultValue: true,
  },
  photos: {
      type: Sequelize.ARRAY(Sequelize.STRING), /* eslint-disable-line new-cap */
      defaultValue: ['/images/fill-murray.jpg']
  },
  name: {
    type: Sequelize.VIRTUAL,
    get () {
      return (this.getDataValue('organic') ? 'Organic ' : '') + (this.getDataValue('variety') ? this.getDataValue('variety') + ' ' : '') + this.getDataValue('species');
    }
  }
},
{
  hooks: {
    beforeCreate: product => {
      product.description = `${product.name} are a delicious fruit. They can be enjoyed while perusing some lorem ipsum text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
    }
  }
});

module.exports = Product;
