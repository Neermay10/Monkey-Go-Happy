END = 0;
PLAY = 1;
gameState = PLAY;



var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score = 0;

var ground;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}



function setup() {
  createCanvas (600,300);
  
  monkey = createSprite(50,225,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.09
  
  
  
//creating ground
  ground = createSprite(300,260,1200,10);
  ground.x = ground.width /2;
  
//groups
  obstacleGroup =new Group();
  foodGroup =new Group();
  
  //monkey.debug = true;
  monkey.setCollider("circle",0,0,300);
  
 
}


function draw() {
  background(190);
  
  textSize(20);
  text("Survival Time: "+ score, 220,50);
  
  if(gameState === PLAY){
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
//space - jump
  if(keyDown("space") && monkey.y >= 150){
    monkey.velocityY = -13
  }
    
//scoring
   score =Math.ceil(frameCount/frameRate());
    
//monkey gravity
   monkey.velocityY = monkey.velocityY + 0.8
    
//obstacle
   spawnObstacle();
    
//food
   spawnFood();
    
    
   if(obstacleGroup.isTouching(monkey)){
      //trex.velocityY = -13
      gameState = END;
      }

    if(frameCount%500 === 0){
      ground.velocityX = ground.velocityX -2;
      obstacleGroup.velocityX = obstacleGroup.velocityX -2;
    }
    
  }else if(gameState === END){
    
    ground.velocityX = 0;
    monkey.velocityY = 0;
    
//set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    
//velocity 0
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
  }
  
//monkey collide ground
  monkey.collide(ground);
  
  
  
  
  
  drawSprites();
}

function spawnObstacle(){
  if(frameCount%300 === 0){
    obstacle = createSprite(600,235);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -6;
//assign scale and lifetime to the obstacle           
    obstacle.scale = 0.15;
    obstacle.lifetime = 300;
    
//add each obstacle to the group
    obstacleGroup.add(obstacle);
    //obstacle.debug = true;
  }

}

function spawnFood(){
  if(frameCount%80 === 0){
    banana = createSprite(600,Math.round(random(120,200)));
    banana.addImage(bananaImage);
    banana.velocityX = -6;
//assign scale and lifetime to the banana           
    banana.scale = 0.08;
    banana.lifetime = 300;
    
//add each obstacle to the group
    foodGroup.add(banana);
  }
}




