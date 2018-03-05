const router = require('express').Router();
const {Product, Category, User, Review} = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
    Product.findAll()
        .then(products => res.json(products))
        .catch(next);
});

router.get('/:id', (req, res, next) => {
    Product.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {model: Category},
            {
                model: Review,
                include: [User]
            }
        ]
    })
        .then(product => res.json(product))
        .catch(next);
});
