const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
require('./services/passport');

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.COOKIE_KEY]
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

app.get('/', (req, res) => {
    res.send(req.user ? res.redirect('/api/current_user') : 'User not logged in...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server listening on PORT ' + PORT));