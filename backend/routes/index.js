const routes = require('express').Router();

/* GET home page. came from build of frontend */
routes.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public', 'index.html'))
});

const services = require('./services');
routes.use('/services', services);

module.exports = routes;
