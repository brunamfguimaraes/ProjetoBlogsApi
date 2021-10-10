require('dotenv').config();

const app = require('./config/customExpress');

const PORT = process.env.PORT || '3000';

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
