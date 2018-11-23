const passport = require('passport');
const BnetStrategy = require('passport-bnet').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(
    new BnetStrategy(
        {
            clientID: keys.BNET_ID,
            clientSecret: keys.BNET_SECRET,
            callbackURL: '/auth/bnet/callback',
            proxy: true
        },
        async (accessToken, refreshToken, profile, done) => {
            User.findOne({ bnetId: profile.id })
            .then((data) => {
                if (data._t !== accessToken) {
                    User.findByIdAndUpdate(data.bnetId, { $set: { _t: accessToken }}).save()
                }
            })
            .then(updatedUser => {
                if (updatedUser) {
                    return done(null, updatedUser);
                }
            })
            .catch((error) => {
                console.log(error);
            });

            
            const user = await new User(
                { 
                    bnetId: profile.id,
                    sub: profile.sub,
                    battletag: profile.battletag,
                    provider: profile.provider,
                    _t: accessToken
                }
            ).save();
            done(null, user);
        }
    )
);