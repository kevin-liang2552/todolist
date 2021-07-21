import express from 'express';
const router = express.Router();

router.get('/tasks', (_req, res) => {
    res.send('hello world!');
});

export = router;