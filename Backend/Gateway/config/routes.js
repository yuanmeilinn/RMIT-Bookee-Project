const express = require('express');
const app = express.Router();

// API v1 Routes
app.use('/users', require('../app/routes/api/user'));

app.use('/stores', require('../app/routes/api/store'));
app.use('/catalog', require('../app/routes/api/catalog'));

app.use('/booking', require('../app/routes/api/booking'));
app.use('/slot', require('../app/routes/api/slot'));

app.use('/review', require('../app/routes/api/review'));

app.use('/notification', require('../app/routes/api/notification'));

// Documentation
app.get('/documentation', (req, res) => res.jsonp({title: "Deprecated", message: "Use Insomnia JSON file instead."}));

module.exports = app;
