const removeUserPass = ({ id, email, displayName, image }) => {
  const userWithoutPass = {
    id,
    email,
    displayName,
    image,
  };
  return userWithoutPass;
};

module.exports = removeUserPass;