const Request = require('../utils/Request');
module.exports = async (req, res, next) => {
    console.log("HEADERS: ", req.headers);

    const token = req.headers.authorization || req.headers.Authorization;


    let request = new Request(`${process.env.USER_SERVICE_ENDPOINT}/user/validation`);
    request.acceptJson();
    request.appendHeader("authorization", token);

    try {
        let response = await request.get();

        if(response.status === 200) {
            req.user = response.data["data"];

            next();
        } else {
            console.log("Check HTTP Status");
            res.status(response.status || 500).jsonp(response);
        }
    } catch(err) {
        console.log(err);
        res.status(err.status || 500).jsonp(err);
    }
}
