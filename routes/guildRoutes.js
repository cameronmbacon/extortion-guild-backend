const axios = require('axios');
const passport = require('passport');

module.exports = (app) => {
    app.get('/api/guild', (req, res) => {
        console.log('USER INFO: ' + req.user);        
        axios({
            url: 'https://us.api.blizzard.com/wow/guild/garrosh/extortion',
            method: 'get',
            headers: { 'Authorization': `Bearer ${req.user._t}` }
        })
        .then(response => {
            res.send(response.data);
        })
        .catch(error => {
            console.log(error);
            res.redirect('/auth/bnet');
        });
    });
};
