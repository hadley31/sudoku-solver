
class Sudoku
{
	constructor (arr)
	{
		this.values = arr ? arr : [];
	}
}

Sudoku.prototype.loadValues = function (arr)
{
	this.values = arr;
};

Sudoku.prototype.getValue = function (n)
{
	return this.values[n];
};

Sudoku.prototype.setValue = function(n,  val)
{
	this.values[n] = val;
};

Sudoku.prototype.getRow = function (n)
{
	n = getY (n);

	let arr = [];

	for (let i = 0; i < 9; i++)
	{
		arr.push (this.getValue (getIndex(i,  n)));
	}

	return arr;
};


Sudoku.prototype.getCol = function (n)
{
	n = getX (n);

	let arr = [];

	for (let i = 0; i < 9; i++)
	{
		arr.push (this.getValue (getIndex(n,  i)));
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
			arr.push (this.getValue (getIndex(startX + j,  startY + i)));
		}
	}

	return arr;
};

Sudoku.prototype.testValue = function (n, val)
{
	return this.values[n] == 0 && 
		!contains (this.getBox (n), val) && 
		!contains (this.getRow (n), val) && 
		!contains (this.getCol (n), val);
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