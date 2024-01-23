const express = require('express');
const session = require('express-session');

const app = express();
const port = 3080;

// 세션 절정
app.use(session({
    secret: 'my-secret', // 세션 데이터를 암호화하기 위한 키
    resave: false, // 세션을 변경된 사항이 없을 때의 저장 여부
    saveUninitialized: true, // 세션에 저장할 내역이 없더라도 빈 세션을 처음부터 생성할지 여부
}));

app.get('/', (req, res) => {
    req.session.username = 'ret';
    req.session.cart = ['사과우유', '딸기우유', '초코우유', '고수우유', '오이우유'];
    res.send('Arrived at root page');
});

app.get('/user', (req, res) => {
    // 하나씩 들고올 때에는 JSON.stringify() 써야한다는듯?
    const {username, cart} = req.session;
    console.log('req.session: ', req.session);

    res.send(`Hello, ${username}! You have brought: ${cart}`);
});

app.listen(port, () => {
    console.log(`Express Listening on port ${port}`);
});