class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        // reset parameters
        this.sandpaperSpawnDelay = 2000
        this.sandpaperSpeed = 450
        this.sandpaperSpeedMax = 1500

        this.level = 0
        this.score = 0;
    }

    create() {
        this.playConfig = {
            fontFamily: 'Courier',
            fontSize: '32px',
            backgroundColor: '#52280B',
            color: '#FFFFFF',
            align: 'center',
            padding: {
              top: 2,
              bottom: 2,
            },
            fixedWidth: 0
        }
        this.grindstone = this.add.tileSprite(30, 0, 420, game.config.height, 'grindstone').setOrigin(0,0)
        this.kitchenTileLeft = this.add.tileSprite(0, 0, 30, game.config.height, 'tiles').setOrigin(0,0)
        this.kitchenTileLeft = this.add.tileSprite(game.config.width-30, 0, 30, game.config.height, 'tiles').setOrigin(0,0)

        // set up audio, play bgm
        this.bgm = this.sound.add('bgm', { 
            mute: false,
            volume: 1,
            rate: 1,
            loop: true 
        })
        this.bgm.play()

        // set up player paddle (physics sprite) and set properties
        this.knife = this.physics.add.sprite(centerX, game.config.height-140, 'knife').setOrigin(0.5)
        this.knife.setImmovable()
        this.time.delayedCall(2000, () => { 
            this.knife.setDepth(1)
        })
        this.knife.broken = false
        this.knife.position = 1
        this.knife.charged = false
        this.knife.motion = 'forward'
        this.knife.anims.play('forward')
        this.knife.body.setCircle(20,100,0)

        // add snapshot image from prior Scene
        if (this.textures.exists('titlesnapshot')) {
            let titleSnap = this.add.image(centerX, centerY, 'titlesnapshot').setOrigin(0.5)
            this.tweens.add({
                targets: titleSnap,
                duration: 2000,
                y: {from: 460, to: 1800},
                //alpha: { from: 1, to: 0 },
                repeat: 0
            })
        } else {
            console.log('texture error')
        }

        // set up sandpaper group
        this.sandpaperGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        })
        this.time.delayedCall(this.sandpaperSpawnDelay, () => { 
            this.addSandpaper() 
        })

        // set up difficulty timer (triggers callback every second)
        this.difficultyTimer = this.time.addEvent({
            delay: 1000,
            callback: this.levelBump,
            callbackScope: this,
            loop: true
        })

        // set up cursor keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        this.charging = 0;
        //this.scoreDisplay = this.add.text(game.config.width-75, 50, `Score: ${this.score}`, this.playConfig)
    }

    // create new sandpapers and add them to existing sandpaper group
    addSandpaper() {
        let sandpaper = new Sandpaper(this, this.sandpaperSpeed)
        this.sandpaperGroup.add(sandpaper)
    }

    update() {
        //this.scoreDisplay.setText(game.config.width-75, 50, `Score: ${this.score}`, this.playConfig)
        if(this.knife.motion == 'side'){
            this.score+=10
            if(this.knife.charged != true){
                this.charging+=10
            }
        }else{
            this.score+=2
            if(this.knife.charged != true){
                this.charging+=2
            }
        }
        if(this.charging >= 5000){
            this.knife.charged = true
            this.charging = 0
            this.knife.anims.play(`${this.knife.motion}-charged`)
        }
        
        this.grindstone.tilePositionY -= 6

        if(!this.knife.broken) {
            // check for player input
            if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
                    if(this.knife.position != 0){
                        this.knife.x -= 140
                        this.knife.position-=1
            }} else if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
                if(this.knife.motion == 'forward'){
                    if(this.knife.position != 2){
                        this.knife.x += 140
                        this.knife.position +=1
                    }}else{
                        if(this.knife.position != 1){
                            this.knife.x += 140
                            this.knife.position +=1
                    }}
            } else if(Phaser.Input.Keyboard.JustDown(keyUP)) {
                if(this.knife.motion != 'side'){
                    this.knife.setCircle(1,0,0)
                    this.knife.body.checkCollision = false
                    this.knife.motion = 'side'
                    if(this.knife.position == 2){
                        if(this.knife.charged){
                            this.knife.anims.play('side-charged')
                            this.knife.x = game.config.width - 140
                            this.knife.position = 1
                        }else{
                            this.knife.anims.play('side')
                            this.knife.x = game.config.width - 140
                            this.knife.position = 1
                        }
                    }else{
                        if(this.knife.charged){
                            this.knife.anims.play('side-charged')
                            this.knife.x = 220
                            this.knife.position = 0
                        }else{
                            this.knife.anims.play('side')
                            this.knife.x = 220
                            this.knife.position = 0
                    }
                }
                this.knife.body.setOffset(0, 120)
                this.knife.body.setSize(200,50,false)
                this.knife.body.checkCollision = true
            }
            }else if(Phaser.Input.Keyboard.JustDown(keyDOWN)) {
                if(this.knife.motion != 'forward'){
                    this.knife.body.checkCollision = false
                    this.knife.motion = 'forward'
                    if(this.knife.position == 1){
                        if(this.knife.charged){
                            this.knife.anims.play('forward-charged')
                            this.knife.x = centerX + 140
                            this.knife.position = 2
                        }else{
                            this.knife.anims.play('forward')
                            this.knife.x = centerX + 140
                            this.knife.position = 2
                        }
                    }else{
                        if(this.knife.charged){
                            this.knife.anims.play('forward-charged')
                            this.knife.x = centerX - 140
                            this.knife.position = 0
                        }else{
                            this.knife.anims.play('forward')
                            this.knife.x = centerX - 140
                            this.knife.position = 0
                    }
                }this.knife.body.setCircle(20,100,0)
                this.knife.body.checkCollision = true}
            }
            // check for collisions
            if(!this.knife.charged){
                this.physics.world.collide(this.knife, this.sandpaperGroup, this.knifeCollision, null, this)
            }else{
                this.physics.world.collide(this.knife, this.sandpaperGroup, this.knifeDamage, null, this)
            }
        }
    }


    levelBump() {
        // increment level (ie, score)
        this.level++

        // bump speed every 5 levels (until max is hit)
        if(this.level % 5 == 0) {
            //console.log(`level: ${this.level}, speed: ${this.sandpaperSpeed}`)
            if(this.sandpaperSpeed <= this.sandpaperSpeedMax) {     // increase sandpaper speed
                this.sandpaperSpeed += 50
                this.bgm.rate += 0.01
            }
        }
    }

    knifeDamage(){
        this.knife.anims.play(`${this.knife.motion}`)
        this.sound.play(`break${Math.floor(Math.random()*4)+1}`)
        this.time.delayedCall(1000, () => {this.knife.charged = false})
        this.cameras.main.shake(500, 0.0025)
    }

    knifeCollision() {
            this.knife.broken = true               // turn off collision checking
            this.difficultyTimer.destroy()             // shut down timer
            this.sound.play(`break${Math.floor(Math.random()*4)+1}`) // play death sound
            this.cameras.main.shake(500, 0.0075)      // camera death shake
        
            // add tween to fade out audio
            this.tweens.add({
                targets: this.bgm,
                volume: 0,
                ease: 'Linear',
                duration: 2000,
            })

            // switch scenes after timer expires, passing current level to next scene
            this.time.delayedCall(2000, () => { this.scene.start('gameOverScene', { score: this.score }) })
    }
}