const passport = require('passport');
const BnetStrategy = require('passport-bnet').Strategy;
const keys = require('../config/keys');

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(
    new BnetStrategy(
        {
            clientID: keys.BNET_ID,
            clientSecret: keys.BNET_SECRET,
            callbackURL: '/auth/bnet/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            done(null, profile);
        }
    )
);