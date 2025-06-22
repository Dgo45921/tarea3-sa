const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/cis', require('./routes/ci.routes'));
app.use('/api/cis', require('./routes/ciTags.routes'));
app.use('/api/cis', require('./routes/ciRelationships.routes'));
app.use('/api/cis', require('./routes/changeLogs.routes'));


module.exports = app;