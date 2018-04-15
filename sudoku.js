
class Sudoku
{
	constructor (x, y, size, arr)
	{
		this.x = x;
		this.y = y;
		this.size = size;

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
		arr.push (this.getValue (i,  n));
	}

	return arr;
}


Sudoku.prototype.getCol = function (n)
{
	n = getX (n);

	let arr = [];

	for (let i = 0; i < 9; i++)
	{
		arr.push (this.getValue (n,  i));
	}

	return arr;
};

Sudoku.prototype.getBox = function (n)
{
	let startX = floor(this.getX (n) / 3) * 3;
	let startY = floor(this.getY (n) / 3) * 3;

	let arr = [];

	for (let i = 0; i < 3; i++)
	{
		for (let j = 0; j < 3; j++)
		{
			arr.push (this.getValue (startX + j,  startY + i));
		}
	}

	return arr;
};

Sudoku.prototype.getCellX = function (px)
{
	return floor((px - this.x) / this.size * 9);
};

Sudoku.prototype.getCellY = function (py)
{
	return floor((py - this.y) / this.size * 9);
};

Sudoku.prototype.testValue = function (i, n)
{
	return values[i] == 0 && 
		!contains (this.getBox (i), n) && 
		!contains (this.getRow (i), n) && 
		!contains (this.getCol (i), n);
};

Sudoku.prototype.show = function ()
{
	let cellSize = this.size / 9.0;


	// Draw small lines

	stroke (100);
	strokeWeight(1);

	for (let i = 1; i < 9; i += 3)
	{
		// Draw horizontal lines
		line (this.x, this.y + cellSize * i, this.x + this.size, this.y + cellSize * i);
		line (this.x, this.y + cellSize * (i + 1), this.x + this.size, this.y + cellSize * (i + 1));

		// Draw vertical lines
		line (this.x + cellSize * i, this.y, this.x + cellSize * i, this.y + this.size);
		line (this.x + cellSize * (i + 1), this.y, this.x + cellSize * (i + 1), this.y + this.size);
	}

	// Draw large lines

	stroke (0);
	strokeWeight (3);

	for (let i = 0; i <= 9; i += 3)
	{
		// Draw horizontal line
		line (this.x, this.y + cellSize * i, this.x + this.size, this.y + cellSize * i);

		// Draw vertical line
		line (this.x + cellSize * i, this.y, this.x + cellSize * i, this.y + this.size);
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
			let val = this.getValue (i,  j);
			if (val > 0)
			{
				let tx = this.x + (i + 0.5) * cellSize;
				let ty = this.y + (j + 0.5) * cellSize;
				text (val, tx, ty);
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