const messageName = {
    message: '"name" is required',
};

const validateName = (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json(messageName);
    }

    next();
};

module.exports = {
    validateName,
};
