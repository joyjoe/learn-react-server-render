// 代理登录接口
const router = require("express").Router();
const axios = require("axios");
const baseUrl = "https://cnodejs.org/api/v1";

// 登录接口
router.post("/login", (req, res, next)=>{
  console.log(`req.body.accessToken = ${req.body.accessToken}`);
  axios.post(`${baseUrl}/accesstoken`, {
    accesstoken: req.body.accessToken
  }).then((resp)=>{
    console.log(resp.status);
    if(resp.status == 200 && resp.data.success){
      // 成功 将结果保存在session中
      // loginname, id, avatar_url
      req.session.user = {
        accessToken: req.body.accessToken,
        loginName: resp.data.loginname,
        id: resp.data.id,
        avatarUrl: resp.data.avatar_url
      };
      res.json({
        success: true,
        data: resp.data
      });
    }
  }).catch((err)=>{
    console.log(err.response.data);
    if(err.response){
      res.json({
        success: false,
        data: err.response.data
      });
    }else{
      next(err);
    }
  });
});

module.exports = router;
