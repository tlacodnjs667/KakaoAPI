
const userService = require('../services/userService');
const axios = require('axios');

const getKakaoAccessToken = async(req, res) => {
    try{
        const {code, state, error, error_description} = req.query;

        console.log("code : "+code);
        // console.log("state : "+state);
        // console.log("error : "+error);
        // console.log("error_description : "+error_description);

        //토큰 받아야 함 => 토큰은 service 단에서 처리하자
        const result = await userService.getKakaoAccessToken(code);
        // console.log(result);
        res.status(200).json({message : "Jonna Andae", authorization : result});
    }
    catch (err){
        console.log(err);
    }

}

const getNaverToken = async(req, res) => {
    const {code, state}=req.query;
    
    if(!code) {
        const {error_description}= req.query;
        const error = new Error(error_description);
        error.statusCode=400;
        throw error;
    }
    
    const inputedId = userService.getNaverToken(code, state);
    res.status(200).json({message : "Jonna Andae"});
}

const getGoogleToken = async (req, res) => {
    const { code } = req.query;

    
    const url = `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&grant_type=${process.env.GOOGLE_GRANT_TYPE}`

    console.log(query);
    await axios.post(
        ""
    )

}



// const handleGetAccessToken = async (authorizationCode) => {
//     await axios.post(
//        "http://localhost:80/sign/google", // 구글 소셜 로그인 엔드포인트
//        {
//          authorizationCode: authorizationCode,
//        },
//        {
//          headers: { accept: `application/json` },
//        },
//      );

module.exports = {
    getKakaoAccessToken,
    getNaverToken,
    getGoogleToken
}