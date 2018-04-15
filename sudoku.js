
class Sudoku
{
	constructor (arr)
	{
		if (arr)
		{
			this.values = arr;
		}
		else
		{
			this.values = [];
		}
	}
}



Sudoku.prototype.getValue = function (x,  y)
{
	return this.values[getIndex (x,  y)];
};

Sudoku.prototype.setValue = function(x,  y,  val)
{
	this.values[getIndex (x,  y)] = val;
};

Sudoku.prototype.getRow = function (n)
{
	n = getY (n);

	let arr = [];

	for (let i = 0; i < 9; i++)
	{
		arr.push (getValue (i,  n));
	}

	return arr;
}


Sudoku.prototype.getCol = function (n)
{
	n = getX (n);

	let arr = [];

	for (let i = 0; i < 9; i++)
	{
		arr.push (getValue (n,  i));
	}

	return arr;
};

Sudoku.prototype.getBox = function (n)
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
};

Sudoku.prototype.testValue = function (i, n)
{
	return values[i] == 0 && 
		!contains (this.getBox (i), n) && 
		!contains (this.getRow (i), n) && 
		!contains (this.getCol (i), n);
};

Sudoku.prototype.show = function (x, y, s)
{
	let size = s / 9.0;


	// Draw small lines

	stroke (100);
	strokeWeight(1);

	for (let i = 1; i < 9; i += 3)
	{
		// Draw horizontal lines
		line (x, y + size * i, x + s, y + size * i);
		line (x, y + size * (i + 1), x + s, y + size * (i + 1));

		// Draw vertical lines
		line (x + size * i, y, x + size * i, y + s);
		line (x + size * (i + 1), y, x + size * (i + 1), y + s);
	}

	// Draw large lines

	stroke (0);
	strokeWeight (3);

	for (let i = 0; i <= 9; i += 3)
	{
		// Draw horizontal line
		line (x, y + size * i, x + s, y + size * i);

		// Draw vertical line
		line (x + size * i, y, x + size * i, y + s);
	}


	// Draw numbers

	for (let i = 0; i < 9; i++)
	{
		for (let j = 0; j < 9; j++)
		{
			let s = sudoku.getValue (i,  j);
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
};




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