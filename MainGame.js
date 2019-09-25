const canvas = document.getElementById('can');
let ctx = canvas.getContext('2d');
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let ballRadius = 10;
const paddleHeight = 10, //paddle 정의
	paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
// boolean변수 정의
let rightPressed = false;
let leftPressed = false;
//Bricks 정의
let brickRowCount = 3,
	brickColumnCount = 5,
	brickWidth = 75,
	brickHeight = 20,
	brickPadding = 10,
	brickOffsetTop = 30,
	brickOffsetLeft = 30;
//PointScore
let score = 0;
//PlayerLife
let lives = 3;
// EventListener 설정
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
	//KeyDownEvent 함수
	if (e.keyCode == 39) {
		rightPressed = true;
	} else if (e.keyCode == 37) {
		leftPressed = true;
	}
}

function keyUpHandler(e) {
	//KeyUpEvent 함수
	if (e.keyCode == 39) {
		rightPressed = false;
	} else if (e.keyCode == 37) {
		leftPressed = false;
	}
}

//충돌감지 함수
function collisionDetection() {
	for (let c = 0; c < brickColumnCount; c++) {
		for (let r = 0; r < brickRowCount; r++) {
			let b = bricks[c][r];
			// calculations
			if (b.status == 1) {
				if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
					dy = -dy;
					b.status = 0;
					score++;
					if (score == brickRowCount * brickColumnCount) {
						alert('축하합니다. 당신이 이겼어요!!');
						document.location.reload();
					}
				}
			}
		}
	}
}
//score 함수
function drawScore() {
	ctx.font = '16px Arial';
	ctx.fillStyle = '#6c5ce7';
	ctx.fillText('Score: ' + score, 8, 20);
}
//PlayerLives
function drawLives() {
	ctx.font = '16px Arial';
	ctx.fillStyle = '#d63031';
	ctx.fillText('Lives: ' + lives, canvas.width - 65, 20);
}

//bricks Arr
let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
	bricks[c] = [];
	for (let r = 0; r < brickRowCount; r++) {
		bricks[c][r] = {
			x: 0,
			y: 0,
			status: 1,
		};
	}
}

function drawball() {
	// drawing code
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
	ctx.fillStyle = '#e74c3c';
	ctx.fill();
	ctx.closePath();
}

function drawPaddle() {
	// drawing paddle
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = '#c44569';
	ctx.fill();
	ctx.closePath();
}

function drawBricks() {
	//drawing Bricks
	for (let c = 0; c < brickColumnCount; c++) {
		for (let r = 0; r < brickRowCount; r++) {
			if (bricks[c][r].status == 1) {
				//bricksPosition
				let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
				let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = '#c0392b';
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawball();
	drawPaddle();
	drawBricks();
	collisionDetection();
	drawScore();
	drawLives();
	//BallMovementLogic
	if (x + dy > canvas.width - ballRadius || x + dy < ballRadius) {
		dx = -dx;
	}
	//위, 왼쪽, 오른쪽 면에만 튕기고 Paddle이 Ball을 튕기는 Logic
	if (y + dy < ballRadius) {
		dy = -dy;
	} else if (y + dy > canvas.height - ballRadius) {
		if (x > paddleX && x < paddleX + paddleWidth) {
			dy = -dy;
			//Ball이 Paddle에 없는 경우
		} else {
			lives--;
			if (!lives) {
				alert('게 임 종 료');
				document.location.reload();
			} else {
				x = canvas.width / 2;
				y = canvas.height - 30;
				dx = 3;
				dy = 3;
				paddleX = (canvas.width - paddleWidth) / 2;
			}
		}
	}
	//PaddleMovementLogic
	if (rightPressed && paddleX < canvas.width - paddleWidth) {
		paddleX += 7;
	}
	if (leftPressed && paddleX > 0) {
		paddleX -= 7;
	}
	x += dx;
	y += dy;
	requestAnimationFrame(draw);
}

draw();
