import {Component, PropTypes} from 'labrador-immutable';
import immutable from 'seamless-immutable';
//import { connect } from 'labrador-redux';
import api from '../../utils/api'
import resource from '../../utils/resource'
const {any} = PropTypes;

class Home extends Component {
  static propTypes = {
    foo: any
  };

  static defaultProps = {
    foo: 'bar'
  };
  state = {
    vols: [],
    current: 0
  };

  constructor(props) {
    super(props);
    this.state = immutable({});
  }

  children() {
    return {};
  }

  onLoad() {
    // console.log(resource.generateId());
    resource.request(
      "ws://192.168.8.138/api/ws",
      {
        reqUrl: 'http://192.168.8.138/api/v1/user/auth/login',
        method: "POST",
        body: {
          "username": "little",
          "password": "123456"
        },
        header: Date.now() + Math.random().toString().substr(2, 3)
      }
    );

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