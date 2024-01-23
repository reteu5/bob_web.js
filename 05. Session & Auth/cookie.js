const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3080;

app.use(cookieParser());

app.get('/', (req, res) => {
    res.cookie('mycookie', 'test', { maxAge: 60000 });
    res.cookie('username', 'ret', { maxAge: 90000 });
    res.cookie('cart', ['사과우유', '딸기우유', '초코우유', '고수우유'], { maxAge: 120000 });
    res.send('Visiting Home');
});

app.get('/user', (req, res) => {
    const readCookie = req.cookies.mycookie;
    console.log('req.cookie: ', req.cookies);

    res.send(`Cookie you've brought: ${readCookie}`);
});

app.listen(port, () => {
    console.log(`Express Listening on port ${port}`);
});