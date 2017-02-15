import {Component, PropTypes} from 'labrador-immutable';
import immutable from 'seamless-immutable';
//import { connect } from 'labrador-redux';
// import api from '../../utils/api'
import Ws from '../../utils/resource'
import WxResource from '../../utils/wx-resource'
// import WxResource from 'wx-resource'
const {any} = PropTypes;

class Home extends Component {
  static propTypes = {
    foo: any
  };

  static defaultProps = {
    foo: 'bar'
  };
  state = {
    placeholderText: "连接服务器中...",
    messageArray: [],
    socketOpen: false,
    wxResource: ''
  };

  constructor(props) {
    super(props);
    this.state = immutable({});
  }

  children() {
    return {};
  }

  onLoad(options) {
    /*var _that = this;
     console.log("将要连接服务器。");
     wx.connectSocket({
     url: 'ws://192.168.8.138/api/ws'
     });

     wx.onSocketOpen(function (res) {
     console.log("连接服务器成功。");
     _that.setState({
     socketOpen:true
     });
     });

     wx.onSocketMessage(function (res) {
     console.log('收到服务器内容：' + res.data);
     var data = res.data;

     });*/
    const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0ODcyMjYwNjksImxldmVsIjoiIiwidWlkIjoiZTE3MmQ0NGUtZGY5Ni00NzBjLTlmM2QtMWJkN2RlNjU3MTA0In0.0x8NNPn24F1HqQA7osJkWeY4I1IJoj7e_0zcC2MAQJLSaNKnMyBJh514UCDlgUVY-31nbP02mN3RaCJy-aBas6fEVlrdJtpkz2ZvezUaW5BNGDvKs_FXy3qxyhGCMD0V-46OCqndQzmc_bvmjwAxO4lywWno3f-MladpYFw1z8M";
    const uid = "e172d44e-df96-470c-9f3d-1bd7de657104";

    const wxResource = new WxResource("ws://192.168.8.138/api/ws");
    console.log(wxResource);
    /*wxResource.post(
      'http://192.168.8.138/api/v1/user/auth/login',
      {
        "username": '826781877142',
        "password": '111111'
      });*/
    wxResource.get(
      'http://192.168.8.138/api/v1/online/status/'+uid
    )

  }



}

export default Home;

// export default connect(
//   (state)=>({})
// )(Home);
