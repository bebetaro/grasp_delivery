const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session');
const cors = require('cors');

const keys = require('./config/keys');
require('./models/User'); // Use user model globally
require('./models/Order'); //Use  order model globally
require('./services/passport'); //Use authentication rule globally

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json()); // To use body is request as json style
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize()); // To start to use passport middleware
app.use(passport.session()); // To keep session while system is working

app.use(cors()); // Open cors from client

require('./routes/authRoutes')(app);
require('./routes/orderRoutes')(app);
require('./routes/uploadRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);
