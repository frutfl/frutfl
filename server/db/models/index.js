const Address = require('./address');
const Category = require('./category');
const Order = require('./order');

const Product = require('./product');

const User = require('./user');

User.hasMany(Address);
Address.belongsTo(User);

module.exports = {
  Address,
  Category,
  Order,

  Product,

  User,
};
