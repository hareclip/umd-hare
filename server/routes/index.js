const { Router } = require('express');
const articles = require('./articles');
const authors = require('./authors');
const categories = require('./categories');
const admin = require('./admin');
const staff = require('./staff');

const api = new Router();

module.exports = api;

api.use('/articles', articles);
api.use('/authors', authors);
api.use('/categories', categories);
api.use('/admin', admin);
api.use('/staff', staff);