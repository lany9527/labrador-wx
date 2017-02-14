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
    title: {},
  };

  constructor(props) {
    super(props);
    this.state = immutable({});
  }

  children() {
    return {};
  }

  onLoad() {
    let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0ODcxMjg0MjcsImxldmVsIjoiIiwidWlkIjoiZTE3MmQ0NGUtZGY5Ni00NzBjLTlmM2QtMWJkN2RlNjU3MTA0In0.BG2w-Lo02i2xaga4iZkM7RmP8hXgpRKAC-0MTp5hFj_ugnwATt2m9nDjtmJfRpWnAlpfmXZLgEQTlMHwG2H9hhoqojJC6piCh76UkH0mNwjJrBGiTINurholwTF2VYQPysB4bz7G4jepzEccNdD_NW-_Rxw-Bo5WDcH37OZ2zTw";
    let _that = this;
    const wxResource = new WxResource();

    // const wxResource = new WxResource("ws://192.168.8.138/api/ws");
    // wxResource.connect();
    wxResource.get();
    // wxResource.post();

    // wxResource.post(
    //   'http://192.168.8.138/api/v1/user/auth/login',
    //   {
    //     "username": "826781877142",
    //     "password": "111111"
    //   }).then(function (res) {
    //   // console.log(res);
    //   let t = res;
    //   console.log("Promise:", t);
    //   _that.setState({title: t});
    // });
  }

}

export default Home;

// export default connect(
//   (state)=>({})
// )(Home);
