const passport = require('passport');

module.exports = (app) => {
    app.get('/auth/bnet', passport.authenticate('bnet', {
        scope: ['wow.profile']
    }));
    
    app.get(
        '/auth/bnet/callback',
        passport.authenticate('bnet'),
        (req, res) => {
            res.redirect('/api/current_user/');
        }
    );

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {        
        res.send(req.user);
    });
};
