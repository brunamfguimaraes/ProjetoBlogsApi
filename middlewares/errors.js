module.exports = (err, _req, res, _next) => {
if (err.isJoi) {
  return res.status(400).json({ message: err.details[0].message });
}

const statusCode = {
  userAlreadyExist: 409,
  missingAuthToken: 401,
  userDontExist: 400,

};
const statusMenssage = {
  userAlreadyExist: 'User already registered',
  missingAuthToken: 'Token not found',
  userDontExist: 'Invalid fields',
};

return res.status(statusCode[err] || 500).json({ message: statusMenssage[err] });
};