import {Component, PropTypes} from 'labrador-immutable';
import {bindActionCreators} from 'redux';
import {connect} from 'labrador-redux';
import Todo from '../../components/todo/todo';
import * as todoActions from '../../redux/todos';

const {array, func} = PropTypes;

class Finished extends Component {
  static propTypes = {
    todos: array,
    removeTodo: func,
    restoreTodo: func
  };

  onLoad(options) {
    let _that = this;
    console.log("将要连接服务器。");
    wx.connectSocket({
      url: 'ws://192.168.8.138/api/ws'
    });
    wx.onSocketOpen(function (res) {
      console.log("连接服务器成功。");
      _that.setState({
        socketOpen: true
      });
    });
    wx.onSocketMessage(function (res) {
      console.log('收到服务器内容：' + res.data);
    });
  }

  onUnload() {
    wx.closeSocket();
  }

  sendSocketMessage() {
    if (this.state.socketOpen) {
      console.log("可以发送数据");
      wx.sendSocketMessage({
        data: JSON.stringify({
          "method": "POST",
          "url": 'http://192.168.8.138/api/v1/user/auth/login',
          "header": {
            "S-Request-Id": Date.now() + Math.random().toString(20).substr(2, 6),
          },
          "body": JSON.stringify({
            "username": '826781877142',
            "password": '111111'
          })
        })
      })
    }
  }

}

export default connect(
  ({todos}) => ({todos}),
  (dispatch) => bindActionCreators({
    removeTodo: todoActions.remove,
    restoreTodo: todoActions.restore,
  }, dispatch)
)(Finished);
