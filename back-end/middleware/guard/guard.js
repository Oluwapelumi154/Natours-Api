const { errResponseMsg } = require('../../utils');

module.exports = {
  admin: (req, res, next) => {
    const { user } = req;
    if (user.role !== 'admin') {
      return errResponseMsg(
        res,
        'fail',
        403,
        "You don't have access to this resource"
      );
    }
    next();
  },

  'lead-guide': (req, res, next) => {
    const { user } = req;
    if (user.role !== 'lead-guide') {
      return errResponseMsg(
        res,
        'fail',
        403,
        "You don't have access to this resource"
      );
    }
    next();
  },

  'tour-guide': (req, res, next) => {
    const { user } = req;
    if (user.role !== 'tour-guide') {
      return errResponseMsg(
        res,
        'fail',
        403,
        "You don't have access to this resource"
      );
    }
    next();
  }
};
