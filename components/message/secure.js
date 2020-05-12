const auth = require('../../auth/index')

module.exports = function checkAuth(action) {


    function middleware(req, res, next) {
        switch (action) {

            case 'update':
                const owner = req.body.user
                auth.check.own(req, owner)
                next();

            case 'create':
                auth.check.logged(req)
                next();
                break;

            default:
                next()
        }
    }

    return middleware;
}