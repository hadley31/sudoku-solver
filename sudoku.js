/**
 * 
 * @author hadley31
 * 
 */

class Sudoku
{
	constructor (arr)
	{
		this.values = arr ? arr : [];
	}

	loadValues (arr)
	{
		this.values = arr;
	}

	getValue (n)
	{
		return this.values[n];
	}

	setValue (n,  val)
	{
		if (val < 0 || val > 9)
			return;
		
		this.values[n] = val;
	}

	getRow (n)
	{
		n = getY (n);

		let arr = [];

		for (let i = 0; i < 9; i++)
		{
			arr.push (this.getValue (index(i,  n)));
		}

		return arr;
	}


	getCol (n)
	{
		n = getX (n);

		let arr = [];

		for (let i = 0; i < 9; i++)
		{
			arr.push (this.getValue (index(n,  i)));
		}

		return arr;
	}

	getBox (n)
	{
		let startX = floor(getX (n) / 3) * 3;
		let startY = floor(getY (n) / 3) * 3;

		let arr = [];

		for (let i = 0; i < 3; i++)
		{
			for (let j = 0; j < 3; j++)
			{
				arr.push (this.getValue (index(startX + j,  startY + i)));
			}
		}


		return arr;
	}

	getRowOthers (n)
	{
		let x = getX (n);
		let y = getY (n);

		let arr = [];

		for (let i = 0; i < 9; i++)
		{
			if (i == x)
				continue;

			arr.push (this.getValue (index(i,  y)));
		}

		return arr;
	}

	getColOthers ()
	{
		let x = getX (n);
		let y = getY (n);

		let arr = [];

		for (let i = 0; i < 9; i++)
		{
			if (i == y)
				continue;
			
			arr.push (this.getValue (index(x,  i)));
		}

		return arr;
	}

	getBoxOthers ()
	{
		let startX = floor(getX (n) / 3) * 3;
		let startY = floor(getY (n) / 3) * 3;

		let arr = [];

		for (let i = 0; i < 3; i++)
		{
			for (let j = 0; j < 3; j++)
			{
				arr.push (this.getValue (index(startX + j,  startY + i)));
			}
		}


		return arr;
	}

	testValue (n, val)
	{
		return this.values[n] == 0 && 
			!contains (this.getBox (n), val) && 
			!contains (this.getRow (n), val) && 
			!contains (this.getCol (n), val);
	}
}


function index (x,  y)
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