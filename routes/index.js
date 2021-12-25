const admin = require('./admin');
const testToken = require('./testToken');
const middleware = require('../middlewares/verifyToken');
const user = require('./user');
const citizen = require('./citizen');
const web = require('./web');
function route(app) {
    app.use('/testToken', middleware, testToken);
    app.use('/createAdmin', admin);
    app.use('/user', middleware, user);
    app.use('/citizen', middleware, citizen);
    app.use('/web', web);
}

module.exports = route;