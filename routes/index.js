const router = require('express').Router();
const userRouter = require('./userRouter');

router.use('/naver', userRouter);
router.use('/kakao', userRouter);
router.use('/google', userRouter);

module.exports = router;