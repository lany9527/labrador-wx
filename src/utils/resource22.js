// let request = (wsUrl, reqObj, token) => {
//   wx.connectSocket({
//     url: wsUrl,
//   });
//   wx.onSocketOpen(function (res) {
//     console.log('WebSocket连接已打开！', res);
//     wx.sendSocketMessage({
//       data: JSON.stringify({
//         "method": reqObj.method,
//         "url": reqObj.reqUrl,
//         "header": {
//           "S-Request-Id": Date.now() + Math.random().toString(20).substr(2, 6),
//           "Authentication": "Bearer " + token
//         },
//         "body": JSON.stringify(reqObj.body)
//       })
//     })
//   });
//   wx.onSocketError(function (res) {
//     console.log(res, 'WebSocket连接打开失败，请检查！')
//   });
//   wx.onSocketMessage(function (res) {
//     console.log('收到服务器内容：' + res.data)
//   });
//   wx.onSocketClose(function (res) {
//     console.log('WebSocket 已关闭！')
//   })
// };
var Ws = (function () {
  function Ws(wsUrl) {
    console.log(wsUrl);
    wx.connectSocket({
      url: wsUrl,
    });
  }

  Ws.prototype.get = (reqObj, token) => {
    console.log("get");
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！', res);
      sendMsg(reqObj, token);
    });
    handleError();
    handleMsg();
    closeWs();
  };
  Ws.prototype.post = (reqObj) => {
    console.log("post");
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！', res);
      sendMsg(reqObj);
    });
    handleError();
    handleMsg();
    closeWs();
  };
  // 用于处理发送信息
  function sendMsg(reqObj, token){
    // 判断是否传入token
    if (!token){
      console.log("token没有传入");
      var header = {
        "S-Request-Id": Date.now() + Math.random().toString(20).substr(2, 6)
      }
    }else {
      console.log("传入token");
      var header = {
        "S-Request-Id": Date.now() + Math.random().toString(20).substr(2, 6),
        "Authentication": "Bearer " + token
      }
    }
    wx.sendSocketMessage({
      data: JSON.stringify({
        "method": reqObj.method,
        "url": reqObj.reqUrl,
        "header": header,
        "body": JSON.stringify(reqObj.body)
      })
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
    wx.onSocketMessage(function (res) {
      console.log('收到服务器内容：' + res.data)
    });
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

