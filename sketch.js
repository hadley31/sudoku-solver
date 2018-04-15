const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 900;

const TEST_SUDOKU = [
	6, 0, 9, 0, 0, 8, 3, 0, 2, 
	0, 5, 0, 6, 2, 0, 7, 0, 0, 
	0, 0, 7, 9, 0, 0, 0, 0, 0, 
	5, 0, 0, 0, 1, 0, 2, 6, 0, 
	0, 6, 0, 0, 0, 5, 0, 0, 0, 
	7, 0, 0, 0, 0, 2, 0, 0, 0, 
	9, 7, 6, 0, 0, 0, 0, 0, 1, 
	4, 1, 5, 0, 0, 0, 6, 3, 7, 
	2, 0, 0, 0, 0, 0, 5, 9, 4
];


let sudoku;
let numSelect;

function setup() 
{
	createCanvas(CANVAS_WIDTH,  CANVAS_HEIGHT);

	sudoku = new Sudoku (100, 100, 700, TEST_SUDOKU);
	numSelect = new NumberSelectWheel (85);
}

function draw ()
{
	background(51);

	sudoku.show ();
	numSelect.show();
}



function mousePressed()
{
	numSelect.setPosition (mouseX, mouseY);
	numSelect.reveal();
	return false;
}

function mouseReleased()
{
	numSelect.select();
	numSelect.hide();
	return false;
}


class NumberSelectWheel
{
	constructor (size)
	{
		this.x = 0;
		this.y = 0;
		this.size = size;
		this.enabled = false;
	}
}

NumberSelectWheel.prototype.reveal = function ()
{
	this.enabled = true;
};

NumberSelectWheel.prototype.hide = function ()
{
	this.enabled = false;
};

NumberSelectWheel.prototype.show = function ()
{
	if (!this.enabled)
		return;

	textAlign(CENTER, CENTER);

	fill (100, 100, 100, 100);
	ellipse(this.x, this.y, this.size * 2);

	stroke (0);
	strokeWeight (3);
	line (this.x, this.y, mouseX, mouseY);

	for (let i = 0; i < 10; i++)
	{
		let angle = i * TWO_PI / 10;

		let tx = this.x + this.size * sin(angle);
		let ty = this.y - this.size * cos(angle);

		let d = dist(mouseX, mouseY, tx, ty);

		textSize(this.size - clamp (d, 0, this.size / 2));
		text (i, tx, ty);
	}

};

NumberSelectWheel.prototype.setPosition = function (x, y)
{
	this.x = x;
	this.y = y;
};

NumberSelectWheel.prototype.select = function ()
{
	print ("select");
};

function clamp (a, min, max)
{
	if (a < min)
		return min;
	if (a > max)
		return max;
	return a;
}