// seed files stored in Google Drive https://drive.google.com/open?id=1E4f87qQITAj_rC2LgJalIeK_u4GvP1Ol
// Google Sheets converted to JSON using https://www.csvjson.com/csv2json

const db = require('../server/db');
const { User, Product, Category } = require('../server/db/models');

const products = require('./productSeed.json');

products.forEach(item => {
  Object.keys(item).forEach(key => {
    if (item[key] === '') {
      delete item[key];
    } else if (item[key] === 'TRUE') {
      item[key] = true;
    } else if (item[key] === 'FALSE') {
      item[key] = false;
    }
  });
});

async function seedProducts() {
  for (let i = 0; i < products.length; i++) {
    await Product.create(products[i])
      .then(newProduct => {
        if (products[i].Category1) {
          return Category.findOrCreate({
            where: { name: products[i].Category1 }
          })
            .then(([cat, _]) => {
              return cat.addProduct(newProduct);
            });
        }
      });
  }
  console.log(`seeded ${products.length} products`);
}

// async function seedUsers() {
//   const users = await Promise.all([
//     User.create({ email: 'cody@email.com', password: '123' }),
//     User.create({ email: 'murphy@email.com', password: '123' })
//   ]);
//   console.log(`seeded ${users.length} users`);
// }

db.sync({ force: true })
  .then(() => {
    console.log('seeding database...');
    return seedProducts()
    // .then(seedUsers);
  })
  .catch(err => console.log(err))
  .finally(() => {
    db.close();
    console.log('db closed');
    return null;
  });
