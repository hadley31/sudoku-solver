

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
	print ("Index: " + this.index);

	while (this.originalValues[this.index] != 0)
	{
		this.index++;
		print ("increasing index to: " + this.index);

		if (this.index >= 81)
		{
			print ("Solve complete.");
			noLoop();
			return true;
		}
	}

	let val = this.sudoku.getValue (this.index);

	this.sudoku.setValue(this.index, 0);

	do
	{
		val++;
		if (val > 9)
		{
			print ("over 9");
			this.sudoku.setValue (this.index, 0);

			this.index = this.indicies.pop ();

			print ("the index is now: " + this.index);

			return false;
		}
		else if (this.sudoku.testValue (this.index, val))
		{
			break;
		}
	}
	while (true);

	this.sudoku.setValue (this.index, val);

	this.indicies.push (this.index);

	this.index++;

	console.log (this.indicies);

	return false;
};