
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