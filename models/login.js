module.exports = (sequelize, dataTypes) => {
const Login = sequelize.define('login', {
email: dataTypes.STRING,
password: dataTypes.STRING,
},
{
timestamps: false,
});
return Login;
};
