const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1200
canvas.height = 900
const gravity = 0.3

c.fillRect((window.innerWidth - canvas.width)/2, 0, canvas.width, canvas.height)

class Sprite {
    constructor(position, size) {
        this.position = position
        this.width = size.width
        this.height = size.height
        this.velocity = {
            x:0,
            y:0
        }
        this.speed = {
            x:5,
            y:10
        }
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y
        if(this.position.y < canvas.height - this.height - this.velocity.y) {
            this.velocity.y += gravity
        }
        else this.velocity.y = 0

    }

    draw() {
        c.fillStyle = "red"
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

player = new Sprite({
    x:100,
    y:100
}, {
    width: 50,
    height: 100
})


function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = "black"
    c.fillRect((window.innerWidth - canvas.width)/2, 0, canvas.width, canvas.height)
    player.update()
}

player.draw()
animate()

window.addEventListener('keydown', (event) => {
    console.log(event)
    switch (event.key) {
        case 'w':
            player.velocity.y = -10
            break;
    
        default:
            break;
    }
})

