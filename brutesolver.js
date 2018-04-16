

class BruteSolver
{
	constructor (sudoku)
	{
		this.sudoku = sudoku;
	
		this.indicies = [];
		this.originalValues = [];
		this.index = 0;
		this.enabled = false;


		for (let val of this.sudoku.values)
		{
			this.originalValues.push (val);
		}
	}
}

BruteSolver.prototype.step = function ()
{
	while (this.originalValues[this.index] != 0)
	{
		this.index++;

		if (this.index >= 81)
		{
			noLoop();
			return true;
		}
	}

	let val = this.sudoku.getValue (this.index);
	this.sudoku.setValue(this.index, 0);

	while (true)
	{
		val++;
		if (val > 9)
		{
			this.sudoku.setValue (this.index, 0);

			this.index = this.indicies.pop ();

			return false;
		}
		else if (this.sudoku.testValue (this.index, val))
		{
			break;
		}
	}

	this.sudoku.setValue (this.index, val);
	this.indicies.push (this.index);
	this.index++;

	return false;
};