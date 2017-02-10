/**
 * Created by littlestone on 2017/2/10.
 */
"use strict";
var es6_promise_1 = require('es6-promise');
var WxResource = (function () {
    function WxResource(wsUrl, reqObj) {
        this.wsUrl = wsUrl;
        this.reqObj = reqObj;
        this.retryTime = 1000; //断线重连时间间隔
        this.connect();
    }
    /**
     * 连接webSocket
     * @returns {WxResource}
     */
    WxResource.prototype.connect = function () {
        var _that = this;
        setTimeout(function () {
            wx.connectSocket({
                url: _that.wsUrl
            });
        }, 200000);
        return this;
    };
    /**
     * get 方法
     * @param reqObj  传入的请求对象
     * @param token   传入的token【非必传参数】
     * @returns {Promise}
     */
    WxResource.prototype.get = function (reqObj, token) {
        var _this = this;
        var _that = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            wx.onSocketOpen(function (res) {
                console.log('WebSocket connection has been opened!', res);
                _that.sendMsg(reqObj, "GET", token);
            });
            _this.receiveMsg(resolve);
            _this.handleError(reject);
            _this.handleSocketClose();
        });
    };
    /**
     * post 方法
     * @param reqObj  传入的请求对象
     * @param token   传入的token【非必传参数】
     * @returns {Promise}
     */
    WxResource.prototype.post = function (reqObj, token) {
        var _this = this;
        var _that = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            wx.onSocketOpen(function (res) {
                console.log('WebSocket connection has been opened!', res);
                _that.sendMsg(reqObj, "POST");
            });
            _this.receiveMsg(resolve);
            _this.handleError(reject);
        });
    };
    /**
     * delete 方法
     * @param reqObj   传入的请求对象
     * @param token    传入的token【非必传参数】
     * @returns {Promise}
     */
    WxResource.prototype.delete = function (reqObj, token) {
        var _this = this;
        var _that = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            wx.onSocketOpen(function (res) {
                console.log('WebSocket connection has been opened!', res);
                _that.sendMsg(reqObj, "DELETE");
            });
            _this.receiveMsg(resolve);
            _this.handleError(reject);
        });
    };
    /**
     * update 方法
     * @param reqObj   传入的请求对象
     * @param token    传入的token【非必传参数】
     * @returns {Promise}
     */
    WxResource.prototype.update = function (reqObj, token) {
        var _this = this;
        var _that = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            wx.onSocketOpen(function (res) {
                console.log('WebSocket connection has been opened!', res);
                _that.sendMsg(reqObj, "UPDATE");
            });
            _this.receiveMsg(resolve);
            _this.handleError(reject);
        });
    };
    /**
     * 处理webSocket发送的信息
     * @param reqObj
     * @param method  请求方法 GET  POST ...
     * @param token
     */
    WxResource.prototype.sendMsg = function (reqObj, method, token) {
        // 判断是否传入token
        var header = {};
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
                console.log("发送成功", res);
            },
            fail: function (res) {
                console.log("发送失败", res);
            }
        });
    };
    // 处理错误信息
    WxResource.prototype.handleError = function (reject) {
        wx.onSocketError(function (res) {
            reject(res);
            console.log(res, 'WebSocket连接打开失败，请检查！');
        });
    };
    // 处理服务器返回内容
    WxResource.prototype.receiveMsg = function (resolve) {
        wx.onSocketMessage(function (res) {
            resolve(JSON.parse(res.data));
        });
    };
    WxResource.prototype.handleSocketClose = function () {
        wx.onSocketClose(function (res) {
            console.log("socketClose, try to connecting ...", res);
            setTimeout(function () {
                this.connect();
            }, this.retryTime);
        });
    };
    return WxResource;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WxResource;
