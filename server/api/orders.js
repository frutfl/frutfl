const router = require('express').Router();
const {Order, User} = require('../db/models');
const {isLoggedIn, isAdmin} = require('../auth/middleware');

module.exports = router;

router.get('/', isLoggedIn, (req, res, next) => {
  if (req.user.accountType === User.ACCOUNT_TYPES.ADMIN) {
    Order.scope('defaultScope', 'orderItems').findAll({
      order: [
        ['id', 'DESC']
      ]
    })
      .then(products => res.json(products))
      .catch(next);
  } else {
    Order.scope('defaultScope', 'orderItems').findAll({
      where: {
        userId: req.user.id
      },
      order: [
        ['id', 'DESC']
      ]
    })
    .then(products => res.json(products))
    .catch(next);
  }
});

router.put('/:orderId', isAdmin, (req, res, next) => {
  Order.update(
    { status: req.body.status },
    { where: { id: req.params.orderId }}
  )
  .then(() => res.sendStatus(200))
  .catch(next);
});
