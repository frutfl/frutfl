// seed files stored in Google Drive https://drive.google.com/open?id=1E4f87qQITAj_rC2LgJalIeK_u4GvP1Ol
// Google Sheets converted to JSON using https://www.csvjson.com/csv2json

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

console.log(products[0]);
