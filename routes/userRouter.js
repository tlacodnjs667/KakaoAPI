const router=require('express').Router();

const userController = require('../controllers/userController');

router.get('/access', userController.getKakaoAccessToken); //엑세스 토큰을 받기 위한
router.get('/login', userController.getNaverToken); //엑세스 토큰을 받기 위한
router.get('/google-login', userController.getGoogleToken); //엑세스 토큰을 받기 위한
router.post('', userController.getGoogleToken); //엑세스 토큰을 받기 위한

module.exports = router;