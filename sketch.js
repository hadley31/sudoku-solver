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

function setup() 
{
	createCanvas(CANVAS_WIDTH,  CANVAS_HEIGHT);

	sudoku = new Sudoku (100, 100, 700, TEST_SUDOKU);
	numSelectSize = 100;
}

function draw ()
{
	background(51);

	showSudoku(sudoku);
	showNumSelect ();
}



function mousePressed()
{
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



function showSudoku (s)
{
	let cellSize = s.size / 9.0;


	// Draw small lines

	stroke (100);
	strokeWeight(1);

	for (let i = 1; i < 9; i += 3)
	{
		// Draw horizontal lines
		line (s.x, s.y + cellSize * i, s.x + s.size, s.y + cellSize * i);
		line (s.x, s.y + cellSize * (i + 1), s.x + s.size, s.y + cellSize * (i + 1));

		// Draw vertical lines
		line (s.x + cellSize * i, s.y, s.x + cellSize * i, s.y + s.size);
		line (s.x + cellSize * (i + 1), s.y, s.x + cellSize * (i + 1), s.y + s.size);
	}

	// Draw large lines

	stroke (0);
	strokeWeight (3);

	for (let i = 0; i <= 9; i += 3)
	{
		// Draw horizontal line
		line (s.x, s.y + cellSize * i, s.x + s.size, s.y + cellSize * i);

		// Draw vertical line
		line (s.x + cellSize * i, s.y, s.x + cellSize * i, s.y + s.size);
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
				let tx = s.x + (i + 0.5) * cellSize;
				let ty = s.y + (j + 0.5) * cellSize;
				text (val, tx, ty);
			}
		}
	}
}





let numSelectX = 0;
let numSelectY = 0;
let numSelectSize;
let numSelectEnabled = false;

let numSelected = 0;

function revealNumSelect ()
{
	numSelectEnabled = true;
}

function hideNumSelect ()
{
	numSelectEnabled = false;
}

function showNumSelect ()
{
	if (!numSelectEnabled)
		return;

	textAlign(CENTER, CENTER);

	fill (100, 100, 100, 100);
	ellipse(numSelectX, numSelectY, numSelectSize * 2);

	stroke (0);
	strokeWeight (3);

	let mouseDistance = dist (mouseX, mouseY, numSelectX, numSelectY);
	let mouseAngle = normAngle(atan2 (mouseY - numSelectY, mouseX - numSelectX));

	let length = min (numSelectSize, mouseDistance);

	let x2 = numSelectX + length * cos (mouseAngle);
	let y2 = numSelectY + length * sin (mouseAngle);

	line (numSelectX, numSelectY, x2, y2);

	let newSelect = -1;

	for (let i = 0; i < 10; i++)
	{
		let angle = normAngle(map (i * TWO_PI / 10, 0, TWO_PI, -HALF_PI, 3 * HALF_PI));

		let tx = numSelectX + numSelectSize * cos(angle);
		let ty = numSelectY + numSelectSize * sin(angle);

		let tSize;

		if (length > numSelectSize * 0.7 && abs (mouseAngle - angle) < TWO_PI / 20)
		{
			newSelect = i;

			fill (200);
			tSize = numSelectSize * 0.7;
		}
		else
		{
			fill (150);
			tSize = numSelectSize * 0.4;
		}

		textSize(tSize);
		text (i, tx, ty);
	}

	numSelected = newSelect;
}

function selectNumber ()
{
	if (numSelected == -1)
		return;

	let cellX = sudoku.getCellX (numSelectX);
	let cellY = sudoku.getCellY (numSelectY);

	sudoku.setValue (cellX, cellY, numSelected);
}

function setNumSelectPosition (x, y)
{
	numSelectX = x;
	numSelectY = y;
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