const express = require('express');
const path = require('path');

const IndexController = require('./controllers/IndexController');

const app = express();

app.use(IndexController)

app.use(express.static(path.resolve(__dirname, '../build')))

app.use('*', (req, res) => {
  res.sendHead(404)
})

module.exports = app