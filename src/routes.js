const express = require('express');
const UserController = require('./controllers/UserController');
const PeopleController = require('./controllers/PeopleController');
const SessionController = require('./controllers/SessionController');
const authMidleware = require('./middlewares/auth');
const routes = express.Router();
const cors = require('cors');

routes.post('/user', UserController.store);
routes.post('/session', SessionController.store);

routes.use(cors())
routes.use(authMidleware);

routes.post('/people', PeopleController.store);

routes.get('/people', PeopleController.index)
routes.get('/people/:id', PeopleController.show);
routes.get('/people-filter', PeopleController.getByFilter)

routes.put('/people/:id', PeopleController.update);

routes.delete('/people/:id', PeopleController.delete);

module.exports = routes;