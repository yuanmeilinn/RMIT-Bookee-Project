const Response = require('rapid-status');
const User     = require('../services/User/users');

module.exports = async (req, res, next) => {

    try {
        let authorization = req.headers.authorization || req.headers.Authorization;
        let response;
        let store = req.params.id;

        if(authorization && store) {
            let response = await User.isAdmin(authorization, store);

            if(response.status === 200) {
                req.user = response.data["data"];
                next();

            } else {
                res.status(response.status || 500).jsonp(response);
            }

        } else {
            // Authorization header not provided
            response = Response.FORBIDDEN(null, "You don't have enough permissions to access this endpoint.");

            res.status(response.status).jsonp(response);
        }
    } catch (err) {
        res.status(err.status || 500).jsonp(err);
    }

}