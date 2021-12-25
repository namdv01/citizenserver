const express = require('express');
const route = express.Router();
const controller = require('../controllers/Citizen');
const middleware = require('../middlewares/verifyToken');

route.post('/createCitizen', controller.create);
route.get('/search/:id', controller.search);
route.get('/delete/:id', controller.delete);
route.post('/update/:id', controller.update);
route.get('/searchByIdAdress/:id', controller.searchByIdAdress);
route.get('/:id', controller.get);

module.exports = route;