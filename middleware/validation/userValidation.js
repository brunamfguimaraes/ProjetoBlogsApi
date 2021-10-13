const errors = {
    invalid: 'Invalid entries. Try again.',
    success: 'Email already registered',
  };

  const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userValidation = async (user) => {
    const { name, email, password } = user;
    if (!name || !email || !password) return { message: errors.invalid };
    if (!emailRegEx.test(email)) return { message: errors.invalid };
  
    return {};
  };

module.exports = { userValidation };