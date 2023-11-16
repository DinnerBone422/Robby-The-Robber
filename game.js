var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var cashGroup,diamondsGroup,jwelleryGroup,swordGroup;
var treasureCollection = 0;
var speed = 5;
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("./Assets/Road.png");
  boyImg = loadAnimation("./Assets/Runner-1.png","./Assets/Runner-2.png");
  cashImg = loadImage("./Assets/cash.png");
  diamondsImg = loadImage("./Assets/diamonds.png");
  jwelleryImg = loadImage("./Assets/jwell.png");
  swordImg = loadImage("./Assets/sword.png");
  endImg =loadAnimation("./Assets/gameOver.png");
}

function setup(){
  //Create the canvas
	canvasW = windowWidth/1.5;
	canvasH = windowHeight/1.5;
	var canvas = createCanvas(canvasW, canvasH);
	canvas.parent('Game');
	rectMode(CENTER);

  //create the path for the player to run on
  path=createSprite(width/2,200);
  path.addImage(pathImg);

  //Create the player
  boy = createSprite(width/2,height-20,20,20);
  boy.addAnimation("SahilRunning",boyImg);
  boy.scale=0.08;

  //Create the grou
  cashGroup=new Group();
  diamondsGroup=new Group();
  jwelleryGroup=new Group();
  swordGroup=new Group();
}

function draw() {
  if(gameState === PLAY) {
    background(0);
    path.velocityY = speed
    boy.x = World.mouseX;
    
    edges= createEdgeSprites();
    boy.collide(edges);
    
    //code to reset the background

    if(path.y > height ){
      path.y = height/2;
    }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashGroup.isTouching(boy)) {
      cashGroup.destroyEach();
      treasureCollection=treasureCollection + 50;
    }
    else if (diamondsGroup.isTouching(boy)) {
      diamondsGroup.destroyEach();
      treasureCollection=treasureCollection + 100;
      
    } else if (jwelleryGroup.isTouching(boy)) {
      jwelleryGroup.destroyEach();
      treasureCollection= treasureCollection + 150;
      
    } else {
      if (swordGroup.isTouching(boy)) {
        gameState=END;
        
        boy.addAnimation("SahilRunning",endImg);
        boy.x=width/2;
        boy.y=height/2;
        boy.scale=0.6;
        
        cashGroup.destroyEach();
        diamondsGroup.destroyEach();
        jwelleryGroup.destroyEach();
        swordGroup.destroyEach();
        
        cashGroup.setVelocityYEach(0);
        diamondsGroup.setVelocityYEach(0);
        jwelleryGroup.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);
      }
    }

    drawSprites();
    textSize(20);
    fill(255);
    text("Treasure: "+ treasureCollection,width-150,30);
  }

}

function createCash() {
  if (World.frameCount % 200 == 0) {
    var cash = createSprite(Math.round(random(50, width-50),40, 10, 10));
    cash.addImage(cashImg);
    cash.scale=0.12;
    cash.velocityY = speed;
    cash.lifetime = 200;
    cashGroup.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
    var diamonds = createSprite(Math.round(random(50, width-50),40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale=0.03;
    diamonds.velocityY = speed;
    diamonds.lifetime = 200;
    diamondsGroup.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
    var jwellery = createSprite(Math.round(random(50, width-50),40, 10, 10));
    jwellery.addImage(jwelleryImg);
    jwellery.scale=0.13;
    jwellery.velocityY = speed;
    jwellery.lifetime = 200;
    jwelleryGroup.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
    var sword = createSprite(Math.round(random(50, width-50),40, 10, 10));
    sword.addImage(swordImg);
    sword.scale=0.1;
    sword.velocityY = speed;
    sword.lifetime = 200;
    swordGroup.add(sword);
  }
}