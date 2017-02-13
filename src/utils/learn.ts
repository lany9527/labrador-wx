declare const wx: any;
import {Promise} from 'es6-promise';
interface MessageQueueItem {
  config: any,
  content: any,
  timestamp: number
}

interface Config {
  url: string;
  data?: any;
  header?: any;
  method?: string;
  retryTimes?: number,        // 重连次数，默认无限重连
  retryInterval?: number,     // 重连间隔，默认3s，可以设置最低100ms
  success?: () => any;
  fail?: () => any;
  complete?: () => any;
}

interface SendMessageConfig {
  noResponse?: boolean,          // 无需等待服务器响应，只要数据发送成功，则resolve
  timeout?: number               // 超时，数据发出之后，xx毫秒没有相应则算超时，reject
}

export default class WxSocket {
  private ALL: string = 'ALL';
  private retryCount: number = 0;
  private listener: any = {};
  private promiseMaps: any = {};
  public socketOpen: boolean = false;
  public messageQueue: any[] = [];

  constructor(private config: Config){

  }
//  send
  public send(msg: any):Promise<any>{

  }
}