var readLine = require('readline');
var reader = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
});


function HanoiGame(){
  this.stacks = [
    [3, 2, 1],
    [],
    []
  ];
}

HanoiGame.prototype.isWon = function(){
  return (this.stacks[0].length === 0 && this.stacks[1].length === 0);
};

HanoiGame.prototype.isValidMove = function(startTowerIdx, endTowerIdx){
  var startStack = this.stacks[startTowerIdx];
  var endStack = this.stacks[endTowerIdx];

  if (startStack.length > 0) {
    if(endStack.length === 0) {
      return true;
    }
    else if(startStack[startStack.length - 1] <
          endStack[endStack.length - 1]) {
            return true;
    }
  } else {
      return false;
  }
};

HanoiGame.prototype.print = function(){
  console.log(JSON.stringify(this.stacks));
};

HanoiGame.prototype.move = function(startTowerIdx, endTowerIdx){
  var stacks = this.stacks;

  if(this.isValidMove(startTowerIdx, endTowerIdx)) {
    var stone = stacks[startTowerIdx].pop();
    stacks[endTowerIdx].push(stone);
    return true;
  }
  else {
    return false;
  }
};

HanoiGame.prototype.promptMove = function(callback){
  this.print();

  reader.question("Where do you want to start?", function(response1){
    reader.question("Move to?", function(response2){
      var startTowerIdx = response1;
      var endTowerIdx = response2;

      callback(startTowerIdx, endTowerIdx);
    });
  });
};

HanoiGame.prototype.run = function(completionCallback){
  var game = this;
  function callback(startTowerIdx, endTowerIdx) {
    if(!game.move(startTowerIdx, endTowerIdx)) {
      console.log("Invalid Move");
    }
    if(game.isWon()) {
      console.log("User has won.");
      completionCallback();
    } else {
      game.run(completionCallback);
    }
  }

  game.promptMove(callback);
};

var game = new HanoiGame();
game.run(function(){
  console.log("I'm done");
  reader.close();
});
