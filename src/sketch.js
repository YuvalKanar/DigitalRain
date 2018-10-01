// TODO: add ghosting effect instead of "raining". [https://en.wikipedia.org/wiki/Matrix_digital_rain#/media/File:Digital_rain_animation_medium_letters_shine.gif]
var fontsize = 20;
var gap = 25;

var DefaultTTL = 20; 

function setup() {
  // Function runs once when the page is loaded

  createCanvas(
    window.innerWidth,
    window.innerHeight
  );
  background(0);

  frameRate(10);

  textSize(fontsize);
}

var charStreams = [];
function draw() {
  // Function runs once each frame

  background(0);

  // Add stream based on random
  if (round(random(0, 2)) !== 1) {
    var x = round(random(gap, width - gap));
    var newCharStream = new CharStream(x, 0);
    newCharStream.init();
    charStreams.push(
      newCharStream
    );
  }
  for (var i = 0, len = charStreams.length; i < len; i++) {
    if (charStreams[i].isOutOfScreen()) {
      charStreams.splice(i, 1);
      len = charStreams.length;
    }
  }

  for (i = 0, len = charStreams.length; i < len; i++) {
    if (charStreams[i].isOutOfScreen() === false) {
      charStreams[i].render();
    }
  }
}

function Symbol(x, y) {
  this.x = x;
  this.y = y;
  this.value = 0;

  // Value representing symbol's time to live
  this.ttl = 0;

  // Colors
  this.r = 0;
  this.g = 250;
  this.b = 70;

  this.size = 0;

  // Symbol initialization method
  this.init = function(size) {
    this.setToRandomSymbol();
    this.ttl = DefaultTTL;
    this.size = size;
  };

  // Method sets the symbol to a random katakana character
  this.setToRandomSymbol = function() {
    this.value = String.fromCharCode(
      // Setting letter using katakana unicode values
      0x30A0 + round(random(0, 0x30F5 - 0x30A0))
    );
  };

  // Method sets the symbols rgb values
  this.setColor = function(r,g,b) {
    this.r = r;
    this.g = g;
    this.b = b;
  };

  // Method adds a given value to the y coordinate of the symbol
  this.addY = function(val) {
    this.y += val;
  };

  // Method returns the x value of the symbol
  this.getX = function() {
    return this.x;
  };

  // Method renders the symbol on the screen
  this.render = function() {
    // Randomize symbol
    if (round(random(0, 3)) === 1) {
      this.setToRandomSymbol();
    }

    if (this.ttl < 10) {
      if (this.r > 0) {
        this.r -= 10;
      }
      if (this.g > 0) {
        this.g -= 10;
      }
      if (this.b > 0) {
        this.b -= 10;
      }
    }

    textSize(this.size);

    fill(
      this.r,
      this.g,
      this.b
    );

    text(this.value, this.x, this.y);
    this.ttl -= 1;
  };

  // Method returns whether the symbol has faded out
  this.isOut = function() {
    return this.r === 0 && this.g === 0 && this.b === 0;
  };

}

function CharStream(x, y) {
  this.x = x;
  this.y = y;
  this.lengthLeft = 0;
  this.symbols = [];

  this.size = 0;

  // Stream initiation method
  this.init = function() {
    // Randomizing stream length
    this.lengthLeft = round(random(20, 40));

    this.size = round(random(8, 20));

    // Add first symbol
    var symbol = new Symbol(x, this.y + gap);
    symbol.init(this.size);
    symbol.setToRandomSymbol();
    symbol.setColor(250, 250, 250);
    this.symbols.push(symbol);
    this.y += gap;
  };

  // Stream Rendering method
  this.render = function() {
    this.symbols.forEach(function(symbol) {
      symbol.render();
    });

    if (this.lengthLeft > 1) {
      var symbol = new Symbol(x, this.y + gap);
      symbol.init(this.size);
      symbol.setToRandomSymbol();
      symbol.setColor(250, 250, 250);
      this.symbols[this.symbols.length - 1].setColor(0, 250, 70);
      this.symbols.push(symbol);


      this.lengthLeft -= 1;
      this.y += gap;
    } else if (this.lengthLeft === 1) {
      this.lengthLeft = 0;
      this.symbols[this.symbols.length - 1].setColor(0, 250, 70);
    }
  };

  // Function returns true if all symbols in the stream are out
  this.isOutOfScreen = function() {
    return this.symbols[this.symbols.length - 1].isOut();
  };
}
