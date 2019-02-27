var cvs = document.getElementById('canvas');
cvs.style.backgroundColor = "black";
var ctx = canvas.getContext('2d');
var dir = "right";
var snakeW = 10;
var snakeH = 10;
var newHead;
var up = document.getElementById('up');
var left = document.getElementById('left');
var right = document.getElementById('right');
var down = document.getElementById('down');
function drawSnake(x,y){
  ctx.fillStyle = "red";
  ctx.fillRect(x*snakeW,y*snakeW,snakeW,snakeH);
  ctx.fillStyle = "black";
  ctx.strokeRect(x*snakeW,y*snakeW,snakeW,snakeH);
}

//create snake
var len = 4;
snake = [];
for(var i=len-1;i>=0;i--){
  snake.push({
    x:i,
    y:0
  })
}


left.onclick = function(){
  if (dir!="right") {
    dir="left";
  }
}
right.onclick = function(){
  if (dir!="left") {
    dir="right";
  }
}
up.onclick = function(){
  if (dir!="down") {
    dir="up";
  }
}
down.onclick = function(){
  if (dir!="up") {
    dir="down";
  }
}
document.addEventListener("keydown",dirControl);
function dirControl(e){
  if((e.keyCode==37 || left.clicked == true)&& dir!="right"){dir="left"}
  else if((e.keyCode==38 || up.clicked == true) && dir!="down"){dir="up"}
  else if((e.keyCode==39 || right.clicked == true)&& dir!="left"){dir="right"}
  else if((e.keyCode==40 || down.clicked == true)&& dir!="up"){dir="down"}
}

//create food

var food = {
  x:Math.round(Math.random()*(cvs.width/snakeW-1)),
  y:Math.round(Math.random()*(cvs.height/snakeH-1))
}
function drawFood(x,y){
  ctx.fillStyle = "yellow";
  ctx.fillRect(x*snakeW,y*snakeW,snakeW,snakeH);
  ctx.fillStyle = "black";
  ctx.strokeRect(x*snakeW,y*snakeW,snakeW,snakeH);
}

function draw(){
  ctx.clearRect(0,0,cvs.width,cvs.height);
  for(var i=0;i<snake.length;i++){
    var X = snake[i].x;
    var Y = snake[i].y;
    drawSnake(X,Y);
  }
  drawFood(food.x,food.y);

  //snake head
  var snakeX = snake[0].x;
  var snakeY = snake[0].y;



  if(snakeX<0){snakeX = cvs.width/snakeW} //
  else if(snakeY<0){snakeY = cvs.height/snakeH}
  else if(snakeX>cvs.width/snakeW){snakeX = 0}
  else if(snakeY>cvs.height/snakeH){snakeY = 0}

  if(dir=="right"){snakeX++}
  else if(dir=="left"){snakeX--}
  else if(dir=="up"){snakeY--}
  else if(dir=="down"){snakeY++}



  if(snakeX==food.x && snakeY==food.y){

    food = {
      x:Math.round(Math.random()*(cvs.width/snakeW-1)),
      y:Math.round(Math.random()*(cvs.height/snakeH-1))
    }
    newHead = {
      x: snakeX,
      y: snakeY
    }
  } else{
    snake.pop();
    //new head
    newHead = {
      x: snakeX,
      y: snakeY
    }
  }
  snake.unshift(newHead);
}
setInterval(draw,100);
// if (snakeX == 0 && snakeY == 0) {
//   clearInterval(draw);
//   alert("Game Over");
// }
