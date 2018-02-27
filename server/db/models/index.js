const Address = require('./address');
const Category = require('./category');
const Order = require('./order');
const OrderItem = require('./orderItem');
const Product = require('./product');
const Review  = require('./review');
const User = require('./user');

Address.belongsTo(User);
Address.hasMany(Order);

Category.belongsToMany(Product, {through: 'ProductCategory'});

Order.belongsTo(Address);
Order.belongsTo(User);
Order.hasMany(OrderItem);

OrderItem.belongsTo(Order);

Product.belongsToMany(Category, {through: 'ProductCategory'});
Product.hasMany(Review);

Review.belongsTo(Product);
Review.belongsTo(User);

User.hasMany(Address);
User.hasMany(Order);
User.hasMany(Review);

module.exports = {
  Address,
  Category,
  Order,
  OrderItem,
  Product,
  Review,
  User,
};
