const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmpty(data.handle)) {
    errors.handle = 'Handle Cannot be empty';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
