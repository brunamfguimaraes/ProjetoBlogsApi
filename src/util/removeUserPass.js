module.exports = ({ id, displayName, email, image }) => {
  const userWithoutPass = {
    id,
    displayName,
    email,
    image,
  };
  return userWithoutPass;
};
