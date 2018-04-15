const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 700;

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

	sudoku = new Sudoku (TEST_SUDOKU);
}

function draw ()
{
	background(51);

	sudoku.show (100, 100, 500, 500);
}