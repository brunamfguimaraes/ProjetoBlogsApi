const validateName = (name) => {
  if (!name) {
    return { status: 400, message: '"name" is required' };
  }
  return true;
};

const validateToken = (token) => {
  if (!token) {
    return { status: 401, message: 'Token not found' };
  }
  if (token.length < 16) {
    return { status: 401, message: 'Expired or invalid token' };
  }
  return true;
};

const createCategorie = (name, token) => {
  const isValidName = validateName(name);
  const isValidToken = validateToken(token);
  if (isValidName.message) {
    return isValidName;
  }
  if (isValidToken.message) {
    return isValidToken;
  }
  return true;
};

module.exports = {
  createCategorie,
};