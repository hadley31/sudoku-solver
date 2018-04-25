class DrawBounds
{
	constructor (x, y, w, h)
	{
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}
}

class StretchDrawBounds
{
	constructor (l, t, r, b)
	{
		this.x = l;
		this.y = t;
		this.w = CANVAS_WIDTH - l - r;
		this.h = CANVAS_HEIGHT - t - b;
	}
}