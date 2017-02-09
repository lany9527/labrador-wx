import {Component, PropTypes} from 'labrador-immutable';
import immutable from 'seamless-immutable';
//import { connect } from 'labrador-redux';
import api from '../../utils/api'
import Ws from '../../utils/resource'
const {any} = PropTypes;

class Home extends Component {
  static propTypes = {
    foo: any
  };

  static defaultProps = {
    foo: 'bar'
  };

  constructor(props) {
    super(props);
    this.state = immutable({});
  }

  children() {
    return {};
  }

  onLoad() {
    let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0ODY2MjI1OTcsImxldmVsIjoiIiwidWlkIjoiZTE3MmQ0NGUtZGY5Ni00NzBjLTlmM2QtMWJkN2RlNjU3MTA0In0.U3X_bEw1tpRKPDVUl3W2Ex9ohLVa4tUa8iDXIyVIJWgZXA1mfSHC6A_xkYtiywzIrPftvA2uwzE978ohbb6xIdezMmlcciiKRd-XZNQCBipyHTFsEo61ByA7zdhyB3g2jpImSKRpwQngKUdfnWYoRUKPxbw3cxWwkpacuoXNFhs"
    // POST
    /*resource.request(
      "ws://192.168.8.138/api/ws",
      {
        reqUrl: 'http://192.168.8.138/api/v1/user/auth/login',
        method: "POST",
        body: {
          "username": "826781877142",
          "password": "111111"
        }
      }
    );*/
  // GET
    /*resource.request(
      "ws://192.168.8.138/api/ws",
      {
        reqUrl: 'http://192.168.8.138/api/v1/user/auth/status',
        method: "GET",
        body: {
          "username": "826781877142",
          "password": "111111"
        }
      },
      token
    );*/
    let ws = new Ws("ws://192.168.8.138/api/ws")
    ws.get({
        reqUrl: 'http://192.168.8.138/api/v1/user/auth/status',
        method: "GET",
        body: {
          "username": "826781877142",
          "password": "111111"
        }
      },
      token)

  }

}

export default Home;

// export default connect(
//   (state)=>({})
// )(Home);

/*resource.request(
 "ws://192.168.8.138/api/ws",
 {
 url: 'http://192.168.8.138/api/v1/user/auth/login',
 method: 'POST',
 header: {
 "Content-Type": 'application/json'
 },
 body: {
 "username": "little",
 "password": "123456"
 },
 })*/