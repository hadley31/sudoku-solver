

function selectNumber ()
{
	if (numSelected == -1)
		return;

	let cellX = getCellX (sudokuX, sudokuSize, numSelectX);
	let cellY = getCellY (sudokuY, sudokuSize, numSelectY);

	sudoku.setValue (index(cellX, cellY), numSelected);
}

function normAngle (a)
{
	return (a + TWO_PI) % TWO_PI;
}

class RadialSelector
{
	constructor (sudoku, size)
	{
		this.sudoku = sudoku;
		this.x = 0;
		this.y = 0;
		this.size = size;

		this.enabled = false;

		this.selectedIndex = -1;
		this.selectedValue = 0;
	}

	show ()
	{
		this.enabled = true;
	}

	hide ()
	{
		this.enabled = false;
	}

	draw ()
	{
		if (!this.enabled)
			return;

		textAlign(CENTER, CENTER);

		stroke (0);
		strokeWeight (2);

		fill (100, 100, 100, 100);
		ellipse(this.x, this.y, this.size * 2);

		let mouseDistance = dist (mouseX, mouseY, this.x, this.y);
		let mouseAngle = normAngle(atan2 (mouseY - this.y, mouseX - this.x));

		let length = min (this.size, mouseDistance);

		let x2 = this.x + length * cos (mouseAngle);
		let y2 = this.y + length * sin (mouseAngle);

		line (this.x, this.y, x2, y2);

		let value = -1;

		for (let i = 0; i < 10; i++)
		{
			let angle = normAngle(map (i * TWO_PI / 10, 0, TWO_PI, -HALF_PI, 3 * HALF_PI));

			let tx = this.x + this.size * cos(angle);
			let ty = this.y + this.size * sin(angle);

			let tSize;

			if (length > this.size * 0.7 && abs (mouseAngle - angle) < TWO_PI / 20)
			{
				value = i;

				fill (200);
				tSize = this.size * 0.7;
			}
			else
			{
				fill (150);
				tSize = this.size * 0.4;
			}

			textSize(tSize);
			text (i, tx, ty);
		}

		this.selectedValue = value;
	}

	setPosition (x, y)
	{
		this.x = x;
		this.y = y;

		this.selectedIndex = index (getCellX(x), getCellY(y));
	}

	push ()
	{
		this.sudoku.setValue (this.selectedIndex, this.selectedValue);
	}
}