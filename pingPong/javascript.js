// Declarando as variáveis
var canvas
var canvasContext
var ballX = 100
var ballY = 100
var ballSpeedX = 20
var ballSpeedY = 4
var paddle1Y = 250
var paddle2Y = 250
var stopped = true
var player1Score = 0
var player2Score = 0
const PADDLE_HEIGHT = 100
const PADDLE_THICKNESS = 10
const WINNING_SCORE = 5

// Posição do mouse
function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect()
    var root = document.documentElement
    var mouseX = evt.clientX - rect.left - root.scroll
    var mouseY = evt.clientY - rect.top - root.scrollTop
    return {
        x: mouseX,
        y: mouseY
    }
}
// Quando clicar
function handleMouseClick(evt) {
    if (stopped) {
        player1Score = 0
        player2Score = 0
        stopped = false
    }
}

// INICIO
window.onload = () => {
    canvas = document.getElementById('gameCanvas')
    h = canvas.height
    w = canvas.width
    ballX = w/2
    ballY = h/2

    canvasContext = canvas.getContext('2d')
    canvasContext.font = '30px serif'
    let fps = 30
    // Game RUNTIME
    setInterval(() => computerMovement(5),500/fps)
    setInterval(() => {
        moveEverything()
        drawEverything()
    }, 1000 / fps)
    // Clique  
    canvas.addEventListener('mousedown', handleMouseClick)
    // Movimento do mouse 
    canvas.addEventListener('mousemove', (evt) => {
        var mousePos = calculateMousePos(evt)
        paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2)
    })
}
// Resetar a bola
function ballReset() {
    if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {
        stopped = true
    }
    ballSpeedX = -ballSpeedX
    ballX = w / 2
    ballY = h / 2
}
// Paddle 2 Movement
function computerMovement(distance) {
    //    paddle2Y = ballY - PADDLE_HEIGHT/2
    if (paddle2Y + (PADDLE_HEIGHT / 2) < ballY - 35) {
        paddle2Y += distance
    } else if (paddle2Y + (PADDLE_HEIGHT / 2) > ballY + 35) {
        paddle2Y -= distance
    }
}
// Movimento
function moveEverything() {
    if (stopped) {
        return;
    }
    // computerMovement()
    ballX += ballSpeedX
    if (ballX < 20) {
        if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX

            var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2)
            ballSpeedY = deltaY * .35

        } else {
            player2Score++
            ballReset()
        }
    }
    if (ballX > w - 20) {
        if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX

            var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT / 2)
            ballSpeedY = deltaY * .35
        } else {
            player1Score++
            ballReset()
        }
    }
    ballY += ballSpeedY
    if (ballY < 15) ballSpeedY = -ballSpeedY
    if (ballY > h - 15) ballSpeedY = -ballSpeedY
}
// Desenha a linha no meio da tela
function drawNet() {
    for (var i = 0; i < h; i += 40) {
        colorRect(w / 2 - 1, i, 2, 20, 'white')
    }
}
// Desenhar objetos na tela
function drawEverything() {
    // Background
    colorRect(0, 0, w, h, 'black')
    if (stopped) {
        canvasContext.fillStyle = 'white'
        if (player1Score >= WINNING_SCORE) {
            canvasContext.fillText("Left player WON !", w / 2 - 105, h / 2)
        }
        else if (player2Score >= WINNING_SCORE) {
            canvasContext.fillText("Right player WON !", w / 2 - 105, h / 2)
        }
        canvasContext.fillText("Click to start a new game", w / 2 - 150, 200)
        return;
    }
    drawNet()
    // Ball
    colorCircle(ballX, ballY, 10, 'red')
    // Left Paddle
    colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white')
    // Right Paddle
    colorRect(w - PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white')
    // Text
    canvasContext.fillText(player1Score, w / 2 - 50, 50)
    canvasContext.fillText(player2Score, w / 2 + 50, 50)
}
// Desenhar Retangulos
function colorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor
    canvasContext.fillRect(leftX, topY, width, height)

}
// Desenhar Circulos
function colorCircle(centerX, centerY, radius, drawColor) {
    canvasContext.fillStyle = drawColor
    canvasContext.beginPath()
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true)
    canvasContext.fill()
}

