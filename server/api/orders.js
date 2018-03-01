const router = require('express').Router();
const {Order, User} = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  if (!req.user) return res.sendStatus(404);
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
