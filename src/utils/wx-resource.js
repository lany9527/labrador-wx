/**
 * Created by littlestone on 2017/2/10.
 */
"use strict";
var es6_promise_1 = require('es6-promise');
var WxResource = (function () {
    function WxResource() {
        this.url = 'http://192.168.8.138/api/v1/user/auth/login';
        this.reqObj = {
            "username": "826781877142",
            "password": "111111"
        };
        this.method = "POST";
        this.connect().listen().afterConnect();
    }
    WxResource.prototype.listen = function () {
        var _that = this;
        wx.onSocketOpen(function () {
            console.info('WebSocket已连接');
            _that.sendMsg(_that.url, _that.method, _that.reqObj);
        });
        wx.onSocketError(function () {
            console.error('WebSocket连接打开失败，请检查！');
        });
        return this;
    };
    WxResource.prototype.connect = function () {
        wx.connectSocket({
            url: "ws://192.168.8.138/api/ws"
        });
        return this;
    };
    WxResource.prototype.afterConnect = function (resolve, reject) {
        // wx.onSocketClose(function () {
        //
        // });
        wx.onSocketMessage(function (res) {
            console.log("服务器返回：", JSON.parse(res.data));
            resolve(JSON.parse(res.data));
        });
        return this;
    };
    WxResource.prototype.sendMsg = function (url, method, obj) {
        console.log(method);
        wx.sendSocketMessage({
            data: JSON.stringify({
                "method": method,
                "url": url,
                "header": { "S-Request-Id": Date.now() + Math.random().toString(20).substr(2, 6), },
                "body": JSON.stringify(obj)
            }),
            success: function (res) {
                console.log("发送成功", res);
            },
            fail: function (res) {
                console.log("发送失败", res);
            }
        });
    };
    WxResource.prototype.post = function (url, method, obj) {
        var _this = this;
        var _that = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            // _that.sendMsg(url, "POST", obj);
            _this.afterConnect(resolve, reject);
        });
    };
    return WxResource;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WxResource;
