const router = require('express').Router();
const { Review, User } = require('../db/models');
module.exports = router;

router.post('/', (req, res, next) => {
  if (!req.user || (req.user.accountType !== User.ACCOUNT_TYPES.ADMIN &&
      req.user.id !== req.body.userId)) {
        return res.sendStatus(404);
      }
  Review.create(req.body)
    .then(newReview => res.status(201).json(newReview))
    .catch(next);
});
