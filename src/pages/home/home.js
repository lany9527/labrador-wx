import {Component, PropTypes} from 'labrador-immutable';
import immutable from 'seamless-immutable';
//import { connect } from 'labrador-redux';
// import api from '../../utils/api'
import Ws from '../../utils/resource'
const {any} = PropTypes;

class Home extends Component {
  static propTypes = {
    foo: any
  };

  static defaultProps = {
    foo: 'bar'
  };
  state = {
    title: '',
  };
  constructor(props) {
    super(props);
    this.state = immutable({});
  }

  children() {
    return {};
  }

  onLoad() {
    let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0ODY3MTAwMjIsImxldmVsIjoiIiwidWlkIjoiZTE3MmQ0NGUtZGY5Ni00NzBjLTlmM2QtMWJkN2RlNjU3MTA0In0.Dq5vp_eeVay25YaNNzLjRQsjqghRvfScvpntTT6wTQj1klZI3se3qErpXNn6isDg5PyWp6AENlZ3o-l-IeicTwd4BndMOCrUhHTz769F_--3cqDGxfMir4e9f1lfWWvI4RpD4GxLc38fFYaSwVx2xe5UzHkJbxMnsN21sdh6bvU";
    let title = {};

    const ws = new Ws("ws://192.168.8.138/api/ws");
    // ws.get(
    //   {
    //     url: 'http://192.168.8.138/api/v1/user/auth/status'
    //   },
    //   token
    // );

    ws.post({
      url: 'http://192.168.8.138/api/v1/user/auth/login',
      data: {
        "username": "826781877142",
        "password": "111111"
      }
    }).then(function (res) {
      console.log(res);
      title = res;
    });
    this.setState({ title: title.id });
  }

}

export default Home;

// export default connect(
//   (state)=>({})
// )(Home);
