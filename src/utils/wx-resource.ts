/**
 * Created by littlestone on 2017/2/10.
 */

import {Promise} from 'es6-promise';
declare const wx: any;

class WxResource {
  private url: string = 'http://192.168.8.138/api/v1/user/auth/login';
  private reqObj: any = {
    "username": "826781877142",
    "password": "111111"
  };
  private method: string = "POST";

  constructor() {
    this.connect().listen().afterConnect();
  }

  private listen(): WxResource {
    let _that = this;
    wx.onSocketOpen(() => {
      console.info('WebSocket已连接');
      _that.sendMsg(_that.url, _that.method, _that.reqObj);
    });
    wx.onSocketError(() => {
      console.error('WebSocket连接打开失败，请检查！');
    });
    return this;
  }

  private connect(): WxResource {
    wx.connectSocket({
      url: "ws://192.168.8.138/api/ws"
    });
    return this;
  }

  private afterConnect(resolve?, reject?): WxResource {
    // wx.onSocketClose(function () {
    //
    // });
    wx.onSocketMessage((res) => {
      console.log("服务器返回：", JSON.parse(res.data));
      resolve(JSON.parse(res.data));
    });
    return this;
  }

  private sendMsg(url, method, obj) {
    console.log(method);
    wx.sendSocketMessage({
      data: JSON.stringify({
        "method": method,
        "url": url,
        "header": {"S-Request-Id": Date.now() + Math.random().toString(20).substr(2, 6),},
        "body": JSON.stringify(obj)
      }),
      success: function (res) {
        console.log("发送成功", res)
      },
      fail: function (res) {
        console.log("发送失败", res)
      }
    });
  }

  public post(url, method, obj): Promise<any> {
    let _that = this;
    return new Promise((resolve, reject) => {
      // _that.sendMsg(url, "POST", obj);
      this.afterConnect(resolve, reject);
    })
  }
}

export default WxResource;