const express = require('express');
const route = express.Router();
const controller = require('../controllers/User');

route.get('/profile', controller.profile);
route.post('/createUser', controller.create);
route.post('/changePassword', controller.change);
route.post('/repair/:id', controller.repair);
route.get('/inferior', controller.inferior);
route.get('/turnOffState/:id', controller.turnOffState);
route.get('/turnOnState/:id', controller.turnOnState);
route.get('/submit/:id', controller.submit);
route.get('/remove/:id', controller.remove);

module.exports = route;