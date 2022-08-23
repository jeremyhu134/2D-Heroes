const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 660,
    backgroundColor: "a9a9a9",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            enableBody: true,
            debug: true
        }
    },
    scene:[MenuScene,ArenaScene],
    scale: {
        zoom: 1,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.NONE
    }
};

const game = new Phaser.Game(config);

let gameState = {
    checkAnims: function(scene){
        var mDown = false;
        if(gameState.mouse.isDown){
            mDown = 'Shoot';
        } else {
            mDown = '';
        }
        
        if(gameState.input.x >= gameState.character.x){
            gameState.character.flipX = false;
        } else {
            gameState.character.flipX = true;
        }
        
        if(gameState.character.body.velocity.y !== 0){
            gameState.character.anims.play(`RoboHuntJump`+`${mDown}`,true);
        }else if(gameState.character.body.velocity.x !== 0){
            gameState.character.anims.play(`RoboHuntMove`+`${mDown}`,true);
        }else {
            gameState.character.anims.play(`RoboHuntIdle`+`${mDown}`,true);
        }
    }
}
