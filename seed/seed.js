// seed files stored in Google Drive https://drive.google.com/open?id=1E4f87qQITAj_rC2LgJalIeK_u4GvP1Ol
// Google Sheets converted to JSON using https://www.csvjson.com/csv2json

const db = require('../server/db');
const { Product, Category } = require('../server/db/models');

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

db.sync({ force: true })
.then(() => {
  console.log('seeding database...');
  products.forEach(product => {
    Product.create(product)
    .then(newProduct => {
      if (product.Category1) {
        return Category.findOrCreate({
          where: { name: product.Category1 }
        })
        .then(([cat, _]) => {
          return cat.addProduct(newProduct);
        });
      }
    });
  });
});
