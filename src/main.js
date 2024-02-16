//Gabriel Allen
//Title=To the Grindstone
//~15 Hours spent
//The most interesting part of what I had to learn was how to manipulate changing collision boxes as a sprite's dimension changes
//While the current implementation is very awkward on that front, it is functional, and helpful to be aware of going forward
//Art wise it is very basic with nothing I'm exceptionally proud of, and that music is from a royalty free library while the effects are generated using the tools provided earlier in the quarter
//I do want to note that I did use paddle parkour as a significant jumping off point, but I believe that I altered more than enough of the functioning systems to not have been a "reskin"
// define and configure main Phaser game object
let config = {
    type: Phaser.AUTO,
    height: 920,
    width: 480,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Load, Title, Play, GameOver ]
}

// uncomment the following line if you need to purge local storage data
//localStorage.clear()

// define game
let game = new Phaser.Game(config)

// define globals
let centerX = game.config.width/2
let centerY = game.config.height/2
let w = game.config.width
let h = game.config.height
let tileSize = 30
const textSpacer = 64
let keyLEFT, keyRIGHT, keyDOWN, keyUP

let highScore
let newHighScore = false
let cursors