const {User} = require('../db/models');

const isLoggedIn = (req, res, next) => {
  if (!req.user) return res.sendStatus(404);
  else next();
}

const isAdmin = (req, res, next) => {
  if (!req.user || req.user.accountType !== User.ACCOUNT_TYPES.ADMIN) {
    return res.sendStatus(404);
  }
  else {
    next();
  }
}

module.exports = { isLoggedIn, isAdmin };
