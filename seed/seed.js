// seed files stored in Google Drive https://drive.google.com/open?id=1E4f87qQITAj_rC2LgJalIeK_u4GvP1Ol
// Google Sheets converted to JSON using https://www.csvjson.com/csv2json

const db = require('../server/db');
const { User, Product, Category, Order, OrderItem, Address } = require('../server/db/models');

const products = require('./productSeed.json');
const users = require('./userSeed.json');

const seedFiles = [products, users];

seedFiles.forEach(seedFile => {
  seedFile.forEach(item => {
    Object.keys(item).forEach(key => {
      if (item[key] === '') {
        delete item[key];
      } else if (item[key] === 'TRUE') {
        item[key] = true;
      } else if (item[key] === 'FALSE') {
        item[key] = false;
      }
      if (key === 'password') {
        item[key] = item[key].toString();
      }
    });
  });
});

async function seedProducts() {
  for (let i = 0; i < products.length; i++) {
    await Product.create(products[i])
      .then(newProduct => {
        const categories = [];
        if (products[i].Category1) {
          categories.push(Category.findOrCreate({
            where: { name: products[i].Category1 }
          })
            .then(([cat, _]) => {
              return cat.addProduct(newProduct);
            }));
        }
        if (products[i].Category2) {
          categories.push(Category.findOrCreate({
            where: { name: products[i].Category2 }
          })
            .then(([cat, _]) => {
              return cat.addProduct(newProduct);
            }));
        }
        return Promise.all(categories);
      });
    }
    console.log(`seeded ${products.length} products`);
}

async function seedUsers() {
  for (let i = 0; i < users.length; i++) {
    await User.create(users[i]);
  }
  console.log(`seeded ${users.length} users`);
}

async function seedOrders() {
  let address = await Address.create({
    name: 'Matthew Gaba',
    street: '9129 Loma Vista Dr.',
    city: 'Dallas',
    state: 'Texas',
    country: 'USA',
    zipCode: '75243',
    userId: 3,  // Hacky association, will revise
  });
  let order1 = await Order.create({
    status: Order.STATUSES.CREATED,
    userId: 1,
    addressId: address.id
  });
  let order2 = await Order.create({
    status: Order.STATUSES.CREATED,
    userId: 1,
    addressId: address.id
  });
  await OrderItem.create({
    quantity: 1,
    price: 0.89,
    orderId: order1.id,
    productId: 1
  });
  await OrderItem.create({
    quantity: 1,
    price: 1.89,
    orderId: order1.id,
    productId: 2
  });
  await OrderItem.create({
    quantity: 1,
    price: 4.49,
    orderId: order2.id,
    productId: 1
  });
  console.log('seeded orders and order items');
}

db.sync({ force: true })
  .then(() => {
    console.log('seeding database...');
    return seedProducts()
      .then(() => seedUsers())
      .then(() => seedOrders());
  })
  .catch(err => console.log(err))
  .finally(() => {
    db.close();
    console.log('db closed');
    return null;
  });
