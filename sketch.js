var PLAY = 1;
var END = 0;
var Cgroup,Ogroup;

var gameState = PLAY;
var trex,trexrunning;
var ground,groundimage;
var cloud,cloudimage;
var obstacle,obs1;
var obstacle,obs2;
var obstacle,obs3;
var obstacle,obs4;
var obstacle,obs5;
var obstacle,obs6;
var trex,trexcollided;
var go,gameover;
var re,restart;
var score=0;
var highscore=0;
var jump,die,checkpoint;

function preload(){
  trexrunning=loadAnimation("trex1.png","trex3.png","trex4.png");
  groundimage=loadImage("ground2.png");
  cloudimage=loadImage("cloud.png");
  obs1=loadImage("obstacle1.png");
  obs2=loadImage("obstacle2.png");
  obs3=loadImage("obstacle3.png");
  obs4=loadImage("obstacle4.png");
  obs5=loadImage("obstacle5.png");
  obs6=loadImage("obstacle6.png");
  trexcollided=loadImage("trex_collided.png")
  gameoveri=loadImage("gameOver.png");
  restarti=loadImage("restart.png");
  jump=loadSound("jump.mp3");
  die=loadSound("die.mp3");
  checkpoint=loadSound("checkPoint.mp3");
    }


function setup() {
  createCanvas(600, 200);
  trex=createSprite(200,180,20,20);
  trex.addAnimation("trex",trexrunning);
  trex.addAnimation("trexcollided",trexcollided);
  trex.scale=0.5;
  trex.x=50;
  ground=createSprite(200,180,400,20);
  ground.addImage("ground",groundimage);
  ground.x=ground.width/2;
  
  iground=createSprite(200,185,400,5);
  Ogroup = new Group();
  Cgroup = new Group();
  gameover=createSprite(300,100,10,10);
  gameover.addImage(gameoveri);
  gameover.scale=0.5;
  restart=createSprite(300,150,10,10);
  restart.addImage(restarti);
  restart.scale=0.5;
  gameover.visible=false;
  restart.visible=false;
  }




function draw() {
  background("white");
  text("SCORE=" + score,450,50);
  text("High Score=" + highscore,350,50);
  iground.visible=false;
    trex.collide(iground);
  
  if(gameState === PLAY){
     ground.velocityX=-3;
  if(ground.x<0){
    ground.x=ground.width/2;
  }
    score=score+Math.round(getFrameRate()/60);
    if(score>0 && score%100==0){
      checkpoint.play();
    }
  if(keyDown("space") && trex.y>=159){
   trex.velocityY=-12; 
    jump.play();
     }
    trex.velocityY=trex.velocityY+1;
    spawnclouds();
    spawnobstacles();
     if(trex.isTouching(Ogroup)){
    gameState = END;
    die.play();
  }
    
   }
  else if(gameState === END){
    ground.velocityX=0;
    trex.velocityY=0;
    Ogroup.setVelocityXEach(0);
    Cgroup.setVelocityXEach(0);
    Ogroup.setLifetimeEach(-1);
    Cgroup.setLifetimeEach(-1);
    trex.changeAnimation("trexcollided",trexcollided);
    gameover.visible=true;
    restart.visible=true;
  }
  if(mousePressedOver(restart)){
   gameState=PLAY;
    Ogroup.destroyEach();
    Cgroup.destroyEach();
    gameover.visible=false;
    restart.visible=false;
    trex.changeAnimation("trex",trexrunning);
    if(highscore<score){
     highscore=score; 
    }
    score=0;
  }
 
 
  
 // console.log(trex.y);
  drawSprites();
}
function spawnclouds(){
  if(World.frameCount % 60 == 0){
  var cloud = createSprite(600,120,40,10);
    cloud.addImage("cloud",cloudimage);
    cloud.scale=0.5;
    cloud.y=random(80,120);
    cloud.velocityX=-4;
    cloud.depth=trex.depth;
    trex.depth=trex.depth+1;
    Cgroup.add(cloud);
  }
}
function spawnobstacles() {
  if(World.frameCount % 60 === 0){
    
  var obstacle= createSprite(600,165,10,40);
  obstacle.velocityX=-6;
  var rand = Math.round(random(1,6));
  switch(rand){
    case 1: obstacle.addImage(obs1);
      break;
    case 2: obstacle.addImage(obs2);
      break;
    case 3: obstacle.addImage(obs3);
      break;
    case 4: obstacle.addImage(obs4);
      break;
    case 5: obstacle.addImage(obs5);
      break;
    case 6: obstacle.addImage(obs6);
      break;
      default: break;
  }
  obstacle.scale=0.5;
  obstacle.lifetime = 120;
    Ogroup.add(obstacle);
  }
}
    
  