const express = require('express');
const service = require('../services/auth.service');

const { supabase } = require('../util/supabase');

const router = express.Router();

router.post('/auth/signup', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const data = await service.signUp(email, password);
        res.status(201).json({ data });
    } catch (err) {
        next(err);
    }
});

router.post('/auth/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const { accessToken, refreshToken } = await service.login(email, password);

        res.status(201).json({ accessToken, refreshToken });
    } catch (err) {
        next(err);
    }
});

router.get('/public/info', (req, res) => {
    res.status(200).json({ message: 'Welcome stranger! this info is public' });
});

router.get('/protected/profile', (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = service.getToken(authHeader);

        res.status(200).json({ 
            message: `This is private info only available to those authenticated with token: ${token}` 
        });
    } catch (err) {
        next(err);
    }
});


module.exports = router;