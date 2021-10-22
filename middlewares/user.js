const verifyDisplayName = (displayName) => displayName.length >= 8;

const verifyEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

module.exports = {
  verifyDisplayName,
  verifyEmail,
};