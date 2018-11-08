const express = require('express');
const connectToDatabase = require('./models');
const app = express();
const port = process.env.LINNIA_PORT;
const bodyParser = require('body-parser');
const cors = require('cors');
const authenticated = require('./middlewares/authenticated');

const initialize = async () => {
  const { Profile } = await connectToDatabase();
  const registerHandler = require('./routes/register')(Profile);
  const profilesHandler = require('./routes/profiles')(Profile);
  const updateHandler = require('./routes/update')(Profile);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());

  app.post('/auth/register', authenticated, registerHandler);
  app.patch('/auth/update', authenticated, updateHandler);
  app.get('/auth/profiles/:address', profilesHandler);

  app.listen(port || 3000, () => {
    console.log('Stow DDex Auth ready for action.');
  });
};

initialize();


