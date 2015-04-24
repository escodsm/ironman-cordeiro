//todo: (feb 20 2014) 

//fix portal appearance
//add music and sfx
//add baddies


var  game = new Phaser.Game(800, 600, Phaser.AUTO, 'viewport', {
	preload: preload, create: create, update: update 
});

var button;
var background;
var coinEffect;
var jumpEffect;
var player;
var playerSpeed = 150;
var platforms;
var cursors;
var dxAmt;
var shards;
var score = 0;
var scoreText;
var endStageTimer;
var n = 1;
var skip;
var mob;



//game starts, hero is facing right
var facing = 'right';
//jumping
var jumping = false;
//moving
var running = false;

var jumpTimer = 0;

var playerMoveLeft = false;
var playerMoveRight = false;
var playerMove = false;
var kBoardActive = false;

var jumpbutton;


function  preload() {
	game.load.image('sky', 'assets/levelOne.jpg');
	game.load.image('ground', 'assets/platform.png');
	game.load.image('groundBuilder', 'assets/platformers.png');
	game.load.image('skip', 'assets/skipper.png');
    game.load.image('shard', 'assets/diamond.png');
	
	game.load.image('forest', 'assets/levelTwo.jpg');
	
	game.load.spritesheet('dude', 'assets/hero.png', 40, 48);
    game.load.spritesheet('larry', 'assets/hero.png', 40, 48);
	game.load.spritesheet('portal', 'assets/portal2.png', 50, 50);

    
	// star collect sound
	game.load.audio('coin', ['assets/audio/powerup.wav']);
	game.load.audio('jump', ['assets/audio/jump.wav']);
	
}







function  create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
	
    //game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL; //resize your window to see the stage resize too
	//game.stage.scale.setShowAll();
	game.stage.scale.refresh();
    
    game.physics.enable(player, Phaser.Physics.ARCADE);
    game.physics.enable(shards, Phaser.Physics.ARCADE);

    //sound effect instatiation:
    coinEffect = game.add.audio('coin',1,true);
    jumpEffect = game.add.audio('jump',1,true);

    
    
    background = game.add.sprite(0, 0, 'sky');




    platforms = game.add.group();

    var ground = platforms.create(0, game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;

    var ledge = platforms.create(400, 400, 'ground');
        ledge.body.immovable = true;
        ledge = platforms.create(-150, 250, 'ground');
        ledge.body.immovable = true;
	
    player = game.add.sprite(32, game.world.height - 150, 'dude');

    player.body.gravity.y = 12;
    player.body.bounce.y = 0.2;

    player.body.collideWorldBounds = true;

    //player animations:
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('idle_left', [4], 10, true);
    player.animations.add('idle_right', [5], 10, true);
    player.animations.add('right', [6, 7, 8, 9], 10, true);
    player.animations.add('jump', [10], 10, true);

    //***********************    
    mob = game.add.sprite(2, game.world.height - 100, 'larry');

    mob.body.gravity.y = 12;
    mob.body.bounce.y = 0.2;

    mob.body.collideWorldBounds = true;

    //mob animations:
    mob.animations.add('left', [0, 1, 2, 3], 10, true);
    mob.animations.add('idle_left', [4], 10, true);
    mob.animations.add('idle_right', [5], 10, true);
    mob.animations.add('right', [6, 7, 8, 9], 10, true);
    mob.animations.add('jump', [10], 10, true);

    //**********************

    //  Finally crystal shard to collect
    shards = game.add.group();
    for (var  i = 0; i < 1; i++)    {
        //  Create a shard inside of the 'shards' group
        var  shard = shards.create(i * 70, 0, 'shard');
        shard.body.gravity.y = 6;
        shard.body.bounce.y = 0.2 + Math.random() * 0.2;

    }
//  The score
    scoreText = game.add.text(16, 16, 'Tutorial 1: Get the particle shard.', {
        fontSize: '32px', fill: '#000' 
    });
//  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


    skip = game.add.button(725,20, 'skip', skipStage, this, null, null, null);


    


}//create fn









function  update() {

//  Collide the player and the shards with the platforms
//	game.physics.arcade.collide(player, platforms);
//	game.physics.arcade.collide(shards, platforms);
//  Checks to see if the player overlaps with any of the shard, if he does call the collectshard function
//	game.physics.overlap(player, shards, collectShard, null, this);
//check to see if player touches end portal
//	game.physics.overlap(player, _portal, endStage, null, this);



////////////////////////////////////////////////////////PLAYER MOVEMENT/////////////////////////////////////////////////////////////
//check kboard input
//default state is idle, not moving, facing whichever direction was pressed last (left or right)

//player.body.velocity.x = 0;
jumping = false;
 
 //movement
    if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;

        if (facing != 'left')
        {
            player.animations.play('left');
            facing = 'left';
            
        }
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;

        if (facing != 'right')
        {
            player.animations.play('right');
            facing = 'right';
            
        }
    }
    else
    {
        if (facing != 'idle')
        {
            player.animations.stop();

            if (facing == 'left')
            {
                player.frame = 4;
            }
            else
            {
                player.frame = 5;
            }

            facing = 'idle';
        }
    }
    
    if (cursors.up.isDown && player.body.touching.down && game.time.now > jumpTimer)
    {
        player.body.velocity.y = -515;
        jumpTimer = game.time.now + 750;
        jumpEffect.play('',0,1,false);
        jumping = true;
			

        
    }




}//update fn



		function  collectShard (player, shard) {
			coinEffect.play('',0,1,false);
			// Removes the shard from the screen
			shard.kill();
			//  Add and update the score
			score += 10;
			scoreText.content = 'Tutorial 1: Get the fragment. ';
				if (score = 10){
					scoreText.content = 'Good! Now bring it to the transporter.';	
					Portal.init();
				}
		}

	//collision with end portal?

		function skipStage(){
			shards.kill();
			Portal.init();
			endStage();
		}

	
		function endStage(){
			scoreText.content = 'One Crystal Fragment Uploaded.';
		 	endStageTimer=setTimeout(function(){clean();},1000);	


			
		}



		
		function clean(){
			n++;
			clearTimeout(endStageTimer);
			
			background.destroy();
			queueNext(n);			
		}
		
		function queueNext(number){
            switch(number){
                case 2:
                    LoadLevel.init_world_two();
                    break;
                case 3:
                    LoadLevel.init_world_three();
                default:
                    alert('no Leveldata Loaded//');
            }
			
		}
	