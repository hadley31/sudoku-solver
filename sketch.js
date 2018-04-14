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

	solve_step ();

	drawBoard ();
	drawNumbers ();
}

function loadSudoku (arr)
{
	values = [];
	for (let i = 0; i < 81; i++)
	{
		values.push (arr[i]);
	}
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


function getValue (x,  y)
{
	return values[getIndex (x,  y)];
}

function setValue (x,  y,  val)
{
	values[getIndex (x,  y)] = val;
}

function getIndex (x,  y)
{
	if (x < 0 || x >= 9 || y < 0 || y >= 9)
	{
		return -1;
	}
	return x + 9 * y;
}

function getX (i)
{
	return floor(i % 9);
}

function getY (i)
{
	return floor(i / 9);
}

function getPixelX (x)
{
	return x * SQUARE_SIZE;
}

function getPixelY (y)
{
	return y * SQUARE_SIZE;
}

function getRow (n)
{
	n = getY (n);

	let arr = [];

	for (let i = 0; i < 9; i++)
	{
		arr.push (getValue (i,  n));
	}

	return arr;
}


function getCol (n)
{
	n = getX (n);

	let arr = [];

	for (let i = 0; i < 9; i++)
	{
		arr.push (getValue (n,  i));
	}

	return arr;
}

function getBox (n)
{
	let startX = floor(getX (n) / 3) * 3;
	let startY = floor(getY (n) / 3) * 3;

	let arr = [];

	for (let i = 0; i < 3; i++)
	{
		for (let j = 0; j < 3; j++)
		{
			arr.push (getValue (startX + j,  startY + i));
		}
	}

	return arr;
}

function contains (arr, n)
{
	for (let i = 0; i < arr.length; i++)
	{
		if (arr[i] == n)
		{
			return true;
		}
	}
	return false;
}

function solve_step ()
{
	
}

function getLastIndex ()
{
	if (indicies.length == 0)
		return 0;
	return indicies[indicies.length - 1];
}

function testValue (i, n)
{
	return values[i] == 0 && 
		!contains (getBox (i), n) && 
		!contains (getRow (i), n) && 
		!contains (getCol (i), n);
}