var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudImage
var obstacle1 , obstacle2, obstacle3, obstacle4, obstacle5, obstacle6
var obstacle
var CloudsGroup, ObstaclesGroup
var PLAY = 1;
var END= 0;
var GameState = PLAY;
var die , jump, checkpoint
var TrexIsJumping = 0
var gameover, restart, GameOverImage, RestartImage

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png")
  obstacle1 = loadImage ("obstacle1.png")
  obstacle2 = loadImage ("obstacle2.png")
  obstacle3 = loadImage ("obstacle3.png")
  obstacle4 = loadImage ("obstacle4.png")
  obstacle5 = loadImage ("obstacle5.png")
  obstacle6 = loadImage ("obstacle6.png")
die = loadSound ("die.mp3")
checkpoint = loadSound ("checkPoint.mp3")
jump = loadSound ("jump.mp3")
GameOverImage = loadImage ("gameOver.png")
RestartImage = loadImage ("restart.png")
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("Stop running!", trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  CloudsGroup = new Group ()
  ObstaclesGroup = new Group ()
  
gameover = createSprite(300,100, 20, 20);
restart = createSprite(300,140, 20, 20);
gameover.addImage("gameOver" , GameOverImage);
gameover.scale = 0.5;
restart.addImage("restart" , RestartImage);
restart.scale = 0.5;
gameover.visible = false;
restart.visible = false;
}

function draw() {
  background("white");
  trex.collide(invisibleGround);
  drawSprites();
  //console.log (trex.y)
  text("Score: "+ TrexIsJumping, 500, 50);
if(GameState === PLAY){
  TrexIsJumping = TrexIsJumping +1
  if(keyDown("space") && trex.y >= 161) {
    trex.velocityY = -15;
    jump.play()
  }
  trex.velocityY = trex.velocityY + 0.8
if (ground.x < 0){
    ground.x = ground.width/2;
  }
  spawnClouds();
  spawnObstacles();
  ground.velocityX = -6
  if (ObstaclesGroup.isTouching (trex)){
  GameState = END
die.play()
  }
}

else if(GameState === END) {
ground.velocityX = 0 
  trex.velocityY = 0
ObstaclesGroup.setVelocityXEach(0);
CloudsGroup.setVelocityXEach(0);
  ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
  trex.changeAnimation ("Stop running!");
  gameover.visible = true;
restart.visible = true;
  if(mousePressedOver(restart)) {
    reset();
  }
}  
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
   cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage("cloud",cloudImage);  
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  CloudsGroup.add (cloud)
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
     obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round (random(1,6));

switch (rand){

case 1: obstacle.addImage("Jump over the obstacles!!" , obstacle1);
        
break;      
        
case 2: obstacle.addImage("Jump over the obstacles!!" , obstacle2);
        
break;   

case 3: obstacle.addImage("Jump over the obstacles!!" , obstacle3);
        
break;      

case 4: obstacle.addImage("Jump over the obstacles!!" , obstacle4);
        
break;

case 5: obstacle.addImage("Jump over the obstacles!!" , obstacle5);
        
break;

case 6: obstacle.addImage("Jump over the obstacles!!" , obstacle6);
        
break;   

default : break;
}
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    ObstaclesGroup.add (obstacle)
  }
}

function reset(){
  GameState = PLAY;
  
  gameover.visible = false;
  restart.visible = false;
  
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  
  trex.changeAnimation("running");
  
  TrexIsJumping = 0;
  
}









