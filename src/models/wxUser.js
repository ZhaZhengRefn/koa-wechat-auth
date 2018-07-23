const axios = require('axios')

const URL = {
  accessToken: 'https://api.weixin.qq.com/sns/oauth2/access_token',
  userInfo: 'https://api.weixin.qq.com/sns/userinfo'
}

const getAccessToken = async function (code, appId, appSecret) {
  const {
    data: accessTokenData
  } = await axios.get(URL.accessToken, {
    params: {
      appid: appId,
      secret: appSecret,
      code,
      grant_type: 'authorization_code'
    }
  }).catch(err => {
    throw Error({status : 401 , error : err});
  })
  
  if (accessTokenData.errcode) {
    throw Error(accessTokenData.errmsg)
  }
  return accessTokenData
}

const getUserInfo = async function (accessToken, openId) {
  const {
    data: userInfoData
  } = await axios.get(URL.userInfo, {
    params: {
      access_token: accessToken,
      openid: openId,
      lang: 'zh_CN',
    }
  }).catch(err => {
    throw Error({status : 401 , error : err});
  })

  if (userInfoData.errcode) {
    throw Error(userInfoData.errmsg)
  }
  return userInfoData
}

module.exports = {
  async getUserByCode(code, appId, appSecret) {
    // 1.获取access_token
    const {
      access_token: accessToken,
      openid: openId,
    } = await getAccessToken(code, appId, appSecret)
    // 2.获取wxUser
    const userInfo = await getUserInfo(accessToken, openId)
    return userInfo
  }
}