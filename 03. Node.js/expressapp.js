const express = require('express');
const app = express();
const port = 3000;

// 미들웨어
function myLogger (req, res, next) {
    req.requestTime = Date.now();
    console.log('LOGGED', req.method, req.url);
    next();
}

app.use(myLogger);


// 정적 컨텐츠를 제공하는 디렉토리 설정
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('여기는 루트입니다.')
    console.log(`requestTime: ${req.requestTime}`);
});

app.post('/', (req, res) => {
    res.send('여기는 POST에 대한 루트입니다.')
});

app.delete('/', (req, res) => {
    res.send('여기는 DELETE에 대한 루트입니다.')
});

app.put('/', (req, res) => {
    res.send('여기는 PUT에 대한 루트입니다.')
});



app.get('/about', (req, res) => {
    res.send('여기는 어바웃 페이지입니다.')
});

app.get('/products', (req, res) => {
    res.send(`
    <p> 상품 페이지입니다. </p> 
    <ol>
        <li>초코우유</li>
        <li>바나나우유</li>
    </ol>
`)});

app.listen(port, () => {
    console.log(`서버가 ${port} 에서 대기 중입니다.`);
});