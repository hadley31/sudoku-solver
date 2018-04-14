const WIDTH = 550;
const HEIGHT = 700;

const SQUARE_SIZE = WIDTH / 9;

const test_sudoku = [
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

let values = [];


let currentIndex = 0;
let indicies = [];


function setup() 
{
	createCanvas(WIDTH,  HEIGHT);

	loadSudoku (test_sudoku);
}

function draw ()
{
	background(51);

	drawBoard ();
	drawNumbers ();
}


function drawBoard ()
{
	stroke (100);
	strokeWeight(1);

	for (let i = 1; i <= 8; i++)
	{
		let y = SQUARE_SIZE * i;

		line (0,  y,  WIDTH,  y);
	}

	for (let i = 1; i <= 8; i++)
	{
		let x = SQUARE_SIZE * i;

		line (x,  0,  x,  WIDTH);
	}

	stroke (0);
	strokeWeight(5);

	for (let i = 1; i <= 2; i++)
	{
		let y = SQUARE_SIZE * i * 3;

		line (0,  y,  WIDTH,  y);
	}

	for (let i = 1; i <= 2; i++)
	{
		let x = SQUARE_SIZE * i * 3;

		line (x,  0,  x,  WIDTH);
	}
}

function drawNumbers ()
{
	for (let i = 0; i < 9; i++)
	{
		for (let j = 0; j < 9; j++)
		{
			let s = getValue (i,  j);
			if (s > 0)
			{
				strokeWeight (1);

				textSize(SQUARE_SIZE * 0.7);
				textAlign(CENTER, CENTER);

				let px = getPixelX (i);
				let py = getPixelY (j);

				text (s,  px + SQUARE_SIZE / 2, py + SQUARE_SIZE / 2);
			}
		}
	}
}

function getPixelX (x)
{
	return x * SQUARE_SIZE;
}

function getPixelY (y)
{
	return y * SQUARE_SIZE;
}