const userDao = require('../models/userDao');
const axios = require('axios');

const getKakaoAccessToken = async(code) => {
    try{
        const REST_API_KEY = process.env.KAKAO_CLIENT_ID;
        const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;
        
        let queryString=`grant_type=authorization_code`
        queryString += `&client_id=${REST_API_KEY}`
        queryString +=`&code=${code}`
        queryString += `&redirect_uri=${KAKAO_REDIRECT_URI}`;
        
        const result = await axios.post(`https://kauth.kakao.com/oauth/token?${queryString}`, {
            headers : {
                "Content-Type":"application/x-www-form-urlencoded"
            }
        })

        const {access_token} = result.data;
        console.log('access_token : ' + access_token);
        //여기까지 성공...입...아마
        const {data} = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });

        const {id} =data;
        const {email, birthday}=data.kakao_account;
        const {nickname, thumbnail_image_url} = data.kakao_account.profile;
        console.log('id : '+id);
    } catch(error) {
        console.error(error)
    }
}
const getNaverToken = async(code, state)=> {
    const NAVER_CLIENT_ID=process.env.NAVER_CLIENT_ID;
    const NAVER_SECRET_KEY=process.env.NAVER_SECRET_KEY;

    const result = await axios.get(
      `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${NAVER_CLIENT_ID}&client_secret=${NAVER_SECRET_KEY}&code=${code}&state=${state}`
    );
    
    const {access_token} = result.data;
    console.log(access_token);

    const naverPersonalInfo = await axios.get(
      `https://openapi.naver.com/v1/nid/me`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    console.log(naverPersonalInfo.data.response);
    const {id} = naverPersonalInfo.data.response;
    const {nickname, profile_image, age, gender, email, mobile, name, birthday} = naverPersonalInfo.data.response;

}

const getGoogleToken = async () => {}

module.exports = {
    getKakaoAccessToken,
    getNaverToken
}