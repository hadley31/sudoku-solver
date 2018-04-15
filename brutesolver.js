

class BruteSolver
{
	constructor (sudoku)
	{
		this.sudoku = sudoku;
	
		this.indicies = [];
		this.originalValues = [];
		this.index = 0;
		this.enabled = false;


		for (let val of sudoku.values)
		{
			originalValues.push (val);
		}
	}
}

BruteSolver.prototype.step = function ()
{
	if (this.index == 80 && )

	while (this.originalValues[this.index] != 0)
	{
		this.index++;
	}

	let val = this.sudoku.getValue (this.index);

	do
	{
		val++;
		if (val > 9)
		{
			this.index = this.indicies.pop ();
			return false;
		}
	}
	while (this.sudoku.testValue (this.index, val));

	this.sudoku.setValue (this.index, val);


	this.indicies.push (this.index);
};