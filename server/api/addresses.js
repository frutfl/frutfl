const router = require('express').Router();
const { Address } = require('../db/models');
module.exports = router;

router.use((req, res, next) => {
  if (!req.user) return res.sendStatus(404);
  next();
});

router.get('/', (req, res, next) => {
  Address.findAll({
    where: { userId: req.user.id }
  })
    .then(addresses => res.json(addresses))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Address.create(req.body)
    .then(newAddress => res.setStatus(201).json(newAddress))
    .catch(next);
});

router.put('/:addressId', (req, res, next) => {
  Address.update(req.body, {
    where: { id: req.addressId },
    returning: true,
  })
    .then(([numUpdated, [updatedAddress]]) =>
      (numUpdated ? res.setStatus(204).json(updatedAddress) : res.sendStatus(404))
    )
    .catch(next);
});

router.delete('./:addressId', (req, res, next) => {
  Address.destroy({
    where: { id: req.addressId }
  })
    .then(numDeleted =>
      (numDeleted ? res.sendStatus(204) : res.sendStatus(404))
    )
    .catch(next);
});
