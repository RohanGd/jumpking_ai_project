const canvas = document.querySelector('#canvas')
const c = canvas.getContext('2d')
canvas.width = 1200
canvas.height = 900
const gravity = 0.6
let friction = -0.3

c.fillRect((window.innerWidth - canvas.width)/2, 0, canvas.width, canvas.height)

// function setUpCanvas() {
    
// }

class Sprite {
    constructor() {
        this.width = 50
        this.height = 65
        this.lastKey
        this.currentPosition = createVector(width / 2, height - 200)
        this.velocity = {
            x:0,
            y:0
        }
        // this.speed = {
        //     x:5,
        //     y:10
        // }
    }

    

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if(this.position.y < canvas.height - this.height - this.velocity.y) {
            this.velocity.y += gravity
        } else this.velocity.y = 0

    }

    draw() {
        c.fillStyle = "red"
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

player = new Sprite({
    x: 600,
    y: 800
}, {
    width: 50,
    height: 100
})

const keys = {
    a : {
        pressed : false
    },
    d : {
        pressed : false
    },
    space : {
        pressed : false
    }
}

// function delay(delayInms) {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         resolve(2);
//       }, delayInms);
//     });
//   }

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = "black"
    c.fillRect((window.innerWidth - canvas.width)/2, 0, canvas.width, canvas.height)
    player.update()

    // setTimeout(playMove(),1000)
    // while(player.velocity.x > 0)
    //     player.velocity.x += friction
    // while(player.velocity.x < 0)
    //     player.velocity.x -= friction
    // player.velocity.y = 0
    player.velocity.x = 0
    if (keys.a.pressed && player.lastKey === 'a' && player.position.x > (window.innerWidth - canvas.width)/2) {
        // await delay(1000)
        player.velocity.x = -10
    } else if (keys.d.pressed && player.lastKey === 'd' && (player.position.x < canvas.width - player.width)) {
        // await delay(1000)
        player.velocity.x = 10
    }

    if (keys.space.pressed) {
        player.velocity.y  = -20
    }

    resolveCollision()
    // resetKeys()
}

function resolveCollision() {
    // if ((player.position.x >= (window.innerWidth - canvas.width) / 2 )
    // && (player.position.x < canvas.width - player.width)) return 
    // else if ((player.position.x >= canvas.width - player.width)) {
    //     player.position.x = canvas.width - player.width - 1
    //     // player.velocity.x *= -1
    //     player.position.x += player.velocity.x
    // }
    // else {
    //     player.position.x = (window.innerWidth - canvas.width) / 2
    //     player.velocity.x *= -1
    //     player.position.x += player.velocity.x

    // }
}
// function genRandomKey() {
//     let x = Math.floor(Math.random() * 3)   
//     if (x === 0) return 'd'
//     else if (x === 1) return 'a'
//     else return ' '
// }

// function playMove() {
//     let move = genRandomKey()
//     console.log(move)
    
//     switch (move) {
//         case ' ':
//             keys.space.pressed = true
//             break;
//         case 'd':
//             keys.d.pressed = true
//             player.lastKey = 'd'
//             break;
//         case 'a':
//             keys.a.pressed = true
//             player.lastKey = 'a'
//             break;
//         default:
//             break;
//     }

// }

// function resetKeys() {
//     // for(k in keys) {
//     //     k.pressed = false
//     // }

//     keys.space.pressed = false
// }

player.draw()
animate()

window.addEventListener('keydown', (event) => {
    console.log(event)
    switch (event.key) {
        case ' ':
            keys.space.pressed = true
            break;
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break;
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break;
        default:
            break;
    }
})

window.addEventListener('keyup', (event) => {
    console.log(event)
    switch (event.key) {
        case ' ':
            keys.space.pressed = false
            break;
        case 'd':
            keys.d.pressed = false
            break;
        case 'a':
            keys.a.pressed = false
            break;
        default:
            break;
    }
})
