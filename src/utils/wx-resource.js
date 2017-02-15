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
        this.connect();
        this.listen();
        this.afterConnect();
    }
    WxResource.prototype.listen = function () {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            wx.onSocketOpen(function (event) {
                _this.socketOpen = true;
                _this.count++;
                console.log("open的次数：", _this.count);
                console.info('WebSocket opened：', event);
                resolve(event);
            });
            wx.onSocketError(function (event) {
                console.error('Can not open WebSocket, please check...！', event);
                resolve(event);
            });
        });
    };
    WxResource.prototype.connect = function () {
        wx.connectSocket({
            url: "ws://192.168.8.138/api/ws"
        });
        return this;
    };
    WxResource.prototype.afterConnect = function (resolve, reject) {
        wx.onSocketMessage(function (res) {
            console.log("Get data from webSocket server：", JSON.parse(res.data));
            resolve(JSON.parse(res.data));
        });
        return this;
    };
    //发送消息
    WxResource.prototype.sendMsg = function (reqObj, method) {
        var WxResource = this;
        if (WxResource.socketOpen) {
            console.log("websocket server opened, you can send some data now.", reqObj);
            var header = {};
            var token = reqObj.token;
            if (token === undefined) {
                console.log("no token");
                header = {
                    "S-Request-Id": Date.now() + Math.random().toString(20).substr(2, 6)
                };
            }
            else if (token !== undefined) {
                console.log("get token");
                header = {
                    "S-Request-Id": Date.now() + Math.random().toString(20).substr(2, 6),
                    "Authentication": "Bearer " + token
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
                    console.log("Send data success: ", res);
                },
                fail: function (res) {
                    console.log("Send data fail: ", res);
                }
            });
        }
        else {
            console.log("websocket server not opened");
        }
    };
    WxResource.prototype.get = function (url, token) {
        var _this = this;
        var _that = this;
        var reqObj = this.handleParams(url, {}, token);
        setTimeout(function () {
            _this.sendMsg(reqObj, "GET");
        }, 300);
        return new es6_promise_1.Promise(function (resolve, reject) {
            _that.afterConnect(resolve, reject);
        });
    };
    WxResource.prototype.post = function (url, data) {
        var _this = this;
        var _that = this;
        var reqObj = this.handleParams(url, data);
        setTimeout(function () {
            _this.sendMsg(reqObj, "POST");
        }, 300);
        return new es6_promise_1.Promise(function (resolve, reject) {
            _that.afterConnect(resolve, reject);
        });
    };
    WxResource.prototype.update = function (url, data) {
        var _this = this;
        var _that = this;
        var reqObj = this.handleParams(url, data);
        setTimeout(function () {
            _this.sendMsg(reqObj, "UPDATE");
        }, 300);
        return new es6_promise_1.Promise(function (resolve, reject) {
            _that.afterConnect(resolve, reject);
        });
    };
    WxResource.prototype.delete = function (url, data) {
        var _this = this;
        var _that = this;
        var reqObj = this.handleParams(url, data);
        setTimeout(function () {
            _this.sendMsg(reqObj, "DELETE");
        }, 300);
        return new es6_promise_1.Promise(function (resolve, reject) {
            _that.afterConnect(resolve, reject);
        });
    };
    WxResource.prototype.handleParams = function (url, data, token) {
        var reqObj = {};
        reqObj['url'] = url;
        reqObj['data'] = data;
        reqObj['token'] = token;
        console.log("--->", url, data, token);
        return reqObj;
    };
    return WxResource;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WxResource;
