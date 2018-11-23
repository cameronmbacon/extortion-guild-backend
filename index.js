const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.MONGODB_URI, { useNewUrlParser: true }, () => console.log('Connected to MongoDB via mongoose.js'));

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.COOKIE_KEY]
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/guildRoutes')(app);
require('./routes/authRoutes')(app);

app.get('/', (req, res) => {
    res.send(req.user ? res.redirect('/api/current_user') : 'User not logged in...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server listening on PORT ' + PORT));