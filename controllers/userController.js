const { CREATED } = require('http-status');

const createUser = async (req, res) => res.status(CREATED).json();

module.exports = {
    createUser,
};
