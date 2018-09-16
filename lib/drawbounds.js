class DrawBounds
{
	constructor (x, y, width, height)
	{
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	getX ()
	{
		return this.x;
	}

	getY ()
	{
		return this.y;
	}

	getWidth ()
	{
		return this.width;
	}

	getHeight ()
	{
		return this.height;
	}
}

class StretchDrawBounds
{
	constructor (left, top, right, bottom)
	{
		this.left = left;
		this.top = top;
		this.right = right;
		this.bottom = bottom;
	}

	getX ()
	{
		return this.left;
	}

	getY ()
	{
		return this.top;
	}

	getWidth ()
	{
		return CANVAS_WIDTH - this.left - this.right;
	}

	getHeight ()
	{
		return CANVAS_HEIGHT - this.top - this.bottom;
	}
}

class HStretchDrawBounds
{
	constructor (y, height, left, right)
	{
		this.y = y;
		this.height = height;
		this.left = left;
		this.right = right;
	}

	getX ()
	{
		return this.left;
	}

	getY ()
	{
		return this.y;
	}

	getWidth ()
	{
		return CANVAS_WIDTH - this.left - this.right;
	}

	getHeight ()
	{
		return this.height;
	}
}

class VStretchDrawBounds
{
	constructor (x, width, top, bottom)
	{
		this.x = x;
		this.width = width;
		this.top = top;
		this.bottom = bottom;
	}

	getX ()
	{
		return this.x;
	}

	getY ()
	{
		return this.top;
	}

	getWidth ()
	{
		return this.width;
	}

	getHeight ()
	{
		return CANVAS_HEIGHT - this.top - this.bottom;
	}
}