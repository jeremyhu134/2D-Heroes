class MenuScene extends Phaser.Scene {
    constructor() {
		super({ key: 'MenuScene' })
	}
    preload(){
        this.load.image('platform','images/platform.png');
        this.load.spritesheet('RoboHunt','images/RoboHunt.png',{frameWidth: 100,frameHeight: 100});
    }
    create() {
        
        
        //Animations
            //RoboHunt
                this.anims.create({
                    key: 'RoboHuntDeath',
                    frameRate: 15,
                    frames:this.anims.generateFrameNames('RoboHunt',{start: 0,end: 10})
                });
                this.anims.create({
                    key: 'RoboHuntIdle',
                    frameRate: 8,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('RoboHunt',{start: 11,end: 16})
                });
                this.anims.create({
                    key: 'RoboHuntIdleShoot',
                    frameRate: 15,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('RoboHunt',{start: 35,end: 37})
                });
                this.anims.create({
                    key: 'RoboHuntMove',
                    frameRate: 15,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('RoboHunt',{start: 21,end: 27})
                });
                this.anims.create({
                    key: 'RoboHuntMoveShoot',
                    frameRate: 15,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('RoboHunt',{start: 28,end: 34})
                });
                this.anims.create({
                    key: 'RoboHuntJump',
                    frameRate: 10,
                    frames:this.anims.generateFrameNames('RoboHunt',{start: 17,end: 17})
                });
                this.anims.create({
                    key: 'RoboHuntJumpShoot',
                    frameRate: 10,
                    repeat: -1,
                    frames:this.anims.generateFrameNames('RoboHunt',{start: 18,end: 20})
                });
                this.scene.stop("MenuScene");
                this.scene.start("ArenaScene");
	}
    update(){
        
    }
}