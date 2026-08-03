/* ==========================================================
   FOOTBALL PENALTY SHOOTOUT
   Part 1 / 12
   Engine + Game Objects
   ========================================================== */

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 600;

/*==========================================================
GAME
==========================================================*/

const Game = {

    width: canvas.width,

    height: canvas.height,

    started: false,

    over: false,

    currentRound: 1,

    maxRounds: 5,

    playerScore: 0,

    aiScore: 0,

    delta: 0,

    lastTime: 0

};

/*==========================================================
INPUT
==========================================================*/

const Input = {

    mouseX: canvas.width / 2,

    mouseY: 150,

    charging: false,

    power: 0,

    powerDirection: 1

};

/*==========================================================
BALL
==========================================================*/

const Ball = {

    x: 500,

    y: 520,

    radius: 14,

    vx: 0,

    vy: 0,

    moving: false,

    rotation: 0,

    targetX: 500,

    targetY: 150,

    speed: 0,

    reset() {

        this.x = 500;
        this.y = 520;

        this.vx = 0;
        this.vy = 0;

        this.speed = 0;

        this.rotation = 0;

        this.moving = false;

    }

};

/*==========================================================
GOAL
==========================================================*/

const Goal = {

    x: 250,

    y: 60,

    width: 500,

    height: 180

};

/*==========================================================
GOALKEEPER
==========================================================*/

const Keeper = {

    x: 500,

    y: 170,

    width: 80,

    height: 90,

    targetX: 500,

    speed: 6,

    diving: false,

    direction: 0,

    reset() {

        this.x = 500;

        this.targetX = 500;

        this.diving = false;

        this.direction = 0;

    }

};

/*==========================================================
COLORS
==========================================================*/

const Colors = {

    sky1: "#6dc6ff",

    sky2: "#dff4ff",

    grass1: "#38b34a",

    grass2: "#1e8c39",

    white: "#ffffff",

    keeper: "#ffd400",

    skin: "#ffd9b3",

    shadow: "rgba(0,0,0,.25)"

};

/*==========================================================
DOM
==========================================================*/

const ui = {

    player: document.getElementById("playerScore"),

    ai: document.getElementById("aiScore"),

    shot: document.getElementById("currentShot"),

    total: document.getElementById("totalShots"),

    message: document.getElementById("message"),

    power: document.getElementById("powerFill"),

    start: document.getElementById("startBtn"),

    shoot: document.getElementById("shootBtn"),

    restart: document.getElementById("restartBtn")

};

/*==========================================================
UI
==========================================================*/

function updateUI() {

    ui.player.textContent = Game.playerScore;

    ui.ai.textContent = Game.aiScore;

    ui.shot.textContent = Game.currentRound;

    ui.total.textContent = Game.maxRounds;

    ui.power.style.width = Input.power + "%";

}

/*==========================================================
START
==========================================================*/

function startMatch() {

    Game.started = true;

    Game.over = false;

    ui.start.disabled = true;

    ui.shoot.disabled = false;

    ui.message.textContent =
        "Aim with mouse • Hold SHOOT";

}

function restartMatch() {

    Game.started = false;

    Game.over = false;

    Game.currentRound = 1;

    Game.playerScore = 0;

    Game.aiScore = 0;

    Input.power = 0;

    Input.charging = false;

    Ball.reset();

    Keeper.reset();

    updateUI();

    ui.start.disabled = false;

    ui.shoot.disabled = true;

    ui.message.textContent =
        "Click START";

}

/*==========================================================
BUTTONS
==========================================================*/

ui.start.onclick = startMatch;

ui.restart.onclick = restartMatch;

/*==========================================================
MOUSE
==========================================================*/

canvas.addEventListener("mousemove", e => {

    const rect = canvas.getBoundingClientRect();

    Input.mouseX =
        (e.clientX - rect.left) *
        canvas.width / rect.width;

    Input.mouseY =
        (e.clientY - rect.top) *
        canvas.height / rect.height;

});

/*==========================================================
POWER
==========================================================*/

ui.shoot.addEventListener("mousedown", () => {

    if (!Game.started) return;

    if (Ball.moving) return;

    Input.charging = true;

});

window.addEventListener("mouseup", () => {

    if (!Input.charging) return;

    Input.charging = false;

    // Shoot logic comes in Part 4

});

/*==========================================================
INIT
==========================================================*/

restartMatch();