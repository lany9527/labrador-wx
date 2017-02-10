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
    let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0ODY3OTY1MzIsImxldmVsIjoiIiwidWlkIjoiZTE3MmQ0NGUtZGY5Ni00NzBjLTlmM2QtMWJkN2RlNjU3MTA0In0.bQNfYVBZWaLSzMPo9z_aIRfrMuu_D_1LWFDql1cIYDXZ6Y7q_rbNUwaYoOiR4-Gkx9rJM_hAjl3s3LB8tvzeHH8vzDIfPdf0yo1_Iv7KhBI8P7Kgkya6FzefqKpwf1bsyj83Gf1M_J7AGGmuZ3ssFPQJzt77oKRI70MjQGINA6c";
    var data = {};

    const wxResource = new WxResource("ws://192.168.8.138/api/ws");
    // wxResource.get(
    //   {
    //     url: 'http://192.168.8.138/api/v1/user/auth/status'
    //   },
    //   token
    // ).then(function (res) {
    //   console.log(res);
    //   data = res;
    // });

    wxResource.post({
      url: 'http://192.168.8.138/api/v1/user/auth/login',
      data: {
        "username": "826781877142",
        "password": "111111"
      }
    }).then(function (res) {
      console.log(res);
      title = res;
    });
    console.log("promise获取到的数据：",data);
    this.setState({ title: "14866340916919g851j" });
  }

}

export default Home;

// export default connect(
//   (state)=>({})
// )(Home);
