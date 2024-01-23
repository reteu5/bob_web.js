const axios = require('axios');

// Naver APIs
const base_url = 'https://m.search.naver.com/p/csearch/content/qapirender.nhn?key=calculator&pkid=141&q=%ED%99%98%EC%9C%A8&where=m';
const usd_url = base_url + 'u1=keb&u6=standardUnit&u7=0&u3=USD&u4=KRW&u8=down&u2=1'
const jpy_url = base_url + 'u1=keb&u6=standardUnit&u7=0&u3=JPY&u4=KRW&u8=down&u2=100'

axios.get(jpy_url).then(response => {
    console.log(response.data);
});