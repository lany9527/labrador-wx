// let generateId = () => {
//   // console.log(Date.now() + Math.random().toString().substr(2, 3));
//   return Date.now() + Math.random().toString().substr(2, 3);
// };

let request = (wsUrl, reqObj) => {
  // if ("WebSocket" in window){
  //   let ws = new WebSocket(wsUrl);
  //   ws.onopen = function(){
  //     console.log("connect open");
  //     ws.send(
  //       JSON.stringify({
  //         "method": reqObj.method,
  //         "url": reqObj.reqUrl,
  //         "header":{"S-Request-Id":Date.now() + Math.random().toString().substr(2, 3)},
  //         "body": JSON.stringify(reqObj.body)
  //       })
  //     );
  //   };
  // }else{
  //   console.log("浏览器不支持websocket")
  // }
  console.log(wsUrl);
  wx.connectSocket({
    url: wsUrl,
  });
  wx.onSocketOpen(function (res) {
    console.log('WebSocket连接已打开！', res);
    wx.sendSocketMessage({
      data: JSON.stringify({
        "method": "POST",
        "url": "http://192.168.8.138/api/v1/user/auth/login",
        "header": {"S-Request-Id": Math.random().toString(20).substr(2, 6)},
        "body": JSON.stringify({
          "username": "1234567989",
          "password": "123456"
        })
      })
    })
  });
  wx.onSocketError(function (res) {
    console.log(res, 'WebSocket连接打开失败，请检查！')
  });
  wx.onSocketMessage(function (res) {
    console.log('收到服务器内容：' + res.data)
  })
};

module.exports = {
  request
};