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


let sudokuX = 100;
let sudokuY = 100;
let sudokuSize = 700;
let sudoku;

function setup() 
{
	createCanvas(CANVAS_WIDTH,  CANVAS_HEIGHT);

	sudoku = new Sudoku (TEST_SUDOKU);
	numSelectSize = 100;
}

function draw ()
{
	background(51);

	showSudoku(sudoku, sudokuX, sudokuY, sudokuSize);
	showNumSelect ();
}



function mousePressed()
{
	print ("sketch");
	setNumSelectPosition (mouseX, mouseY);
	revealNumSelect ();
	return false;
}

function mouseReleased()
{
	selectNumber ();
	hideNumSelect ();
	return false;
}



function showSudoku (s, x, y, size)
{
	let cellSize = size / 9.0;


	// Draw small lines

	stroke (100);
	strokeWeight(1);

	for (let i = 1; i < 9; i += 3)
	{
		// Draw horizontal lines
		line (x, y + cellSize * i, x + size, y + cellSize * i);
		line (x, y + cellSize * (i + 1), x + size, y + cellSize * (i + 1));

		// Draw vertical lines
		line (x + cellSize * i, y, x + cellSize * i, y + size);
		line (x + cellSize * (i + 1), y, x + cellSize * (i + 1), y + size);
	}

	// Draw large lines

	stroke (0);
	strokeWeight (3);

	for (let i = 0; i <= 9; i += 3)
	{
		// Draw horizontal line
		line (x, y + cellSize * i, x + size, y + cellSize * i);

		// Draw vertical line
		line (x + cellSize * i, y, x + cellSize * i, y + size);
	}


	// Draw numbers

	fill (170);
	strokeWeight (3);

	textSize(cellSize * 0.8);
	textAlign(CENTER, CENTER);

	for (let i = 0; i < 9; i++)
	{
		for (let j = 0; j < 9; j++)
		{
			let val = s.getValue (i,  j);
			if (val > 0)
			{
				let tx = x + (i + 0.5) * cellSize;
				let ty = y + (j + 0.5) * cellSize;
				text (val, tx, ty);
			}
		}
	}
}

function clamp (a, min, max)
{
	if (a < min)
		return min;
	if (a > max)
		return max;
	return a;
}

function normAngle (a)
{
	return (a + TWO_PI) % TWO_PI;
}

function getCellX (x, s, px)
{
	return floor((px - x) / s * 9);
}

function getCellY (y, s, py)
{
	return floor((py - y) / s * 9);
}