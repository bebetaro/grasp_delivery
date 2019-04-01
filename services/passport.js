const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = mongoose.model('users'); // this is used for searching user info

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    await User.findOne({ username }, async (error, user) => {
      //console.log(user);
      //search for user info in DB
      if (error) {
        return done(error);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect user name' });
      }

      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect password' });
      }
    });
  })
);
