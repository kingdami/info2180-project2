//The animation and transition of tiles additional feature was implemented
//ID #: 620004371
//WED DEVELOPMENT (INFO 2180)


var emptyTile = 15; 												//Empty tile
var move = "none";											 // direction
var newbox;														//Array of tiles
var counter = 0;
var addvar = 0;
var str;
var inProgress = false;								//Is tile still moving..

//Loads tiles when webpage loads
window.onload = function()
{
	var tile = document.getElementById('puzzlearea').getElementsByTagName('div');
	newbox = tile;
	var btn = document.getElementById('shufflebutton');
	btn.onclick = shuffle;
	for(var i = 0; i < tile.length; i++)
	{
		tile[i].className = 'puzzlepiece';
		tile[i].onmouseover = canMove;
		tile[i].onmouseout = clear;
		tile[i].onclick = moveTile;

		if(i >= 0 && i <= 3)
		{
			tile[i].style.left += i * 100 + 'px';
			tile[i].style.top = 0 + 'px';
			tile[i].style.backgroundPosition = -i * 100 + 'px ' + '0px';
		}
		else if(i >= 4 && i <= 7)
		{
			tile[i].style.left += (i - 4) * 100 + 'px';
			tile[i].style.top = 100 + 'px';
			tile[i].style.backgroundPosition = -(i - 4) * 100 + 'px '+ '-100px';
		}
		else if(i >= 8 && i <= 11)
		{
			tile[i].style.left += (i - 8) * 100 + 'px';
			tile[i].style.top = 200 + 'px';
			tile[i].style.backgroundPosition = -(i - 8) * 100 + 'px '+ '-200px';
		}
		else
		{
			tile[i].style.left += (i - 12) * 100 + 'px';
			tile[i].style.top = 300 + 'px';
			tile[i].style.backgroundPosition = -(i - 12) * 100 + 'px ' + '-300px';
		}
		
	}
	        
}

//Check if tile can move
function canMove()
{
	if(!inProgress)
	{
		if((parseInt(this.style.left) + parseInt(this.offsetWidth)) === parseInt(getLeftET()) && this.style.top === getTopET())
		{
		this.className = this.className + " movablepiece";
		move = "right";
		}
		else if(parseInt(this.style.left) === (parseInt(getLeftET()) + parseInt(this.offsetWidth)) && this.style.top === getTopET())
		{
			this.className = this.className + " movablepiece";
			move = "left";
		}
		else if((parseInt(this.style.top) + parseInt(this.offsetHeight)) === parseInt(getTopET()) && this.style.left === getLeftET())
		{
			this.className = this.className + " movablepiece";
			move = "down";
		}
		else if(parseInt(this.style.top) === (parseInt(getTopET()) + parseInt(this.offsetHeight)) && this.style.left === getLeftET())
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

//remove .moveablepiece class when mouse exits tile
function clear()
{
	this.className = 'puzzlepiece';
}

//Check method for shuffle
function can_Move(el)
{
	if((parseInt(el.style.left) + parseInt(el.offsetWidth)) === parseInt(getLeftET()) && el.style.top === getTopET())
	{
		move = "right";
		return "right";
	}
	else if(parseInt(el.style.left) === (parseInt(getLeftET()) + parseInt(el.offsetWidth)) && el.style.top === getTopET())
	{
		move = "left";
		return "left";
	}
	else if((parseInt(el.style.top) + parseInt(el.offsetHeight)) === parseInt(getTopET()) && el.style.left === getLeftET())
	{
		move = "down";
		return "down";
	}
	else if(parseInt(el.style.top) === (parseInt(getTopET()) + parseInt(el.offsetHeight)) && el.style.left === getLeftET())
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

//Animates tile movement
function transition()
{
	var indx = 0;
	for(var i = 0; i < newbox.length; i++)
	{
		if(newbox[i].textContent === str)
		{
			indx = i;	
		}
	}
	
	if(addvar != 100)
	{
		if(move === "left" || move === "right")
		{
			newbox[indx].style.left = parseInt(newbox[indx].style.left) + counter + 'px';
		}
		else
		{
			newbox[indx].style.top = parseInt(newbox[indx].style.top) + counter + 'px';
		}
		addvar += 1;
		inProgress = true;
		setTimeout(transition, 0.2);
	}
	else
	{
		addvar = 0;
		inProgress = false;
		move = "none";
	}	
	
}

//Gets direction and then calls transition() to move tile
function moveTile()
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

//Move method for shuffle
function move_Tile(el)
{
	
	switch(move)
	{
		case "right":
			el.style.left = parseInt(el.style.left) + 100 + 'px';
			emptyTile -= 1;
		break;

		case "left":
			el.style.left = parseInt(el.style.left) - 100 + 'px';
			emptyTile += 1;
		break;

		case "down":
			el.style.top = parseInt(el.style.top) + 100 + 'px';
			emptyTile -= 4;
		break;

		case "up":
			el.style.top = parseInt(el.style.top) - 100 + 'px';
			emptyTile += 4;
		break;

	}
}

//shuffles tiles
function shuffle()
{
	var num = 100;
	for(var i = 0; i < num; i++)
	{
		var possibleMoves = [];
		for(var p = 0; p < newbox.length; p++)
		{
			if(can_Move(newbox[p]) != "none")
			{
				possibleMoves.push(p);
			}

		}

		if(possibleMoves.length != 0)
		{
			var n = possibleMoves[Math.floor((Math.random() * possibleMoves.length) + 0)];
			can_Move(newbox[n]);
			move_Tile(newbox[n]);
		}
	}
	move = "none";
}

//Returns the corresponding X for the empty tile
function getLeftET()
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

//Returns the corresponding Y for the empty tile
function getTopET()
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