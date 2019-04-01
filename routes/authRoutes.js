const _ = require('lodash');
const passport = require('passport');
const mongoose = require('mongoose');
const axios = require('axios');
const uuid = require('uuid/v1');
const bcrypt = require('bcrypt');

const requireLogin = require('../middleware/requireLogin');
const User = mongoose.model('users'); // this is used for saving user info

module.exports = app => {
  app.post('/api/login', passport.authenticate('local'), (req, res) => {
    res.send(req.user); // send back user info here
    //console.log(req.user);
  });

  app.get('/api/company_list', requireLogin, async (req, res) => {
    await User.find({}, (err, users) => {
      if (err) {
        return err;
      }
      const pre_array = users.map(user => {
        const { company } = user;
        return { company };
      });
      //console.log(company_array);
      const company_array = new Set(pre_array);
      res.send(Array.from(company_array));
    });
  });

  // For async validation of login
  app.post('/api/user_check', async ({ body }, res) => {
    const { username, password } = body;
    // Find user
    await User.findOne({ username }, async (error, user) => {
      if (error) {
        return error;
      }
      //if no user
      if (user === null) {
        res.send({ answer: 'NotFound' });
      }
      // if there is a password and validate password
      if (password !== (null || undefined)) {
        const result = await bcrypt.compare(password, user.password);
        //console.log(result);
        if (result) {
          return res.send({});
        } else {
          return res.send({ answer: 'Wrong' });
        }
      }
    });
  });

  app.post('/api/user_search', async ({ body }, res) => {
    const result = await User.findOne(
      { username: body.username },
      (error, user) => {
        if (error) {
          return error;
        }
        if (!user) {
          return false;
        }
        return true;
      }
    );
    res.send(result);
  });

  app.post('/api/register', async ({ body }, res) => {
    const userid = uuid();
    const hash = await bcrypt.hashSync(body.password, 10);
    //get body here
    const user = await new User({
      username: body.username,
      password: hash,
      firstname: body.firstname,
      lastname: body.lastname,
      company: body.company,
      _userId: userid
    }).save();
    //console.log(user);
    res.send(user);
    //res.send(user) send back user info to client
  });

  app.get('/api/get/user', (req, res) => {
    if (req.user) {
      res.send(true);
    }
  });

  app.get('/api/get/user_info', (req, res) => {
    const { firstname, lastname, company, username } = req.user;
    res.send({ firstname, lastname, company, username });
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};
