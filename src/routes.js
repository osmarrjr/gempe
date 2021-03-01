const express = require('express');
const UserController = require('./controllers/UserController');
const PeopleController = require('./controllers/PeopleController');
const SessionController = require('./controllers/SessionController');
const authMidleware = require('./middlewares/auth');
const routes = express.Router();
const cors = require('cors');

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

routes.use(cors(corsOptions));

routes.post('/user-register', UserController.store);
routes.post('/session', SessionController.store);
routes.post('/people', PeopleController.store);

routes.use(authMidleware);

routes.get('/people', PeopleController.index)
routes.get('/people/:id', PeopleController.show);
routes.get('/people-filter', PeopleController.getByFilter)

routes.put('/people/:id', PeopleController.update);

routes.delete('/people/:id', PeopleController.delete);

module.exports = routes;