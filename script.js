const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const menu = document.getElementById("menu");
const startButton = document.getElementById("startButton");

canvas.width = 400;
canvas.height = 600;

let player;
let platforms;
let score;
let isGameOver = false;

// Ігровий об'єкт
class Player {
    constructor() {
        this.x = canvas.width / 2 - 20;
        this.y = canvas.height - 50;
        this.width = 40;
        this.height = 40;
        this.color = "red";
        this.velocity = 0;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    jump() {
        this.velocity = -10;
    }

    update() {
        this.y += this.velocity;
        this.velocity += 0.5;

        if (this.y > canvas.height) {
            isGameOver = true;
        }
    }
}

// Платформи
class Platform {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = "green";
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// Ініціалізація гри
function init() {
    player = new Player();
    platforms = [
        new Platform(150, 550, 100, 10),
        new Platform(200, 400, 100, 10),
        new Platform(50, 250, 100, 10),
        new Platform(250, 100, 100, 10),
    ];
    score = 0;
    isGameOver = false;
}

// Оновлення платформи
function updatePlatforms() {
    platforms.forEach((platform) => {
        platform.y += 2;

        if (platform.y > canvas.height) {
            platform.y = -10;
            platform.x = Math.random() * (canvas.width - platform.width);
            score++;
        }

        if (
            player.y + player.height > platform.y &&
            player.y + player.height < platform.y + platform.height &&
            player.x + player.width > platform.x &&
            player.x < platform.x + platform.width &&
            player.velocity >= 0
        ) {
            player.jump();
        }
    });
}

// Малювання очок
function drawScore() {
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText(`Очки: ${score}`, 10, 30);
}

// Малювання всього
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw();
    platforms.forEach((platform) => platform.draw());
    drawScore();
}

// Оновлення гри
function updateGame() {
    if (isGameOver) {
        alert(`Гра закінчена! Твій рахунок: ${score}`);
        menu.style.display = "block";
        canvas.style.display = "none";
        return;
    }

    player.update();
    updatePlatforms();
    draw();

    requestAnimationFrame(updateGame);
}

// Початок гри
startButton.addEventListener("click", () => {
    menu.style.display = "none";
    canvas.style.display = "block";
    init();
    updateGame();
});
