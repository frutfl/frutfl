const router = require('express').Router();
const { Address } = require('../db/models');
module.exports = router;

/*
  there is currently a security flaw for users who did guest checkout
  no one besides admin should be able to get, update, or delete addresses w/o user ids
  for guest users, addresses should not be added to the database until the final submit
  if a guest user adds or edits addresses in the checkout page, those addresses should only exist on the front end
*/

// router.use((req, res, next) => {
//   if (!req.user) return res.sendStatus(404);
//   next();
// });

router.get('/', (req, res, next) => {
  if (!req.user) return res.sendStatus(404);
  Address.findAll({
    where: { userId: req.user.id }
  })
    .then(addresses => res.json(addresses))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Address.create(req.body)
    .then(newAddress => (req.user ? newAddress.setUser(req.user.id) : newAddress))
    .then(newAddress => res.status(201).json(newAddress))
    .catch(next);
});

// need validation to ensure users only update their own addresses
router.put('/:addressId', (req, res, next) => {
  Address.update(req.body, {
    where: { id: +req.params.addressId },
    returning: true,
  })
    .then(([numUpdated, [updatedAddress]]) =>
      (numUpdated ? res.json(updatedAddress) : res.sendStatus(404))
    )
    .catch(next);
});

// need validation to ensure users only update their own addresses
router.delete('/:addressId', (req, res, next) => {
  Address.destroy({
    where: { id: +req.params.addressId }
  })
    .then(numDeleted =>
      (numDeleted ? res.sendStatus(204) : res.sendStatus(404))
    )
    .catch(next);
});
