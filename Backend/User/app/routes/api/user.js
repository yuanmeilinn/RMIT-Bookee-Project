const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' })
const fs = require('fs');
const Users = require('../../controllers/users');
const Response = require('rapid-status');
const checkAuth = require('../../middlewares/checkAuth');


/**
 * Registers a new username
 * {body.name}: STRING,
 * {body.username}: STRING,
 * {body.email}: STRING,
 * {body.address}: STRING,
 * {body.city}: STRING,
 * {body.zipCode}: STRING,
 * {body.password}: STRING
 */
router.post('/register', (req, res) => {
    let response;
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) console.log(err);

        const user = req.body;
        user.password = hash;

        Users.createUser(user)
            .then(dataTemp => {
                let data = dataTemp.toObject();
                delete data.password;
                response = Response.CREATED(data);

                let path = `${__dirname}/../../public/${data._id}`;
                console.log(__dirname);

                fs.mkdirSync(path);

                res.status(response.status).jsonp(response);
            })
            .catch( err => {
                response = Response.INTERNAL_ERROR(err);
                res.status(response.status).jsonp(response);
        });
    })
});


/**
 * Authenticates a user
 * {body.email}: STRING,
 * {body.password}: STRING
 */
router.post('/authentication', async (req, res) => {
    let response;
    const userAuth = {
        email: req.body.email,
        password: req.body.password
    };

    try {
        let user = await Users.searchWithEmailOrUsername(userAuth.email);

        if(!user) {
            response = Response.UNAUTHORIZED(undefined, `${userAuth.email} does not match our records`);
            res.status(response.status).jsonp(response);
        }
        else {
            let result = await bcrypt.compare(userAuth.password, user.password);

            if (!result){
                response = Response.UNAUTHORIZED(undefined, 'Invalid credentials');
                res.status(response.status).jsonp(response);
            }
            else {
                const token = jwt.sign({ user: user._id }, process.env.AUTH_SECRET,
                    {expiresIn: process.env.AUTH_TOKEN_TIMETOLIVE},
                    {algorithm: process.env.AUTH_TOKEN_ALGORITHM});

                res.setHeader('Authorization', token);

                response = Response.CREATED({
                    user: {
                        email: user.email,
                        username: user.username,
                        name: user.name,
                        address: user.address,
                        city: user.city,
                        zipCode: user.zipCode,
                        favorites: user.favorites,
                        avatar: user.avatar,
                        reviews: user.reviews,
                        bookings: user.bookings,
                        type: user.type,
                        stores: user.stores
                    }
                });
                res.status(response.status).jsonp(response);
            }
        }
    } catch(err){
        response = Response.INTERNAL_ERROR(err);
        res.status(response.status).jsonp(response);
    }
})


/**
 * Updates user's information
 * {body.name}: STRING,
 * {body.username}: STRING,
 * {body.email}: STRING,
 * {body.address}: STRING,
 * {body.city}: STRING,
 * {body.zipCode}: STRING,
 * {header.Authorization}: TOKEN
 */
router.put('/account',checkAuth, async (req, res) => {
    let response;
    let userId = req.decodedUser.id;

    let newInfo = {
        name: req.body.name,
        username: req.body.username,
        address: req.body.address,
        email: req.body.email,
        city: req.body.city,
        zipCode: req.body.zipCode
    }
    try{
        Users.updateInfo(newInfo, userId)
            .then(dataTemp => {
                let data = dataTemp.toObject();
                delete data.password;
                response = Response.ACCEPTED(data);
                res.status(response.status).jsonp(response);
            }).catch(err => {
                response = Response.INTERNAL_ERROR(err);
                res.status(response.status).jsonp(response);
            });
    } catch (err) {
        response = Response.INTERNAL_ERROR(err);
        res.status(response.status).jsonp(response);
    }
})


/**
 * Updates user's password
 * {body.password}: STRING,
 * {body.newPassword}: STRING
 * {header.Authorization}: TOKEN
 */
router.patch('/password', checkAuth, async (req, res) => {
    let response;

    let userAuth = {
        id: req.decodedUser.id,
        password: req.body.oldPassword,
        newPassword: req.body.newPassword
    };

    try{
        let user = await Users.findById(userAuth.id);

        let result = await bcrypt.compare(userAuth.password, user.password);

        if (!result) {
            response = Response.UNAUTHORIZED(undefined, 'Invalid credentials');
            res.status(response.status).jsonp(response);
        }
        else {
            bcrypt.hash(userAuth.newPassword, 10, (err, hash) => {
                if (err) console.log(err);

                Users.updatePassword(userAuth.id, hash).
                    then(dataTemp => {
                        let data = dataTemp.toObject();
                        delete data.password;
                        response = Response.ACCEPTED(data);
                        res.status(response.status).jsonp(response);
                    }).catch(err => {
                        response = Response.INTERNAL_ERROR(err);
                        res.status(response.status).jsonp(response);
                    })
            })
        }
    } catch(err){
        response = Response.INTERNAL_ERROR(err);
        res.status(response.status).jsonp(response);
    }
})


/**
 * Uploads user's avatar
 * {file.avatar} : FILE,
 * {header.Authorization} : TOKEN
 */
router.post('/avatar', checkAuth, upload.single('avatar'), (req,res) => {
    let userId = req.decodedUser.id;
    // let oldPath = __dirname + '/../../../' + req.file.path;
    // let newPath = __dirname + '/../../public/' + req.params.id + req.file.originalname;
    let oldPath = `${__dirname}/../../../${req.file.path}`;
    let newPath = `${__dirname}/../../public/${userId}/${req.file.originalname}`;

    fs.rename(oldPath, newPath, function(err) {
        if(err) {
            response = Response.INTERNAL_ERROR(err);
            res.status(response.status).json(response);
        }
    });
    let imagePath = `/public/${userId}/${req.file.originalname}`;

    Users.updatePhoto(userId, imagePath)
        .then(dataTemp => {
            let data = dataTemp.toObject();
            delete data.password;
            response = Response.CREATED(data);
            res.status(response.status).json(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err);
            res.status(response.status).json(err);
        });
});


/**
 *  Tests if Authorization Token is correct
 *  {header.Authorization}: TOKEN
 */
router.get('/validation', checkAuth, (req, res) => {
    let response = Response.OK(req.decodedUser, "Authorized");
    res.status(response.status).jsonp(response);
});

/**
 * Get Several Users by Array of Ids
 */
router.post('/profiles', (req, res) => {
    let id = req.body.users;
    let response;
    console.log(id);
    Users.getUsersByIdArray(id)
        .then(data => {
            response = Response.OK(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err);
            res.status(response.status).json(err);
        });
});


module.exports = router;