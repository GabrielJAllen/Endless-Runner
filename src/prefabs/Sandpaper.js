class Sandpaper extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        // call Phaser Physics Sprite constructor
        super(scene, Math.floor(Math.random()*3)*140 + 100, 0, 'sandpaper')
        
        this.parentScene = scene

        // set up physics sprite
        this.parentScene.add.existing(this)
        this.parentScene.physics.add.existing(this)
        this.setVelocityY(velocity)
        this.setImmovable()                    
        this.newSandpaper = true
    }

    update() {
        // add new sandpaper when y hits mid
        if(this.newSandpaper && this.y > centerY) {
            this.parentScene.addSandpaper(this.parent, this.velocity)
            this.newSandpaper = false
        }
        if(this.y > game.config.height+80) {
            this.destroy()
        }
    }
}