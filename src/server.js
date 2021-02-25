const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const login = process.env.MONGO_LOGIN;
const password = process.env.MONGO_PASSWORD;
const app = express();

mongoose.connect(`mongodb+srv://${login}:${password}@gempe.owuo6.mongodb.net/GEMPE?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json());
app.use(routes);

app.listen(3333);