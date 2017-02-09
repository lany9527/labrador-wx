// import utils from './utils'
const Promise = require('es6-promise').Promise;
var Ws = (function () {
  function Ws(wsUrl) {
    wx.connectSocket({
      url: wsUrl,
    });
  }

  Ws.prototype.get = (reqObj, token) => {
    return new Promise((resolve, reject) => {
      wx.onSocketOpen(function (res) {
        console.log('WebSocket连接已打开！', res);
        sendMsg(reqObj, token, "GET");
      });
      wx.onSocketMessage(function (res) {
        resolve(JSON.parse(res.data));
        // console.log(JSON.parse(res.data));
      });
    });

    handleError();
    closeWs();
  };
  Ws.prototype.post = (reqObj, token) => {
    // wx.onSocketOpen(function (res) {
    //   sendMsg(reqObj, token, "POST");
    // });
    // handleError();
    // handleMsg();
    // closeWs();
    return new Promise((resolve, reject) => {
      wx.onSocketOpen(function (res) {
        // resolve(res);
        console.log(res);
        sendMsg(reqObj, token, "POST");
      });
      wx.onSocketMessage(function (res) {
        resolve(JSON.parse(res.data));
        // console.log(JSON.parse(res.data));
      });
    })
  };

  /**
   * // 用于处理发送信息
   * @param reqObj  请求数据
   * @param token   get方法需要用到的token
   * @param method  请求方法
   */
  function sendMsg(reqObj, token, method) {
    // 判断是否传入token
    if (token === undefined) {
      console.log("token没有传入");
      var header = {
        "S-Request-Id": Date.now() + Math.random().toString(20).substr(2, 6)
      }
    } else if (token !== undefined) {
      console.log("传入token");
      var header = {
        "S-Request-Id": Date.now() + Math.random().toString(20).substr(2, 6),
        "Authentication": "Bearer " + token
      }
    }
    wx.sendSocketMessage({
      data: JSON.stringify({
        "method": method,
        "url": reqObj.url,
        "header": header,
        "body": JSON.stringify(reqObj.data)
      }),
      success: function (res) {
        console.log("发送成功",res)
      },
      fail: function (res) {
        console.log("发送失败",res)
      }
    })
  }

  // 显示错误信息
  function handleError() {
    wx.onSocketError(function (res) {
      console.log(res, 'WebSocket连接打开失败，请检查！')
    });
  }

  // 显示服务器返回内容
  function handleMsg() {
    // return new Promise((resolve, reject) => {
    //
    // }
    wx.onSocketMessage(function (res) {
      // console.log('收到服务器内容：' + res.data);
      return res;
    });
    // console.log("kkk ",wx.onSocketMessage);

  }

  // 关闭websocket
  function closeWs() {
    wx.onSocketClose(function (res) {
      console.log('WebSocket 已关闭！')
    })
  }
  return Ws
}());
export default Ws;

