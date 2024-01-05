// 모든 함수 레퍼런스는 "mdn"에서 찾아보면 됨
// 캔버스 영역 가져오기
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

// 공 엘리먼트 정의
const ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;

// 공의 이동 속도 정의
let dx = 2;
let dy = -2;

// 패들 엘리먼트 정의
const paddleHeight = 10;
const paddleWidth = 100;
let paddleX = (canvas.width - paddleWidth) / 2;
const paddleSpeed = 15;

// 브릭 엘리먼트 정의
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}


// 키보드 입력 상태 설정
let leftPressed = false;
let rightPressed = false;

// 키보드 이벤트 처리
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyDownHandler);

function keyDownHandler(event) {
    if (event.key === 'ArrowRight') {
        rightPressed = true;
    }

    if (event.key === 'ArrowLeft') {
        leftPressed = true;
    }
}

function keyUpHandler(event) {
    if (event.key === 'ArrowRight') {
        rightPressed = false;
    }

    if (event.key === 'ArrowLeft') {
        leftPressed = false;
    }
}



function drawBall() {
    context.beginPath();
    context.arc(x, y, ballRadius, 0, Math.PI * 2);
    context.fillStyle = '#8a2be2';
    context.fill();
    context.closePath();
}

function drawPaddle() {
    context.beginPath();
    context.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    context.fillStyle = '#85ab20';
    context.fill();
    context.closePath();
}

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];

            if (b.status === 1) {
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;

                context.beginPath();
                context.rect(brickX, brickY, brickWidth, brickHeight);
                context.fillStyle = '#28e1ff';
                context.fill();
                context.closePath();
            }
        }
    }
}

function moveBall() {
    x += dx;
    y += dy;

    // 공이 벽에 부딪히면 반대 방향으로 튕기도록
    if (x < ballRadius || x > canvas.width - ballRadius) {
        dx = -dx;
    }

    // 공과 천장 충돌 감지
    if (y < ballRadius) {
        dy = -dy;
    } else if (y > canvas.height - ballRadius) {
        // 패들에 부딪힐 경우에만 반대 방향으로 튕기도록
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            gameover();
        }
    }
}

function gameover() {
    context.font = '30px Arial';
    context.fillStyle = '#FF0000';
    context.textAlign = 'center';
    context.fillText('Game Over', canvas.width / 2, canvas.height / 2);
}

function movePaddle() {
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += paddleSpeed;
        rightPressed = false;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= paddleSpeed;
        leftPressed = false;
    }
}

function collisonDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if (b.status === 1) {
                if (x > b.x && x < b.x + brickWidth &&
                    y > b.y && y < b.y + brickHeight) 
                {
                    // console.log('hit');
                    b.status = 0;
                    dy = -dy;
                }
            }
        }
    }
}



// 게임 그리기 위한 메인 함수
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // draw 호출 순서에 따라 위 아래 레이어가 달라짐
    drawBricks();
    drawBall();
    drawPaddle();

    moveBall();
    movePaddle();

    collisonDetection();

    requestAnimationFrame(draw);
}

// 게임 시작
draw();