


class ArenaScene extends Phaser.Scene {
    constructor() {
		super({ key: 'ArenaScene' })
	}
    preload(){
        //this.load.image('mainplatform','images/mainplatform.png');
          
        
    }
    create(){
        gameState.input=this.input;
        gameState.globalScene = this;
        const connectId = Math.ceil(Math.random()*100);
        var peer = new Peer(connectId);
        gameState.connection;
        peer.on('open', function(id) {
            console.log('My peer ID is: ' + id);
        });
        var textbox = document.createElement("INPUT");
        textbox.setAttribute("type", "text");
        textbox.setAttribute("value", "Hello World!");
        textbox.setAttribute("id", "peerid");
        document.body.appendChild(textbox);
        var b = document.createElement("INPUT");
        b.setAttribute("type", "button");
        b.setAttribute("value", "Connect");
        document.body.appendChild(b);
        b.onclick = function(){
            if(gameState.connection){
                gameState.connection.send("hello");
            }else {
                gameState.connection = peer.connect(`${document.getElementById("peerid").value}`);
            }
        };
        
        
        peer.on('connection', x => {
            x.on('data', data => {
                if(data == 'w'){
                    gameState.character2.setVelocityY(-500);
                }else if(data == 'a'){
                    gameState.character2.setVelocityX(-400);
                }
                else if(data == 'd'){
                    gameState.character2.setVelocityX(400);
                }else if(data == 'still'){
                    gameState.character2.setVelocityX(0);
                }
            })
            x.on('open', () => {
                console.log('open called from peer', x.peer);
                if(!gameState.connection){
                    gameState.connection = peer.connect(x.peer);
                }
            })
            gameState.character2 = this.physics.add.sprite(600,100,'RoboHunt').setOrigin(0,0);
            gameState.character2.body.width = 50;
            gameState.character2.body.offset.x = 25;
            gameState.character2.body.height = 70;
            gameState.character2.body.offset.y = 15;
            gameState.character2.anims.play('RoboHuntIdle',true);
            gameState.character2.setCollideWorldBounds(true);
            gameState.globalScene.physics.add.collider(gameState.character2, gameState.platforms);
            gameState.keys = gameState.input.keyboard.addKeys('W,S,A,D,R,SPACE,SHIFT,ESC');
        });
        
        
        
        gameState.mouse=this.input.mousePointer;
        gameState.platforms = this.physics.add.staticGroup();
        gameState.ammo = this.physics.add.group();
        gameState.platforms.create(10, 640, 'platform').setOrigin(0,0).refreshBody(0);
        gameState.platforms.create(100, 500, 'platform').setOrigin(0,0).refreshBody(0);
        gameState.platforms.create(400, 460, 'platform').setOrigin(0,0).refreshBody(0);
        gameState.platforms.create(800, 300, 'platform').setOrigin(0,0).refreshBody(0);
        gameState.platforms.create(600, 400, 'platform').setOrigin(0,0).refreshBody(0);
        gameState.platforms.create(0, 0, 'platform').setOrigin(0,0).refreshBody(0);
        gameState.platforms.create(0, 659, 'platform').setOrigin(0,0).setScale(100).refreshBody(0);
        this.add.image(0,0,'arenabg').setOrigin(0,0);
        gameState.platforms.create(1270, 0, 'sideplatform').setOrigin(0,0).refreshBody(0);
        gameState.cursors = this.input.keyboard.createCursorKeys(); 
        
        gameState.character = this.physics.add.sprite(600,100,'RoboHunt').setOrigin(0,0);
        gameState.character.body.width = 50;
        gameState.character.body.offset.x = 25;
        gameState.character.body.height = 70;
        gameState.character.body.offset.y = 15;
        gameState.character.anims.play('RoboHuntIdle',true);
        gameState.character.setCollideWorldBounds(true);
        
        this.physics.add.collider(gameState.character, gameState.platforms);
        this.time.addEvent({
            delay: 1,
            callback: ()=>{
                
            },  
            startAt: 0,
            timeScale: 1,
            loop: true
        });
        
    }
    
    
    update(){
        if(gameState.keys && gameState.connection){
            if(gameState.keys.W.isDown && gameState.character.body.touching.down){
                gameState.connection.send('w');
                gameState.character.setVelocityY(-500);
            }
            if(gameState.keys.A.isDown){
                gameState.connection.send('a');
                gameState.character.setVelocityX(-400);
            }else if(gameState.keys.D.isDown){
                gameState.connection.send('d');
                gameState.character.setVelocityX(400);
            }else {
                if(gameState.character.body.touching.down){
                    gameState.connection.send('still');
                    gameState.character.setVelocityX(0);
                } 
            }
            gameState.checkAnims(gameState.globalScene);
        }
    }
}