const express = require('express');
const app = express();

const logger = require('morgan');
app.use(logger('dev'));

app.use('/api', require('./routes'));

const path = require('path');
app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));
app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.use((err, req, res, next) => {
  res.status(500).send({ error: err.message })
});

module.exports = app;
