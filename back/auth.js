
import GoogleStrategy from'passport-google-oauth20';
import passport from 'passport';
import 'dotenv/config';
import userModel from './modal/userModel.js';

const{GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET}=process.env;

passport.use(new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    // callbackURL: 'http://localhost:8080/user/auth/google/callback',
    callbackURL:'https://dekhinxabackend.onrender.com/user/auth/google/callback',
    passReqToCallback: true,
  },
  async function (request, accessToken, refreshToken, profile, done) {
    try {
      const user = await userModel.findOne({ email: profile.emails[0].value });

      if (user) {
        console.log('user exist');
        return done(null, user);
      } else {
        
        const newUser = await userModel.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          
        });

        // console.log('New user created:', newUser);

        return done(null, newUser);
      }
    } catch (error) {
      console.error('Error in Google OAuth strategy:', error);
      return done(error);
    }
  }
));

passport.serializeUser(function (user, done) {
  return done(null, user);
});

passport.deserializeUser(function (user, done) {
  return done(null, user);
});
