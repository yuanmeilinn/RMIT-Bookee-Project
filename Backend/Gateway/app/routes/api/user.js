const express = require('express');
const router = express.Router();

// Services
const { Booking, Favorite, Review, Store, User } = require('../../services/User');
const Stores = require('../../services/Stores/stores');

const { validator } = require('../../middlewares/checkBody');
const checkAuth = require('../../middlewares/checkAuth');

const MulterFiles = require('../../utils/MulterFiles');
const uploader = new MulterFiles('users');
const upload = uploader.getUploader();


router.post('/register', validator([
    "name", "username", "email", "address", "city", "zipCode", "password"
]), (req, res) => {
    let body = JSON.stringify(req.body);

    User.register(body)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});

router.post('/login', validator([
    'email', 'password'
]), (req, res) => {
    let body = JSON.stringify(req.body);

    User.login(body)
        .then(response => {
            console.log(response);
            res.setHeader('Authorization', response.headers.get('authorization'));
            res.status(response.status).jsonp(response.data)
        }).catch(err => res.status(err.status || 500).jsonp(err.data || null));
});

router.put('/account', checkAuth, validator([
    'name', 'username', 'email', 'address', 'city', 'zipCode'
]), (req, res) => {
    let body = JSON.stringify(req.body);
    let token = req.headers.authorization || req.headers.Authorization;

    User.updateAccount(token, body)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});

router.patch('/password', checkAuth, validator([
    'oldPassword', 'newPassword'
]), (req, res) => {

    let body = JSON.stringify(req.body);
    let token = req.headers.authorization || req.headers.Authorization;

    User.updatePassword(token, body)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});

router.get('/favorite', checkAuth, (req, res) => {
    let token = req.headers.authorization || req.headers.Authorization;

    Stores.getFavorites(token)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});

router.post('/favorite', checkAuth, validator([
    "favorite"
]), (req, res) => {
    let token = req.headers.authorization || req.headers.Authorization;
    let body = JSON.stringify(req.body);

    Favorite.addFavorite(token, body)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});

router.delete('/favorite/:id', checkAuth, (req, res) => {
    let token = req.headers.authorization || req.headers.Authorization;
    let id = req.params.id

    Favorite.removeFavorite(token, id)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});

router.post('/avatar', checkAuth, upload.single('file'), async (req, res) => {
    let token = req.headers.authorization || req.headers.Authorization;
    let response;

    try {
        response = await User.uploadPicture(token, req.file);

        console.log("Unlink File", req.file.path);

        res.status(response.status).jsonp(response);

    } catch (err) {

        res.status(err.status || 500).jsonp(err);
    }
});

router.get('/validation', checkAuth, (req, res) => {
    let token = req.headers.authorization || req.headers.Authorization;

    User.validateToken(token)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});

module.exports = router;