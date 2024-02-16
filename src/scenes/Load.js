class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics()
        this.load.on('progress', (value) => {
            loadingBar.clear()                              // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1)               // (color, alpha)
            loadingBar.fillRect(0, centerY, w * value, 5)   // (x, y, w, h)
        })
        this.load.on('complete', () => {
            loadingBar.destroy()
        })

        // load graphics assets
        this.load.image('tiles', './assets/img/Tile-Background.png')
        this.load.image('grindstone', './assets/img/Grindstone-Sprite.png')
        this.load.image('sandpaper', './assets/img/Sandpaper.png')
        this.load.spritesheet('knife', './assets/img/Knife.png', {frameWidth: 280, frameHeight: 280})
        // load audio assets
        this.load.audio('bgm', ['./assets/audio/dance.mp3'])
        this.load.audio('break1', "./assets/audio/break1.wav")
        this.load.audio('break2', "./assets/audio/break2.wav")
        this.load.audio('break3', "./assets/audio/break3.wav")
        this.load.audio('break4', "./assets/audio/break4.wav")
        //Music I use: Bensound.com
        //License code: DSJEMKGH2RFXAC4B
    }

    create() {
        // check for local storage browser support
        window.localStorage ? console.log('Local storage supported') : console.log('Local storage not supported')
        this.anims.create({
            key:'forward',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('knife', { start: 0, end: 4 }),
        })
        this.anims.create({
            key:'forward-charged',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('knife', { start: 5, end: 9 }),
        })
        this.anims.create({
            key:'side',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('knife', { start: 10, end: 14 }),
        })
        this.anims.create({
            key:'side-charged',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('knife', { start: 15, end: 19 }),
        })

        // go to Title scene
        this.scene.start('titleScene')
    }
}