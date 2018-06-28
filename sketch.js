/**
 * 
 * @author hadley31
 * 
 */

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
let selector;
let solver;
let sudokuDrawBounds;

function setup()
{
	createCanvas(CANVAS_WIDTH,  CANVAS_HEIGHT);

	numSelectSize = 50;

	sudoku = new Sudoku (TEST_SUDOKU);

	selector = new RadialSelector (sudoku, 100);

	solver = new BruteSolver (sudoku);

	sudokuDrawBounds = new StretchDrawBounds (10, 10, 10, 10);
}

function draw ()
{
	background(51);

	drawSudoku(sudoku, sudokuDrawBounds);
	drawSelector (selector);

	if (solver.enabled && !solver.isCompleted ())
	{
		for (let i = 0; i < 300; i++)
		{
			solver.step ();
		}
	}
}



function mousePressed()
{
	selector.setPosition (mouseX, mouseY);
	selector.show ();
	return false;
}

function mouseReleased()
{
	selector.hide ();
	selector.push ();

	return false;
}


function keyPressed()
{
	switch (keyCode)
	{
		case 32:
			if (solver.enabled)
			{
				solver.pause ();
			}
			else
			{
				solver = new BruteSolver (sudoku);
				solver.start ();
			}
			break;
	}
}



function drawSudoku (s, drawBounds)
{
	let x = drawBounds.getX ();
	let y = drawBounds.getY ();
	let size = drawBounds.getWidth ();

	let cellSize = size / 9.0;


	// Draw small lines

	stroke (100);
	strokeWeight(1);

	for (let i = 1; i < 9; i += 3)
	{
		// horizontal
		line (x, y + cellSize * i, x + size, y + cellSize * i);
		line (x, y + cellSize * (i + 1), x + size, y + cellSize * (i + 1));

		// vertical
		line (x + cellSize * i, y, x + cellSize * i, y + size);
		line (x + cellSize * (i + 1), y, x + cellSize * (i + 1), y + size);
	}

	// Draw large lines

	stroke (0);
	strokeWeight (3);

	for (let i = 0; i <= 9; i += 3)
	{
		// horizontal
		line (x, y + cellSize * i, x + size, y + cellSize * i);

		// vertical
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
			let val = s.getValue (index(i,  j));
			if (val > 0)
			{
				let tx = x + (i + 0.5) * cellSize;
				let ty = y + (j + 0.5) * cellSize;
				text (val, tx, ty);
			}
		}
	}
}

function drawSelector (s)
{
	if (s)
	{
		s.draw ();
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

function getCellX (px)
{
	return floor((px - sudokuDrawBounds.getX()) / sudokuDrawBounds.getWidth() * 9);
}

function getCellY (py)
{
	return floor((py - sudokuDrawBounds.getY()) / sudokuDrawBounds.getHeight() * 9);
}