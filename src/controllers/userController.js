async function create(req, res) {
  try {
   // const { body } = req;
    const { token } = req;

   // await userService.create(body);

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'An unknown error has occurred' });
  }
}

module.exports = {
  create,
};