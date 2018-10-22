const express = require('express');
const app = express();

const logger = require('morgan');
app.use(logger('dev'));

app.use(require('body-parser').json());

app.use('/api', require('./routes'));

const path = require('path');
app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.status || 500).send({ error: err.message })
});

module.exports = app;
