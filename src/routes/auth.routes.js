const express = require('express');
const service = require('../services/auth.service');
const requireAuth = require('../middleware/auth');

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

router.get('/protected/profile', requireAuth, (req, res) => {
    const { id, email, created_at } = req.user;

    res.status(200).json({ id, email, created_at });
});

router.post('/auth/logout', requireAuth, async (req, res, next) => {
    try {
        await service.signOut();
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

router.get('/protected/dashboard', requireAuth, (req, res) => {
    res.status(200).json({ message: `Welcome ${req.user.email}` });
});

module.exports = router;