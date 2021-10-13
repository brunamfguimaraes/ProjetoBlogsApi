module.exports = ({ id, email, displayName }) => {
  const userWithoutPass = {
    id,
    displayName,
    email,
  };
  return userWithoutPass;
};
