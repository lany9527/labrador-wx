/**
 * Created by littlestone on 2017/2/10.
 */
"use strict";
var es6_promise_1 = require('es6-promise');
var WxResource = (function () {
    function WxResource() {
        this.socketOpen = false;
        this.count = 0;
        this.socketState = false;
        this.reqObj = {
            url: 'http://192.168.8.138/api/v1/user/auth/status',
            token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0ODcxMjg0MjcsImxldmVsIjoiIiwidWlkIjoiZTE3MmQ0NGUtZGY5Ni00NzBjLTlmM2QtMWJkN2RlNjU3MTA0In0.BG2w-Lo02i2xaga4iZkM7RmP8hXgpRKAC-0MTp5hFj_ugnwATt2m9nDjtmJfRpWnAlpfmXZLgEQTlMHwG2H9hhoqojJC6piCh76UkH0mNwjJrBGiTINurholwTF2VYQPysB4bz7G4jepzEccNdD_NW-_Rxw-Bo5WDcH37OZ2zTw"
        };
        this.listen().connect().afterConnect();
    }
    WxResource.prototype.listen = function () {
        var _this = this;
        var _that = this;
        wx.onSocketOpen(function (event) {
            console.info('WebSocket已打开：', event);
            _this.count++;
            _this.socketState = event.target.readyState;
            _this.socketOpen = true;
            // this.sendMsg(_that.reqObj,"GET");
            console.log("open的次数：", _this.count);
            // return this.socketOpen;
        });
        wx.onSocketError(function (event) {
            console.error('WebSocket连接打开失败，请检查！', event);
        });
        // console.log("外部：", this.socketOpen);
        return this;
    };
    WxResource.prototype.connect = function () {
        wx.connectSocket({
            url: "wss://localhost:8080/"
        });
        return this;
    };
    WxResource.prototype.afterConnect = function (resolve, reject) {
        wx.onSocketMessage(function (res) {
            console.log("服务器返回：", res);
            // resolve(JSON.parse(res));
        });
        return this;
    };
    //发送消息
    WxResource.prototype.sendMsg = function (reqObj, method) {
        console.log("socketState: ", this.socketState); //undefined
        if (!this.socketOpen) {
            console.log("webSocket opened");
            // 判断是否传入token
            var header = {};
            if (reqObj.token === undefined) {
                console.log("no token");
                header = {
                    "S-Request-Id": Date.now() + Math.random().toString(20).substr(2, 6)
                };
            }
            else if (reqObj.token !== undefined) {
                console.log("get token");
                header = {
                    "S-Request-Id": Date.now() + Math.random().toString(20).substr(2, 6),
                    "Authentication": "Bearer " + reqObj.token
                };
            }
            wx.sendSocketMessage({
                data: JSON.stringify({
                    "method": method,
                    "url": reqObj.url,
                    "header": header,
                    "body": JSON.stringify(reqObj.data)
                }),
                success: function (res) {
                    console.log("发送成功", res);
                },
                fail: function (res) {
                    console.log("发送失败", res);
                }
            });
        }
        else {
            console.log("socket not open", this.socketOpen);
        }
    };
    WxResource.prototype.get = function () {
        var _that = this;
        console.log("socketOpen", this.socketOpen);
        this.sendMsg(this.reqObj, "GET");
        return new es6_promise_1.Promise(function (resolve, reject) {
            _that.afterConnect(resolve, reject);
        });
    };
    return WxResource;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WxResource;
