const canvas = document.getElementById('can');
let ctx = canvas.getContext("2d");
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let ballRadius = 10;
const paddleHeight = 10,
    paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
/*
ctx.beginPath();
ctx.rect(20, 40, 50, 50); //rect를 이용하여 직사각형 정의
ctx.arc(240, 160, 20, 0, Math.PI * 2, false); //arc를 이용 원을 정의
// 6개의 파라미터 원의 중심좌표, 반지름, 시작 및 끝 각도, 그리는 방향
// false : 시계방향, true : 반시계 방향
ctx.fillStyle = '#63cdda';
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(240, 160, 20, 0, Math.PI * 2, false); //arc를 이용 원을 정의
// 6개의 파라미터 원의 중심좌표, 반지름, 시작 및 끝 각도, 그리는 방향
// false : 시계방향, true : 반시계 방향
ctx.fillStyle = '#786fa6';
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(160, 10, 100, 40); //rect를 이용하여 직사각형 정의
ctx.strokeStyle = 'rgba(207, 106, 135,1.0)';
ctx.stroke(); //외곽선 색상부여
ctx.closePath();
*/

function drawball() {
    // drawing code
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#303952';
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#f78fb3";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawball();
    x += dx;
    y += dy;
    if (x + dy > canvas.width || x + dy < 0) {
        dx = -dx;
    }
    if (y + dy > canvas.height || y + dy < 0) {
        dy = -dy;
    }
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
setInterval(draw, 10);