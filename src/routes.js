const express = require('express');
const SessionController = require('./controllers/SessionController');
const PeopleController = require('./controllers/PeopleController');
const People = require('./models/People');
const routes = express.Router();

routes.post('/user', SessionController.store);
routes.post('/people', PeopleController.store);

routes.get('/people/:id', PeopleController.show);

module.exports = routes;