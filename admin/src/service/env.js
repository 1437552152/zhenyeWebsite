import axios from 'axios'
const { environment } = process.env;
const Host =
  environment === 'production' ? 'http://47.107.180.202:8082/' : 'http://localhost:8081/';
 axios.defaults.baseURL =Host;
export default Host;