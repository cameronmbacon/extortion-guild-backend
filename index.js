const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send({ hello: 'guild! '});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server listening on PORT ' + PORT));