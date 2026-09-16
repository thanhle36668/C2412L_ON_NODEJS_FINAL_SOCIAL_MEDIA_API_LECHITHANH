const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.error(errors.array()[0].msg, "E-VAL", 400);
  }

  next();
};

module.exports = validate;
