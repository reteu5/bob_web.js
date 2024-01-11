const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const bodyParser = require('body-parser');

// 정적 컨텐츠를 제공하는 디렉토리 설정
app.use(express.static('public'));
app.use(bodyParser.json());

// 라우트 추가
app.get('/', (req, res) => {
    res.sendFile('board.html');
});


const users = {};

app.post('/user', (req, res) => {
    const { name } = req.body;
    const id = Date.now();
    users[id] = name;
    res.status(201).send('등록 성공!');
});

app.get('/user', (req, res) => {
    res.json(users);
});

app.listen(port, () => {
    console.log(`서버가 ${port} 에서 대기 중입니다.`);
});