const loginUser = require('./loginUserUseCase');

const login = async(request, response, next) => {
  console.log(loginUser)
  try{
    const users = await loginUser(request.body);

    return response.status(200).json(users);
  }catch(error) {
    return next(error);
  };
};

module.exports = login;