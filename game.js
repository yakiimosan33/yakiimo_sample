const canvas = document.getElementById('tennis-court');
const ctx = canvas.getContext('2d');

const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 80;
const BALL_SIZE = 10;
const PADDLE_SPEED = 5;
const BALL_SPEED = 5;

class Paddle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dy = 0;
        this.score = 0;
    }

    update() {
        this.y += this.dy;
        this.y = Math.max(PADDLE_HEIGHT / 2, Math.min(canvas.height - PADDLE_HEIGHT / 2, this.y));
    }

    draw() {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x - PADDLE_WIDTH / 2, this.y - PADDLE_HEIGHT / 2, PADDLE_WIDTH, PADDLE_HEIGHT);
    }

    moveUp() {
        this.dy = -PADDLE_SPEED;
    }

    moveDown() {
        this.dy = PADDLE_SPEED;
    }

    stop() {
        this.dy = 0;
    }
}

class Ball {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.dx = (Math.random() > 0.5 ? 1 : -1) * BALL_SPEED;
        this.dy = (Math.random() - 0.5) * BALL_SPEED;
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.y - BALL_SIZE / 2 <= 0 || this.y + BALL_SIZE / 2 >= canvas.height) {
            this.dy = -this.dy;
        }
    }

    draw() {
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(this.x, this.y, BALL_SIZE / 2, 0, Math.PI * 2);
        ctx.fill();
    }

    checkPaddleCollision(paddle) {
        const paddleLeft = paddle.x - PADDLE_WIDTH / 2;
        const paddleRight = paddle.x + PADDLE_WIDTH / 2;
        const paddleTop = paddle.y - PADDLE_HEIGHT / 2;
        const paddleBottom = paddle.y + PADDLE_HEIGHT / 2;

        const ballLeft = this.x - BALL_SIZE / 2;
        const ballRight = this.x + BALL_SIZE / 2;
        const ballTop = this.y - BALL_SIZE / 2;
        const ballBottom = this.y + BALL_SIZE / 2;

        if (ballRight >= paddleLeft && ballLeft <= paddleRight &&
            ballBottom >= paddleTop && ballTop <= paddleBottom) {
            this.dx = -this.dx;
            const relativeIntersectY = paddle.y - this.y;
            const normalizedRelativeIntersectionY = relativeIntersectY / (PADDLE_HEIGHT / 2);
            this.dy = -normalizedRelativeIntersectionY * BALL_SPEED;
        }
    }
}

class Game {
    constructor() {
        this.player = new Paddle(30, canvas.height / 2);
        this.computer = new Paddle(canvas.width - 30, canvas.height / 2);
        this.ball = new Ball();
        this.isRunning = false;
        this.keys = {};
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        document.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
            if (e.key === ' ') {
                e.preventDefault();
                this.toggleGame();
            }
        });

        document.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });
    }

    toggleGame() {
        this.isRunning = !this.isRunning;
        document.getElementById('game-status').textContent = this.isRunning ? 'Playing' : 'Paused';
        if (this.isRunning) {
            this.gameLoop();
        }
    }

    handleInput() {
        if (this.keys['w'] || this.keys['W'] || this.keys['ArrowUp']) {
            this.player.moveUp();
        } else if (this.keys['s'] || this.keys['S'] || this.keys['ArrowDown']) {
            this.player.moveDown();
        } else {
            this.player.stop();
        }
    }

    updateAI() {
        const paddleCenter = this.computer.y;
        const ballY = this.ball.y;
        const diff = ballY - paddleCenter;
        
        if (Math.abs(diff) > PADDLE_HEIGHT / 4) {
            if (diff > 0) {
                this.computer.moveDown();
            } else {
                this.computer.moveUp();
            }
        } else {
            this.computer.stop();
        }
    }

    checkScore() {
        if (this.ball.x < 0) {
            this.computer.score++;
            document.getElementById('computer-score').textContent = this.computer.score;
            this.ball.reset();
        } else if (this.ball.x > canvas.width) {
            this.player.score++;
            document.getElementById('player-score').textContent = this.player.score;
            this.ball.reset();
        }
    }

    update() {
        if (!this.isRunning) return;

        this.handleInput();
        this.updateAI();

        this.player.update();
        this.computer.update();
        this.ball.update();

        this.ball.checkPaddleCollision(this.player);
        this.ball.checkPaddleCollision(this.computer);

        this.checkScore();
    }

    draw() {
        ctx.fillStyle = '#1e5128';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = 'white';
        ctx.setLineDash([10, 10]);
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();
        ctx.setLineDash([]);

        this.player.draw();
        this.computer.draw();
        this.ball.draw();
    }

    gameLoop() {
        this.update();
        this.draw();

        if (this.isRunning) {
            requestAnimationFrame(() => this.gameLoop());
        }
    }
}

const game = new Game();
game.draw();