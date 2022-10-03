
var streams = [];
var symbolSize = 26;
var live = false;
var f = 333;
var control = false;
var singleRunCheck = false;
var frameCheck;
function setup(){
  createCanvas(
    window.innerWidth,
    window.innerHeight
  );
  background(0);

  for (var x =0; x <= width; x = x + symbolSize ){
    var stream = new Stream();
    stream.generateSymbols(x, random(-1000, 0));
    streams.push(stream);
  }
  fill(0, 255, 70)
  textSize(18)
  text("Wake Up, Neo...", 100, 100);
  textSize(symbolSize);
}

function keyPressed(key){
  console.log(key.key);
  if(key.key == 'Control'){
    control = true;
    frameCheck = frameCount;
  }
  else if (key.key == 'x' && control == true && frameCheck+40 > frameCount) {
    control = false;
    live = true;
  }
  else{
    control = false;
  }
  if (key.key == 'Enter'){
    live = true;
  }
  if (key.key == 'Escape'){
    live = false;
    streams = [];
    setup();
  }
}

function draw(){

if (live == true){
  background(15, 150);
  fill(0, 255, 60);
  streams.forEach(
    function(stream){
      stream.render();
    });
  }
}

function _Symbol(x, y, speed, first){
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.switchInterval = round(random(2, 20));
  this.first = first;
  this.setRandomSymbol = function(){
    if (frameCount % this.switchInterval == 0){
      chance = round(random(0,106));
      if (chance <= 96){
        this.value = String.fromCharCode(0x30A0 + chance);
      }
      else{
        this.value = chance%97;
      }
    }
  }

  this.rain = function(){
    this.y = (this.y >= height) ? 0 : this.y += this.speed;
  }
}

function Stream(){
  this.symbols = [];
  this.totalSymbols = round(random(height/symbolSize/2, height/symbolSize));
  this.speed = random(4, 20);

  this.generateSymbols = function(x, y){
    var first = (round(random(0, 3)) == 0);
    for (var i =0; i <= this.totalSymbols; i++){
      symbol = new _Symbol(x, y, this.speed, first);
      symbol.setRandomSymbol();
      this.symbols.push(symbol);
      y -= symbolSize;
      first = false;
    }
  }
  this.render = function(){
    i = 0;
    this.symbols.forEach(function(symbol){
      if (symbol.first == true){
          fill(180, 255, 220);
      }
      else{
        fill(0, 255, 70)
      }
      text(symbol.value, symbol.x, symbol.y);
      symbol.rain();
      symbol.setRandomSymbol();
      i ++;
    });
  }
}
