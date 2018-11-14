const express = require('express');
const connectToDatabase = require('./models');
const port = process.env.LINNIA_PORT;
const bodyParser = require('body-parser');
const cors = require('cors');

const initialize = async () => {
  const app = express();
  const auth = express();

  const { Profile } = await connectToDatabase();

  const authenticated = require('./middlewares/authenticated');
  const active = require('./middlewares/active')(Profile);

  const registerHandler = require('./routes/register')(Profile);
  const profilesHandler = require('./routes/profiles')(Profile);
  const confirmHandler = require('./routes/confirm')(Profile);
  const updateHandler = require('./routes/update')(Profile);
  const loginHandler = require('./routes/login');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());

  auth.patch('/update', authenticated, active, updateHandler);
  auth.get('/login', authenticated, active, loginHandler);
  auth.post('/register', authenticated, registerHandler);
  auth.get('/confirm/:activationCode', confirmHandler);
  auth.get('/profiles/:address', profilesHandler);

  app.use('/auth', auth);

  app.listen(port || 3000, () => {
    console.log('Stow DDex Auth ready for action.');
  });
};

initialize();


