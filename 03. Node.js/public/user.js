document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('form');
    const username = document.getElementById('username');
    const userTable = document.getElementById('userTable');

    await updateTable();

    form.addEventListener('submit', handleSubmitForm);
});

async function updateTable() {
    const users = await getUsers();
    displayUsers(users);
}

async function getUsers() {
    try {
        const response = await fetch('/user');
        return response.json();
    } catch (error) {
        console.error('사용자 정보 불러오기 실패!', error);
    }
}

async function displayUsers(users) {
    userTable.innerHTML = ''; // 테이블 초기화
    for (const key in users) {
        const row = createTableRow(`ID: ${key}, Name: ${users[key]}`);
        userTable.appendChild(row);
    }
}

async function createTableRow(...columns) {
    const row = document.createElement('div');
    row.innerHTML = contents.jooin(', ');
    return row;

async function handleSubmitForm(ev) {
    ev.preventDefault();

    const name = username.value;
    if (!name) {
        return alert('이름을 입력하세요');
    }

    try {
        await addUser(name);
        alert('등록 성공!');
    } catch {
        console.error('등록 중 에러 발생!', error);
        alert('등록 중 에러 발생!');
    }
}

async function addUser(name) {
    const response = await fetch('/user', {
        method = 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body = JSON.stringify({ name }),
}