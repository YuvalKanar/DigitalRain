var fontsize = 12;

function setup() {
    createCanvas(
        window.innerWidth,
        window.innerHeight
    );
    background(0);

    symbol = new Character(width / 2, height / 2);
    frameRate(1);
}

function draw() {
    background(0);
    symbol.setToRandomSymbol();
    symbol.render();
}


function Character(x, y) {
    this.x = x;
    this.y = y;
    this.value;

    this.setToRandomSymbol = function() {
        this.value = String.fromCharCode(
            // Setting using katakana unicode values
            0x30A0 + round(random(0, 0x30A0 - 0x30F6))
        );
    };

    this.render = function() {
        fill(0, 255, 70);
        text(this.value, this.x, this.y);
    };
}

function CharStream() {

}
