const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;

let player1Y = (canvas.height - paddleHeight) / 2;
let player2Y = (canvas.height - paddleHeight) / 2;
let player1Score = 0;
let player2Score = 0;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.fill();
}

function drawNet() {
    for (let i = 0; i < canvas.height; i += 20) {
        drawRect(canvas.width / 2 - 1, i, 2, 10, "#fff");
    }
}

function drawEverything() {
    drawRect(0, 0, canvas.width, canvas.height, "#000");
    drawNet();
    drawRect(0, player1Y, paddleWidth, paddleHeight, "#fff");
    drawRect(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight, "#fff");
    drawCircle(ballX, ballY, ballSize, "#fff");
    ctx.fillText(player1Score, 100, 100);
    ctx.fillText(player2Score, canvas.width - 100, 100);
}

function moveEverything() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY < 0 || ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX < 0) {
        if (ballY > player1Y && ballY < player1Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            player2Score++;
            resetBall();
        }
    }

    if (ballX > canvas.width) {
        if (ballY > player2Y && ballY < player2Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            player1Score++;
            resetBall();
        }
    }

    if (ballY > player2Y + paddleHeight / 2) {
        player2Y += 6;
    } else {
        player2Y -= 6;
    }
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
}

function updateGame() {
    moveEverything();
    drawEverything();
}

setInterval(updateGame, 1000 / 30);

window.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    const root = document.documentElement;
    const mouseY = e.clientY - rect.top - root.scrollTop;
    player1Y = mouseY - paddleHeight / 2;
});
