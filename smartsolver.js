/**
 * 
 * @author hadley31
 * 
 */

class SmartSolver {
	constructor(sudoku) {
		this.sudoku = sudoku;

		this.indicies = [];
		this.originalValues = [];
		this.index = 0;
		this.enabled = false;


		for (let val of this.sudoku.values) {
			this.originalValues.push(val);
		}
	}

	start ()
	{
		this.enabled = true;
	}

	pause ()
	{
		this.enabled = false;
	}

	toggle ()
	{
		this.enabled = !this.enabled;
	}

	step() {

		if (!this.enabled || this.isCompleted ())
		{
			return false;
		}

		while (this.originalValues[this.index] != 0) {
			if (this.index >= 80) {
				return false;
			}
			this.index++;
		}

		let val = this.sudoku.getValue(this.index);
		this.sudoku.setValue(this.index, 0);

		while (true) {
			val++;
			if (val > 9) {
				this.sudoku.setValue(this.index, 0);

				this.index = this.indicies.pop();

				return true;
			} else if (this.sudoku.testValue(this.index, val)) {
				break;
			}
		}

		this.sudoku.setValue(this.index, val);
		this.indicies.push(this.index);
		this.index++;

		return true;
	}

	isCompleted ()
	{
		if (this.index >= 81)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	revert ()
	{
		this.sudoku.values = [];
		for (let val of this.originalValues) {
			this.sudoku.values.push(val);
		}
	}
}