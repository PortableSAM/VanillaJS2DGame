const canvas = document.getElementById('can');
let ctx = canvas.getContext("2d");

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