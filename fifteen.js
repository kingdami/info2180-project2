
var emptyTile = 15; 												
var move = "none";											 
var newTile;														
var counter = 0;
var addvar = 0;
var str;
var inProgress = false;								

window.onload = function()
<!-- Function used to set the layout of the tiles in the correct order. -->
{
	var tiles = document.getElementById('puzzlearea').getElementsByTagName('div');
	newTile = tiles;
	var btn = document.getElementById('shufflebutton');
	btn.onclick = shuffle;
	for(var i = 0; i < tiles.length; i++)
	{
		tiles[i].className = 'puzzlepiece';
		tiles[i].onmouseover = isMovableTile;
		tiles[i].onmouseout = resetTile;
		tiles[i].onclick = moveTile;

		if(i >= 0 && i <= 3)
		{
			tiles[i].style.marginLeft += i * 100 + 'px';
			tiles[i].style.marginTop = 0 + 'px';
			tiles[i].style.backgroundPosition = -i * 100 + 'px ' + '0px';
		}
		else if(i >= 4 && i <= 7)
		{
			tiles[i].style.marginLeft += (i - 4) * 100 + 'px';
			tiles[i].style.marginTop = 100 + 'px';
			tiles[i].style.backgroundPosition = -(i - 4) * 100 + 'px '+ '-100px';
		}
		else if(i >= 8 && i <= 11)
		{
			tiles[i].style.marginLeft += (i - 8) * 100 + 'px';
			tiles[i].style.marginTop = 200 + 'px';
			tiles[i].style.backgroundPosition = -(i - 8) * 100 + 'px '+ '-200px';
		}
		else
		{
			tiles[i].style.marginLeft += (i - 12) * 100 + 'px';
			tiles[i].style.marginTop = 300 + 'px';
			tiles[i].style.backgroundPosition = -(i - 12) * 100 + 'px ' + '-300px';
		}
		
	}
	        
}

function getLeftET()
<!-- Returns the marginLeft value of empty tile -->
{
		if(emptyTile >= 0 && emptyTile <= 3)
		{
			return emptyTile * 100 + 'px';
		}
		else if(emptyTile >= 4 && emptyTile <= 7)
		{
			return (emptyTile - 4) * 100 + 'px';
		}
		else if(emptyTile >= 8 && emptyTile <= 11)
		{
			return (emptyTile - 8) * 100 + 'px';
		}
		else
		{
			return (emptyTile - 12) * 100 + 'px';
		}
}

function getTopET()
<!-- Returns the marginTop value of empty tile -->
{
	if(emptyTile >= 0 && emptyTile <= 3)
	{
			return '0px';
	}
	else if(emptyTile >= 4 && emptyTile <= 7)
	{
			return '100px';
	}
	else if(emptyTile >= 8 && emptyTile <= 11)
	{
			return '200px';
	}else
	{
			return '300px';
	}
}


function isMovableTile()
<!-- On hover, checks if tile has any possible moves. -->
{
	if(!inProgress)
	{
		if((parseInt(this.style.marginLeft) + parseInt(this.offsetWidth)) === parseInt(getLeftET()) && this.style.marginTop === getTopET())
		{
		this.className = this.className + " movablepiece";
		move = "right";
		}
		else if(parseInt(this.style.marginLeft) === (parseInt(getLeftET()) + parseInt(this.offsetWidth)) && this.style.marginTop === getTopET())
		{
			this.className = this.className + " movablepiece";
			move = "left";
		}
		else if((parseInt(this.style.marginTop) + parseInt(this.offsetHeight)) === parseInt(getTopET()) && this.style.marginLeft === getLeftET())
		{
			this.className = this.className + " movablepiece";
			move = "down";
		}
		else if(parseInt(this.style.marginTop) === (parseInt(getTopET()) + parseInt(this.offsetHeight)) && this.style.marginLeft === getLeftET())
		{
			this.className = this.className + " movablepiece";
			move = "up";
		}
		else
		{
			move = "none";
		}
	}
	

}


