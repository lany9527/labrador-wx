/**
 * Created by littlestone on 2017/2/10.
 */

import {Promise} from 'es6-promise';
declare const wx: any;

class WxResource {
  public socketOpen: boolean = false;
  public count: number = 0;
  public socketState;

  public reqObj: any = {
    url: 'http://192.168.8.138/api/v1/user/auth/status',
    token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0ODcxMjg0MjcsImxldmVsIjoiIiwidWlkIjoiZTE3MmQ0NGUtZGY5Ni00NzBjLTlmM2QtMWJkN2RlNjU3MTA0In0.BG2w-Lo02i2xaga4iZkM7RmP8hXgpRKAC-0MTp5hFj_ugnwATt2m9nDjtmJfRpWnAlpfmXZLgEQTlMHwG2H9hhoqojJC6piCh76UkH0mNwjJrBGiTINurholwTF2VYQPysB4bz7G4jepzEccNdD_NW-_Rxw-Bo5WDcH37OZ2zTw"
  };

  constructor() {
    this.listen().connect().afterConnect();
  }

  private listen(): WxResource {
    let _that = this;

    wx.onSocketOpen((event) => {
      console.info('WebSocket已打开：', event);
      this.count++;
      this.socketState = event.target.readyState;
      this.socketOpen = true;
      // this.sendMsg(_that.reqObj,"GET");
      console.log("open的次数：", this.count);
      return this.socketOpen;
    });
    wx.onSocketError((event) => {
      console.error('WebSocket连接打开失败，请检查！', event);
    });
    // console.log("外部：", this.socketOpen);
    return this;
  }

  private connect(): WxResource {
    wx.connectSocket({
      url: "ws://192.168.8.138/api/ws"
    });
    return this;
  }

  private afterConnect(resolve?, reject?): WxResource {
    wx.onSocketMessage((res) => {
      console.log("服务器返回：", JSON.parse(res.data));
      resolve(JSON.parse(res.data));
    });
    return this;
  }

  //发送消息
  private sendMsg(reqObj, method?) {
    console.log("socketState: ", this.socketState); //undefined
    if (!this.socketOpen) {
      console.log("webSocket opened");
      // 判断是否传入token
      let header = {};
      if (reqObj.token === undefined) {
        console.log("no token");
        header = {
          "S-Request-Id": Date.now() + Math.random().toString(20).substr(2, 6)
        }
      } else if (reqObj.token !== undefined) {
        console.log("get token");
        header = {
          "S-Request-Id": Date.now() + Math.random().toString(20).substr(2, 6),
          "Authentication": "Bearer " + reqObj.token
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
          console.log("发送成功", res)
        },
        fail: function (res) {
          console.log("发送失败", res)
        }
      });
    } else {
      console.log("socket not open", this.socketOpen);
    }
  }

  public get() {
    let _that = this;

    console.log("socketOpen", this.socketOpen);
    this.sendMsg(this.reqObj, "GET");


    return new Promise((resolve, reject) => {
      _that.afterConnect(resolve, reject);
    })
  }

}

export default WxResource;