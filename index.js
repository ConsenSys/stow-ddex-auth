const express = require('express');
const connectToDatabase = require('./models');
const app = express();
const port = process.env.LINNIA_PORT;
const bodyParser = require('body-parser');
const cors = require('cors');

const initialize = async () => {
  const { Profile } = await connectToDatabase();
  const registerHandler = require('./routes/register')(Profile);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());

  app.post('/register', registerHandler);

  app.listen(port || 3000, () => {
    console.log('Stow DDex Auth ready for action.');
  });
};

initialize();


