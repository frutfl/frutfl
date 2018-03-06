const router = require('express').Router();
const {Product, Category} = require('../db/models');
const {isAdmin} = require('../auth/middleware');

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

router.put('/:id', isAdmin, (req, res, next) => {
    Product.update(
        req.body, {
            where: {id: req.params.id},
            returning: true
        })
        .then(product => {
            res.status(200);
            res.json(product);
        })
        .catch(next);
});
