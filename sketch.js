var dog, dogImage, happyDog; 
var database;
var food, foodS, foodStock;

function preload(){
	dogImage = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup(){
  database = firebase.database();
  foodStock = database.ref("food");
  foodStock.on("value", readStock);
  createCanvas(500, 500);
  dog = createSprite(250,250);
  dog.addImage(dogImage);
  dog.scale =0.2; 
}

function draw(){
background(46, 139, 87);
    if(foodS!=undefined){
    if (keyWentDown(UP_ARROW)){
      
      writeStock(foodS)
      if(foodS>0){
        dog.addImage(happyDog);
      }
    }
    if(keyWentUp(UP_ARROW)){
      dog.addImage(dogImage);
    }
    textSize(20);
    fill("red");
    text("press Up arrow key to feed the dog", 100,50);

    text("food remaining : "+ foodS, 180,100);
    drawSprites();
  }
}

function readStock(data){
    foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref("/").update({
    food : x
  })
}

