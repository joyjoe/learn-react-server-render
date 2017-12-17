// 代理登录接口
const router = require("express").Router();
const axios = require("axios");
const baseUrl = "https://cnodejs.org/api/v1";

// 登录接口
function proxy(req, res, next){
  const path = req.path;
  const user = req.session.user || {};
  const isNeedAccessToken = req.query.isNeedAccessToken;
  if(isNeedAccessToken && !user.accessToken){
    res.status(401).send({
      success: false,
      msg: "you need login"
    });
  };
  // 开始代理
  const query = Object.assign({}, req.query, {
    accesstoken: (isNeedAccessToken && req.method.toUppercase() == "GET")? user.accessToken : ""
  });
  if(query.isNeedAccessToken) delete query.isNeedAccessToken;
  axios(baseUrl + path, {
    method: req.method,
    params: query,
    data: Object.assign({}, req.body, {
      // 取决于当前的请求方式GET/POST
      accesstoken: (isNeedAccessToken && req.method.toUppercase() == "POST")? user.accessToken : ""
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }).then((resp)=>{
    if(resp.status === 200){
      // 代理请求成功之后将响应数据正常返回
      res.send(resp.data);
    }else{
      res.status(resp.status).send(resp.data);
    }
  }).catch((err)=>{
    if(err.response){
      res.status(500).send({
        success: false,
        msg: err.response.data
      });
    }else{
      res.status(500).send({
        success: false,
        msg: "错误未知"
      });
    }
  });
}

module.exports = proxy;
