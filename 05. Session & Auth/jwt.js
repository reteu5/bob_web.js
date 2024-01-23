const express = require('express');
const cookie = require('cookie-parser');
// JWT : Json Web Token; 전자서명 원리 이용하여, 변조 여부를 확인하는 방식으로 무결성 및 신원 검증
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3080;
const secretKey = 'random-private-key-phrase';

app.use(cookieParser());

// 미들웨어를 통해 반드시 거치도록 하여 클라이언트에 JWT를 생성하고 전송
app.use((req, res, next) => {
    const clientId = 'ret'; // 클라이언트 고유식별자
    const token = jwt.sign({ clientId }, secretKey)

    res.cookie('jwt', token)
    next();
});

// JWT 토큰 생성
app.get('/', (req, res) => {
    // const token = jwt.sign(
    //     {
    //         id: 'ret',
    //         isAdmin: true
    //     },
    //     'my-secret-key',
    //     {
    //         expiresIn: '1m',
    //         issuer: 'ret'
    //     }
    // );

    // console.log('token: ', token);

    res.send('Landed at root page');
});

// JWT 토큰 검증
app.get('/user', (req, res) => {
    const token = req.cookies.jwt;
    console.log('token: ', token);

    // const decoded = jwt.verify(token, secretKey);
    const decoded = jwt.decode(token);
    console.log('decoded: ', decoded);

    res.send(`msg in JWT: ${JSON.stringify(decoded)}`);
});

app.listen(port, () => {
    console.log(`Express Listening on port ${port}`);
});