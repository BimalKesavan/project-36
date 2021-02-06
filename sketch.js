var dog,sadDog,happyDog;
var restockButton,feedButton;
var foodobj;
var feed,addFood;
var foodS=1;
var database;
var lastFed

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  database = firebase.database();
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  foodobj=new Food();

}

function draw() {
  background(46,139,87);
  var feedTimeRef=database.ref('lastFed');
  feedTimeRef.on("value",(data)=>{
    lastFed = data.val();
  })
  console.log(lastFed);
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : 12 AM",350,30)
  }else if(lastFed==0){
    text("Last Feed : 12 AM",350,30)
  }else{
    text("Last Feed : "+ lastFed + " AM", 350,30);
  }
  foodobj.display();
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodobj.updateFoodStock(foodS);
}
//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  if(foodobj.getFoodStock()<= 0){
   foodobj.updateFoodStock(foodobj.getFoodStock()*0)
  }else{
    foodobj.updateFoodStock(foodobj.getFoodStock()-1)
  }
  database.ref('/').update({ food:foodobj.getFoodStock(), lastFed:hour() })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}


