const services = require('express').Router();
const generator = require('./generator');

services.use('/', generator);

module.exports = services;
