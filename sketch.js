var fontsize = 20;
var gap = 25;

function setup() {
  // Function runs once when the page is loaded

  createCanvas(
    window.innerWidth,
    window.innerHeight
  );
  background(0);

  frameRate(10);

  symbol_stream = new CharStream(width / 2);
  symbol_stream.init();

  textSize(fontsize);
}

var charStreams = [];
function draw() {
  // Function runs once each frame

  background(0);

  // Add stream based on random
  if (round(random(0, 2)) !== 1) {
    var x = round(random(gap, width - gap));
    var newCharStream = new CharStream(x);
    newCharStream.init();
    charStreams.push(
      newCharStream
    );
  }

  charStreams.forEach(function(stream) {
    if (stream.isOutOfScreen()) {
      charStreams.splice(charStreams.indexOf(stream), 1);
    } else {
      stream.render();
    }
  });

}

function Symbol(x, y) {
  this.x = x;
  this.y = y;
  this.value = 0;

  // Colors
  this.r = 0;
  this.g = 250;
  this.b = 70;

  this.setToRandomSymbol = function() {
    this.value = String.fromCharCode(
      // Setting letter using katakana unicode values
      0x30A0 + round(random(0, 0x30F5 - 0x30A0))
    );
  };

  this.setColor = function(r,g,b) {
    this.r = r;
    this.g = g;
    this.b = b;
  };

  this.addY = function(val) {
    this.y += val;
  };

  this.getX = function() {
    return this.x;
  };

  this.render = function() {
    fill(
      this.r,
      this.g,
      this.b
    );

    text(this.value, this.x, this.y);
  };

}

function CharStream(x) {
  this.x = x;
  this.lengthLeft = 0;
  this.symbols = [];

  this.init = function() {
    // Randomizing stream length
    this.lengthLeft = round(random(5, 14));

    // Add first symbol
    var symbol = new Symbol(x, 0 + gap);
    symbol.setToRandomSymbol();
    symbol.setColor(250, 250, 250);
    this.symbols.push(symbol);
  };

  this.render = function() {
    this.symbols.forEach(function(symbol) {
      symbol.render();
      symbol.addY(gap);
    });

    if (this.lengthLeft !== 0) {
      var symbol = new Symbol(x, 0 + gap);
      symbol.setToRandomSymbol();
      symbol.setColor(0, 250, 70);
      this.symbols.push(symbol);

      this.lengthLeft -= 1;
    }

    if (round(random(0,1)) === 1) {
      var index = round(random(0, this.symbols.length - 1));
      this.symbols[index].setToRandomSymbol();
    }
  };

  this.isOutOfScreen = function(){
    if (this.symbols[this.symbols.length - 1].getX() > height) {
      return true;
    }
    return false;
  }
}
