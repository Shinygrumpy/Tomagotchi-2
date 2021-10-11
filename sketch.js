var dog, happyDog
var database
var foodS, foodStock
var dogg

var feed
var addFood
var foodObj

function preload()
{

 dog = loadImage("dogImg.png");
 happyDog = loadImage("dogImg1.png");

}

function setup() 
{
	createCanvas(500,500);  

  database = firebase.database();

  foodObj = new Food()

  dogg = createSprite(250,250,10,10);
  dogg.addImage(dog);
  dogg.scale = 0.15

  feed = createButton("feed the dog")
  feed.position(500,95)
  feed.mousePressed(feedDogg)

  addFoods = createButton("add food")
  addFoods.position(600,95)
  addFoods.mousePressed(addFood)

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
 
}


function draw() {  
  background("green")
  
  foodObj.display()

  drawSprites();
  
  

}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS)
} 

function addFood(){
  foodS++
  database.ref('/').update({
    Food : foodS
  })
}

function feedDogg(){
  dogg.addImage(happyDog)
  if(foodObj.getFoodStock() <= 0){
   foodObj.updateFoodStock(foodObj.getFoodStock()*0)
  }
  else{
   foodObj.updateFoodStock(foodObj.getFoodStock()-1) 
  }
  database.ref('/').update({
    Food : foodObj.getFoodStock()
  })
}



