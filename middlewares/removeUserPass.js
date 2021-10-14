const removeUserPass = ({ id, email, displayName }) => {
  const userWithoutPass = {
    id,
    email,
    displayName,
  };
  return userWithoutPass;
};

module.exports = removeUserPass;