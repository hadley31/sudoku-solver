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

	let cellX = getCellX (sudokuX, sudokuSize, numSelectX);
	let cellY = getCellY (sudokuY, sudokuSize, numSelectY);

	sudoku.setValue (cellX, cellY, numSelected);
}

function setNumSelectPosition (x, y)
{
	numSelectX = x;
	numSelectY = y;
}