// // Declarando as variáveis
// var canvas
// var canvasContext
// var ballX = 50
// var ballY = 50
// var ballSpeedX = 10
// var ballSpeedY = 3
// var paddle1Y = 250
// var paddle2Y = 250
// var stopped = false
// var player1Score = 0
// var player2Score = 0
// const PADDLE_HEIGHT = 100
// const PADDLE_THICKNESS = 10
// const WINNING_SCORE = 1

// // Posição do mouse
// function calculateMousePos(evt) {
//     var rect = canvas.getBoundingClientRect()
//     var root = document.documentElement
//     var mouseX = evt.clientX - rect.left - root.scroll
//     var mouseY = evt.clientY - rect.top - root.scrollTop
//     return {
//         x: mouseX,
//         y: mouseY
//     }
// }
// // Quando clicar
// function handleMouseClick(evt) {
//     if (stopped) {
//         player1Score = 0
//         player2Score = 0
//         stopped = false
//     }
// }
// 
// // INICIO
// window.onload = () => {
//     canvas = document.getElementById('gameCanvas')
//     h = canvas.height
//     w = canvas.width
//     canvasContext = canvas.getContext('2d')
//     let fps = 30
//     // Game RUNTIME
//     setInterval(() => {
//         moveEverything()
//         drawEverything()
//     }, 1000 / fps)
//     // Clique  
//     canvas.addEventListener('mousedown', handleMouseClick)
//     // Movimento do mouse 
//     canvas.addEventListener('mousemove', (evt) => {
//         var mousePos = calculateMousePos(evt)
//         paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2)
//     })
// }
// // Resetar a bola
// function ballReset() {
//     if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {
//         stopped = true
//     }
//     ballSpeedX = -ballSpeedX
//     ballX = w / 2
//     ballY = h / 2
// }
// // Paddle 2 Movement
// function computerMovement() {
//     //    paddle2Y = ballY - PADDLE_HEIGHT/2
//     if (paddle2Y + (PADDLE_HEIGHT / 2) < ballY - 35) {
//         paddle2Y += 6
//     } else if (paddle2Y + (PADDLE_HEIGHT / 2) > ballY + 35) {
//         paddle2Y -= 6
//     }
// }
// // Movimento
// function moveEverything() {
//     if (stopped) {
//         return;
//     }
//     computerMovement()
//     ballX += ballSpeedX
//     if (ballX < 20) {
//         if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
//             ballSpeedX = -ballSpeedX

//             var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2)
//             ballSpeedY = deltaY * .35

//         } else {
//             player2Score++
//             ballReset()
//         }
//     }
//     if (ballX > w - 20) {
//         if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
//             ballSpeedX = -ballSpeedX

//             var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT / 2)
//             ballSpeedY = deltaY * .35
//         } else {
//             player1Score++
//             ballReset()
//         }
//     }
//     ballY += ballSpeedY
//     if (ballY < 15) ballSpeedY = -ballSpeedY
//     if (ballY > h - 15) ballSpeedY = -ballSpeedY
// }
// // Desenha a linha no meio da tela
// function drawNet() {
//     for (var i = 0; i < h; i += 40) {
//         colorRect(w / 2 - 1, i, 2, 20, 'white')
//     }
// }
// // Desenhar objetos na tela
// function drawEverything() {
//     // Background
//     colorRect(0, 0, w, h, 'black')
//     if (stopped) {
//         canvasContext.fillStyle = 'white'
//         if (player1Score >= WINNING_SCORE) {
//             canvasContext.fillText("Left player WON !", w / 2, h / 2)
//         }
//         else if (player2Score >= WINNING_SCORE) {
//             canvasContext.fillText("Right player WON !", w / 2, h / 2)
//         }
//         canvasContext.fillText("Click to start a new game", w / 2, 200)
//         return;
//     }
//     drawNet()
//     // Ball
//     colorCircle(ballX, ballY, 10, 'red')
//     // Left Paddle
//     colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white')
//     // Right Paddle
//     colorRect(w - PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white')
//     // Text
//     canvasContext.fillText(player1Score, w / 2 - 50, 50)
//     canvasContext.fillText(player2Score, w / 2 + 50, 50)
// }
// // Desenhar Retangulos
// function colorRect(leftX, topY, width, height, drawColor) {
//     canvasContext.fillStyle = drawColor
//     canvasContext.fillRect(leftX, topY, width, height)

// }
// // Desenhar Circulos
// function colorCircle(centerX, centerY, radius, drawColor) {
//     canvasContext.fillStyle = drawColor
//     canvasContext.beginPath()
//     canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true)
//     canvasContext.fill()
// }