const validateEmail = (email) => {
  if (!email) {
    return {
      error: {
        status: 400,
        message: '"email" is required',
      },
    };
  }

  const emailRegex = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g);
  if (!emailRegex.test(email)) {
    return {
      error: {
        status: 400,
        message: '"email" must be a valid email',
      },
    };
  }

  return { message: 'Succefull' };
};

const validateName = (name) => {
  if (!name) {
    return {
      error: {
        status: 400,
        message: '"displayName" is required',
      },
    };
  }
  
  if (name.length < 8) {
    return {
      error: {
        status: 400,
        message: '"displayName" length must be at least 8 characters long',
      },
    };
  }

  return { message: 'Succefull' };
};

const validatePassword = (password) => {
  if (!password) {
    return {
      error: {
        status: 400,
        message: '"password" is required',
      },
    };
  }
  
  if (password.length < 6) {
    return {
      error: {
        status: 400,
        message: '"password" length must be 6 characters long',
      },
    };
  }

  return { message: 'Succefull' };
};

const validateUniqueUser = async (model, email) => {
  const found = await model.findOne({ where: { email } });
  if (found) {
    return {
      error: {
        status: 409,
        message: 'User already registered',
      },
    };
  }

  return { message: 'Succefull' };
};

module.exports = {
  validateEmail,
  validateName,
  validatePassword,
  validateUniqueUser,
};