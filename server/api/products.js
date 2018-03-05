const router = require('express').Router();
const {Product, Category} = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
    Product.findAll({
        include: {model: Category}
    })
        .then(products => res.json(products))
        .catch(next);
});

router.get('/:id', (req, res, next) => {
    Product.findOne({
        where: {
            id: req.params.id
        }})
        .then(product => res.json(product))
        .catch(next);
});