function isMovable(tile)
<!-- Used to check a list of tiles for the correct movement when a shuffle is done. -->
{
	if((parseInt(tile.style.marginLeft) + parseInt(tile.offsetWidth)) === parseInt(getLeftET()) && tile.style.marginTop === getTopET())
	{
		move = "right";
		return "right";
	}
	else if(parseInt(tile.style.marginLeft) === (parseInt(getLeftET()) + parseInt(tile.offsetWidth)) && tile.style.marginTop === getTopET())
	{
		move = "left";
		return "left";
	}
	else if((parseInt(tile.style.marginTop) + parseInt(tile.offsetHeight)) === parseInt(getTopET()) && tile.style.marginLeft === getLeftET())
	{
		move = "down";
		return "down";
	}
	else if(parseInt(tile.style.marginTop) === (parseInt(getTopET()) + parseInt(tile.offsetHeight)) && tile.style.marginLeft === getLeftET())
	{
		move = "up";
		return "up";
	}
	else
	{
		move = "none";
		return "none";
	}

}


function transition()
<!-- Does tile transition; Assists moveTile. -->
{
	var indx = 0;
	for(var i = 0; i < newTile.length; i++)
	{
		if(newTile[i].textContent === str)
		{
			indx = i;	
		}
	}
	
	if(addvar != 100)
	{
		if(move === "left" || move === "right")
		{
			newTile[indx].style.marginLeft = parseInt(newTile[indx].style.marginLeft) + counter + 'px';
		}
		else
		{
			newTile[indx].style.marginTop = parseInt(newTile[indx].style.marginTop) + counter + 'px';
		}
		addvar += 1;
		inProgress = true;
		setTimeout(transition, 0.5);
	}
	else
	{
		addvar = 0;
		inProgress = false;
		move = "none";
	}	
	
}


function moveTile()
<!-- Moves tile is the empty tile space. -->
{
	if(!inProgress)
	{
		switch(move)
		{
				case "right":
					counter = 1;
					emptyTile -= 1;
					str = this.textContent;
					transition();
				break;

				case "left":
					counter =- 1;
					emptyTile += 1;
					str = this.textContent;
					transition();
				break;

				case "down":
					counter = 1;
					emptyTile -= 4;
					str = this.textContent;
					transition();
				break;

				case "up":
					counter =- 1;
					emptyTile += 4;
					str = this.textContent;
					transition();
				break;

		}
	}
}


function shuffleTile(tile)
<!-- Shuffles tile around based on available movement -->
{
	
	switch(move)
	{
		case "right":
			tile.style.marginLeft = parseInt(tile.style.marginLeft) + 100 + 'px';
			emptyTile -= 1;
		break;

		case "left":
			tile.style.marginLeft = parseInt(tile.style.marginLeft) - 100 + 'px';
			emptyTile += 1;
		break;

		case "down":
			tile.style.marginTop = parseInt(tile.style.marginTop) + 100 + 'px';
			emptyTile -= 4;
		break;

		case "up":
			tile.style.marginTop = parseInt(tile.style.marginTop) - 100 + 'px';
			emptyTile += 4;
		break;

	}
}


function shuffle()
<!-- Shuffles tiles around -->
{
	var num = 100;
	for(var i = 0; i < num; i++)
	{
		var possibleMoves = [];
		for(var p = 0; p < newTile.length; p++)
		{
			if(isMovable(newTile[p]) != "none")
			{
				possibleMoves.push(p);
			}

		}

		if(possibleMoves.length != 0)
		{
			var n = possibleMoves[Math.floor((Math.random() * possibleMoves.length) + 0)];
			isMovable(newTile[n]);
			shuffleTile(newTile[n]);
		}
	}
	move = "none";
}

function resetTile()
<!-- On mouse out, resets the class name of tile. -->
{
	this.className = 'puzzlepiece';
}


