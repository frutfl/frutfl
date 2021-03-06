const router = require('express').Router();
const {User} = require('../db/models');
const {isAdmin, isAdminOrSelf} = require('../auth/middleware');
module.exports = router;

router.get('/', isAdmin, (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email', 'accountType', 'isActive', 'shouldResetPassword'],
    order: [
      ['id', 'ASC']
    ]
  })
    .then(users => res.json(users))
    .catch(next);
});

router.put('/:userId', isAdminOrSelf, (req, res, next) => {
  User.findById(req.params.userId)
  .then(user => {
    return user.update(req.body);
  })
  .then(user => res.json(user))
  .catch(next);
});
