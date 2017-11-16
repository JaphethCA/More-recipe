import Validator from 'validatorjs';


export function signinValidator(data) {
  const signinRules = {
    email: 'required|email',
    password: 'required|min:5'
  };
  const validate = new Validator(data, signinRules);
  const errors = {};
  const isValid = false;
  if (validate.passes()) {
    return {
      isValid: true,
      errors
    };
  }
  setTimeout(() => {
    errors.email = [];
  }, 5000);
  return {
    isValid,
    errors: validate.errors.errors
  };
}

export function signUpValidator(data) {
  const signinRules = {
    email: 'required|email',
    password: 'required|min:5',
    firstname: 'required|min:3',
    lastname: 'required|min:3',
    username: 'required|min:3',
    verifyPassword: 'required|min:5|same:password'
  };
  const validate = new Validator(data, signinRules);
  const errors = {};
  const isValid = false;
  if (validate.passes()) {
    return {
      isValid: true,
      errors
    };
  }
  return {
    isValid,
    errors: validate.errors.errors
  };
}

export function recipeFormValidator(data) {
  const formRules = {
    name: 'required',
    ingredient: 'required',
    direction: 'required',
    description: 'required'
  };
  const validator = new Validator(data, formRules);
  const errors = {};
  const isValid = false;
  if (validator.passes()) {
    return {
      isValid: true,
      errors
    };
  }
  return {
    isValid,
    errors: validator.errors.errors
  };
}

export function profileUpdateFormValidator(data) {
  const formRules = {
    firstname: 'required',
    lastname: 'required',
    password: 'required',
    username: 'required'
  };
  const validator = new Validator(data, formRules);
  const errors = {};
  const isValid = false;
  if (validator.passes()) {
    return {
      isValid: true,
      errors
    };
  }
  return {
    isValid,
    errors: validator.errors.errors
  };
}
