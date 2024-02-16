class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene')
    }

    init(data) {
        this.score = data.score
    }

    create() {
        this.cameras.main.setBackgroundColor('#CCC')
        let gameOverConfig = {
            fontFamily: 'Courier',
            fontSize: '36px',
            backgroundColor: '#52280B',
            color: '#FFFFFF',
            align: 'center',
            padding: {
              top: 2,
              bottom: 2,
            },
            fixedWidth: 0
        }
        // check for high score in local storage
        // uncomment console.log statements if you need to debug local storage
        if(localStorage.getItem('hiscore') != null) {
            let storedScore = parseInt(localStorage.getItem('hiscore'))
            //console.log(`storedScore: ${storedScore}`)
            // see if current score is higher than stored score
            if(this.score > storedScore) {
                //console.log(`New high score: ${this.level}`)
                localStorage.setItem('hiscore', this.score.toString())
                highScore = this.score
                newHighScore = true
            } else {
                //console.log('No new high score :/')
                highScore = parseInt(localStorage.getItem('hiscore'))
                newHighScore = false
            }
        } else {
            //console.log('No high score stored. Creating new.')
            highScore = this.score
            localStorage.setItem('hiscore', highScore.toString())
            newHighScore = true
        }

        // add GAME OVER text
        if(newHighScore) {
            this.add.text(centerX, centerY-200, 'New HighScore', gameOverConfig).setOrigin(0.5)
        }
        this.add.text(centerX, centerY-150, `Score: ${this.score}`, gameOverConfig).setOrigin(0.5)
        this.add.text(centerX, centerY-100, `Press Down to Restart`, gameOverConfig).setOrigin(0.5)
        gameOverConfig.fontSize='26px'
        this.add.text(centerX, centerY+200, `Music I use: Bensound.com\nLicense code: DSJEMKGH2RFXAC4B`, gameOverConfig).setOrigin(0.5)

        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        // wait for UP input to restart game
        if (Phaser.Input.Keyboard.JustDown(cursors.down)) {
            let textureManager = this.textures
            console.log(textureManager)
            // take snapshot of the entire game viewport (same as title screen)
            this.game.renderer.snapshot((snapshotImage) => {
                console.log('took snapshot in GameOver')
                if(textureManager.exists('titlesnapshot')) {
                    textureManager.remove('titlesnapshot')
                }
                textureManager.addImage('titlesnapshot', snapshotImage)
            })

            // start next scene
            this.scene.start('playScene')
        }
    }
}