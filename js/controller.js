//booleans which specify player's movement
var moveLeft = false;
var moveRight = false;
var speedUp = false;

var gameOver = true;
var gamePaused = false;

var wasFastForwarded = false; //determens if blocks were fast forwarded

var previousShape = "";
var currentShape = "";
var nextShape = "";
var arrNextShape;

var repeatingGame = false; //has the game been repeated

var rotatingPoint; //this block will provide the X and Y coordinates when rotating blocks

var moveSpeed = 25; //current speed
var downSpeed = 5;

var moveForResize = 0;
var posNextShapeLeft = 0;
var currBlocksResizeFor = 0;

var arrCurrBlocks = new Array(); //current block

var shouldMove = false; //triggers if the player should move
var shouldCreateBlock = false; //specifies if blocks should be created

var listOfBlocks = new Array(); //contains blocks

var aboutDialog; //this the an about dialog window (div)

$(document).ready(function(){
	$(welcomeMsgSkin).appendTo("body");
	$("<div id='pauseScreen'><p>Game Paused</p></div>").appendTo("body");
	$(gameOverScreenSkin).appendTo("body");
	$("#welcomeMsg").showElement(true);
	aboutDialog = $("<div id='aboutDialog'>" + aboutDialogSkin + "</div>");
	$("body").append(aboutDialog);
});

function onManipulate()
{
	if(!gamePaused)
	{
		if(!gameOver)
		{
			if(shouldMove)
			{
				if(moveLeft && shouldStrafe("left"))
					moveCurrBlocks("left", moveSpeed);
				
				if(moveRight && shouldStrafe("right"))
					moveCurrBlocks("right", moveSpeed);
					
				shouldMove = false;
			}
			setTimeout('onManipulate()', 5);
		}
	}
}

function onMoveBlocks()
{	
	if(!gamePaused)
	{
		moveCurrBlocks("down", downSpeed);
		
		var arrLeftPos = new Array();
		
		for(var i = 0; i < listOfBlocks.length; i++)
			arrLeftPos.push($(listOfBlocks[i]).offset().left - $("#screen").offset().left);
		moveForResize = getNum(arrLeftPos, true);
		
		arrLeftPos.splice(0, arrLeftPos.length);
		
		for(var i = 0; i < arrCurrBlocks.length; i++)
			arrLeftPos.push($(arrCurrBlocks[i]).offset().left - $("#screen").offset().left);
		currBlocksResizeFor = getNum(arrLeftPos, true);
		
		//tests if the blocks reached the end of the #screen div
		if(areBlocksDown()) 
			shouldCreateBlock = true;
		
		if(!shouldCreateBlock)
			hitTest();
		
		if(!shouldCreateBlock)
		{
			if(speedUp)
				setTimeout('onMoveBlocks()', 5);
			else
				setTimeout('onMoveBlocks()', 50);
		}
		else
		{	
			for(var i = 0; i < arrCurrBlocks.length; i++)
				listOfBlocks.push(arrCurrBlocks[i]);
				
			isGameOver();
			
			if(!gameOver)
			{
				if(!removeRows())
				{
					var score = 15;
					if(wasFastForwarded) {score = 20; wasFastForwarded = false;}
					$("body").addTextOnScreen(addScore(score) + "+", $(rotatingPoint).offset().left, $(rotatingPoint).offset().top-10);
				}
				
				arrCurrBlocks = createCurrBlocks($("#screen").offset().left+(moveSpeed*2), $("#screen").offset().top); 
				
				for(var i = 0; i < arrCurrBlocks.length; i++)
					document.getElementById("screen").appendChild(arrCurrBlocks[i]);
				
				$(rotatingPoint).css({"left": ($("#screen").offset().left+(moveSpeed*3)) + "px", "top": ($("#screen").offset().top) + "px"});
				
				shouldCreateBlock = false;
				setTimeout('onMoveBlocks()', 5);
			}
			else
			{	
				$("#screen").html(""); //deletes all elements from the html document
				
				//reset to default
				previousShape = "";
				currentShape = "";
				nextShape = "";
				moveLeft = false;
				moveRight = false;
				speedUp = false;
				shouldMove = false;
				shouldCreateBlock = false;
				
				$("#nextBlock").html("");
				$(rotatingPoint).remove();
				listOfBlocks.splice(0,listOfBlocks.length); //deletes all elements from the array
				
				$("#goScore").html(currentScore);
				$("#goLines").html(amountOfLines);
				
				currentScore = 0;
				amountOfLines = 0;
				
				$("#scorePanel").html(0);
				$("#linesPanel").html(0);
				
				$("#gameOverScreen").showElement(true);
				
				$("#screen").flashScreen();
				$("#nextBlock").flashScreen();
				$("#scorePanel").flashScreen();
				$("#linesPanel").flashScreen();
			}
		}
	}
}

function openAboutMenu()
{
	if(!gameOver)
		gamePaused = true;
	aboutDialog.showElement(true);
}

function closeAboutMenu()
{
	if(!gameOver && $("#pauseScreen").is(":hidden"))
	{
		gamePaused = false;
		onManipulate();
		onMoveBlocks();
	}
	aboutDialog.showElement(false);
}

function startGame()
{
	if(!repeatingGame)
		$("#welcomeMsg").showElement(false);
	else
		$("#gameOverScreen").showElement(false);
		
	repeatingGame = true;
	gameOver = false;
	
	calcNextShape();
	
	arrCurrBlocks = createCurrBlocks($("#screen").offset().left+(moveSpeed*2), $("#screen").offset().top-5);
	rotatingPoint = createBlock("", $("#screen").offset().left+(moveSpeed*3), $("#screen").offset().top-5);
	
	for(var i = 0; i < arrCurrBlocks.length; i++)
		document.getElementById("screen").appendChild(arrCurrBlocks[i]);
	
	document.getElementById("screen").appendChild(rotatingPoint);
	
	onManipulate();
	onMoveBlocks();
}

function removeOffScreen()
{
	//"i" is later 0 just to ensure that all blocks are inside of the screen in one exectution
	for(var i = 0; i < arrCurrBlocks.length; i++)
	{
		if($(arrCurrBlocks[i]).offset().left < $("#screen").offset().left)												{moveCurrBlocks("right", moveSpeed); 	i = 0;}
		else if($(arrCurrBlocks[i]).offset().left > $("#screen").offset().left + $("#screen").width() - moveSpeed)		{moveCurrBlocks("left", moveSpeed); 	i = 0;}
		else if($(arrCurrBlocks[i]).offset().top + moveSpeed > $("#screen").height() + $("#screen").offset().top)		{moveCurrBlocks("up", moveSpeed); 		i = 0;}
	}
}

function hitTest()
{
	for(var j = 0; j < arrCurrBlocks.length; j++)
	{
		for(var i = 0; i < listOfBlocks.length; i++)
		{
			//taking the object
			var obj1 = $(arrCurrBlocks[j]);
			
			//obj1 x and y
			var obj1x = obj1.offset().left;
			var obj1y = obj1.offset().top;
			
			//getting current block
			var currBlock = $(listOfBlocks[i]);
			
			var blockX = currBlock.offset().left;
			var blockY = currBlock.offset().top;
			
			//hit test
			if(collision(obj1x, blockX, obj1y, blockY, moveSpeed, moveSpeed))
			{
				i = 0;
				j = 0;
				
				while(true)
				{	
					if(j != arrCurrBlocks.length)
					{
						if(i != listOfBlocks.length)
						{
							//taking the object
							obj1 = $(arrCurrBlocks[j]);
							
							obj1x = obj1.offset().left;
							obj1y = obj1.offset().top;
							
							//getting current block
							currBlock = $(listOfBlocks[i]);
							
							blockX = currBlock.offset().left;
							blockY = currBlock.offset().top;
			
							if(collision(obj1x, blockX, obj1y, blockY, moveSpeed, moveSpeed))
							{
								//moves all current blocks up
								moveCurrBlocks("up", 1)
								i = 0;
							}
							else {i++;}
						}
						else {j++; i = 0;}
					}
					else {break;}
				}
					
				shouldCreateBlock = true;
				j = arrCurrBlocks.length;
				break;
			}
		}
	}
}

function collision(obj1x, obj2x, obj1y, obj2y, width, height)
{
	if(obj1x < obj2x + width-1 && obj1x + width-1 > obj2x && obj1y < obj2y + height && obj1y + height > obj2y)
		return true;
	else
		return false;
}

function createBlock(elemColor, corX, corY)
{
	var boxShadow = "";
	
	if(!elemColor.substring(elemColor.lastIndexOf("/")+1, elemColor.indexOf('.')) == "")
		boxShadow = "box-shadow: 0px 0px 8px " + elemColor.substring(elemColor.lastIndexOf("/")+1, elemColor.indexOf('.')) + ";";
	
	var newBlock = document.createElement("div");
	newBlock.setAttribute("style", "position:absolute; width:25px; height:25px; border:0; background-image:url(" + elemColor + "); top: " + corY + "px; left:" + corX + "px; " + boxShadow);
	
	return newBlock;
}

function rotateBlocks()
{
	switch(currentShape)
	{
		case I_VERTICAL : 		changeCurrBlockLoc(arrI_horiz); 	currentShape = I_HORIZONTAL; 	break;
		case I_HORIZONTAL : 	changeCurrBlockLoc(arrI_vert); 		currentShape = I_VERTICAL; 		break;

		case J_TOP : 			changeCurrBlockLoc(arrJ_left); 		currentShape = J_LEFT; 			break;
		case J_LEFT : 			changeCurrBlockLoc(arrJ_down); 		currentShape = J_DOWN; 			break;
		case J_DOWN : 			changeCurrBlockLoc(arrJ_right); 	currentShape = J_RIGHT; 		break;
		case J_RIGHT : 			changeCurrBlockLoc(arrJ_top); 		currentShape = J_TOP; 			break;
		
		case L_TOP : 			changeCurrBlockLoc(arrL_right); 	currentShape = L_RIGHT;			break;
		case L_RIGHT : 			changeCurrBlockLoc(arrL_down); 		currentShape = L_DOWN; 			break;
		case L_DOWN : 			changeCurrBlockLoc(arrL_left);	 	currentShape = L_LEFT;			break;
		case L_LEFT : 			changeCurrBlockLoc(arrL_top); 		currentShape = L_TOP; 			break;
		
		case O_NORMAL : 		changeCurrBlockLoc(arrO); 			currentShape = O_NORMAL; 		break;
		
		case Z_VERTICAL : 		changeCurrBlockLoc(arrZ_horiz); 	currentShape = Z_HORIZONTAL; 	break;
		case Z_HORIZONTAL : 	changeCurrBlockLoc(arrZ_vert); 		currentShape = Z_VERTICAL; 		break;
		
		case T_TOP : 			changeCurrBlockLoc(arrT_right); 	currentShape = T_RIGHT; 		break;
		case T_RIGHT : 			changeCurrBlockLoc(arrT_down); 		currentShape = T_DOWN; 			break;
		case T_DOWN : 			changeCurrBlockLoc(arrT_left); 		currentShape = T_LEFT;		 	break;
		case T_LEFT : 			changeCurrBlockLoc(arrT_top); 		currentShape = T_TOP; 			break;
	}
}

function changeCurrBlockLoc(arrayShape)
{
	//default values
	var coorXDef = $(rotatingPoint).offset().left;
	var coorYDef = $(rotatingPoint).offset().top;
	
	//modified values
	var coorX = 0;
	var coorY = 0;
	
	//current block's index
	var cbIndex = 0;
	
	//counts columns
	var columnCount = 1;
	
	var coorX = coorXDef;
	var coorY = coorYDef;
	
	for(var i = 0; i < arrayShape.length; i++)
	{
		if(columnCount != 5)
		{	
			switch(arrayShape[i])
			{
				case 1 : 
					$(arrCurrBlocks[cbIndex]).css({"top": coorY, "left": coorX});
					cbIndex++;
					break;
			}
			
			coorX += moveSpeed;
			columnCount++;
		}
		else
		{
			columnCount = 1;
			coorX = coorXDef;
			coorY += moveSpeed;
		}
	}
}

function fastForwardBlocks()
{
	var arrDistances = new Array(); //will contain the number of distances
	wasFastForwarded = true;
	
	for(var cb = 0; cb < arrCurrBlocks.length; cb++)
	{
		for(var i = 0; i < listOfBlocks.length; i++)
		{
			if($(listOfBlocks[i]).offset().left == $(arrCurrBlocks[cb]).offset().left && $(arrCurrBlocks[cb]).offset().top < $(listOfBlocks[i]).offset().top)
			{
				var distance = $(listOfBlocks[i]).offset().top - $(arrCurrBlocks[cb]).offset().top;
				arrDistances.push(distance);
			}
		}
	}
	
	var smallestDist = getNum(arrDistances, true);
	var bgCurrBlock = $(arrCurrBlocks[0]).css("background-image");
	var colorCurrBlock = bgCurrBlock.substring(bgCurrBlock.lastIndexOf("/")+1, bgCurrBlock.lastIndexOf("."));
	
	if(smallestDist != null)
	{
		$("body").fastForwardEffect(arrCurrBlocks, smallestDist, colorCurrBlock);
		moveCurrBlocks("down", smallestDist - 5 - moveSpeed);
	}
	else
	{
		var destination = $("#screen").height() + $("#screen").offset().top - 5 - $(arrCurrBlocks[arrCurrBlocks.length-1]).offset().top;
		$("body").fastForwardEffect(arrCurrBlocks, destination, colorCurrBlock);
		moveCurrBlocks("down", destination);
	}
}

function calcNextShape()
{
	while(true)
	{
		var randomNum = Math.random();
		
		if(randomNum > 0.0 && randomNum <= 0.2) 		{nextShape = O_NORMAL;}
		else if(randomNum > 0.2 && randomNum <= 0.4) 	{nextShape = I_VERTICAL;}
		else if(randomNum > 0.4 && randomNum <= 0.6) 	{nextShape = Z_HORIZONTAL;}
		else if(randomNum > 0.6 && randomNum <= 0.8) 	{nextShape = T_DOWN;}
		else if(randomNum > 0.8 && randomNum <= 0.9) 	{nextShape = L_TOP;}
		else if(randomNum > 0.9) 						{nextShape = J_TOP;}
		
		if(nextShape.substring(0,1) != previousShape.substring(0,1))
		{
			previousShape = nextShape;
			displayNextShape(nextShape);
			break;
		}
	}
}

function displayNextShape(shape)
{
	var arrShape, color, posTop;
	
	switch(shape.substring(0,1))
	{
		case "o" : arrShape = arrO; 		color = imgBlockPath + "green" 		+ 		imgExtension; posNextShapeLeft = 33; posTop = 50; break;
		case "i" : arrShape = arrI_vert; 	color = imgBlockPath + "yellow" 	+ 		imgExtension; posNextShapeLeft = 45; posTop = 25; break;
		case "z" : arrShape = arrZ_horiz; 	color = imgBlockPath + "white" 		+ 		imgExtension; posNextShapeLeft = 20; posTop = 50; break;
		case "t" : arrShape = arrT_down; 	color = imgBlockPath + "red" 		+ 		imgExtension; posNextShapeLeft = 20; posTop = 25; break;
		case "l" : arrShape = arrL_top; 	color = imgBlockPath + "blue" 		+ 		imgExtension; posNextShapeLeft = 33; posTop = 35; break;
		case "j" : arrShape = arrJ_top; 	color = imgBlockPath + "aqua" 		+ 		imgExtension; posNextShapeLeft = 30; posTop = 35; break;
	}
	
	$('#nextBlock').html(""); //deletes all elements
	arrNextShape = buildBlocks($("#nextBlock").offset().left + posNextShapeLeft, $("#nextBlock").offset().top + posTop, color, arrShape);
	for(var i = 0; i < arrNextShape.length; i++)
		$("#nextBlock").appearFromLeft(arrNextShape[i]);
}

function createCurrBlocks(coorX, coorY)
{
	var arrShape, color;

	switch(nextShape.substring(0,1))
	{
		case "o" : arrShape = arrO; 		color = imgBlockPath + "green" 		+ 		imgExtension; break;
		case "i" : arrShape = arrI_vert; 	color = imgBlockPath + "yellow" 	+ 		imgExtension; break;
		case "z" : arrShape = arrZ_horiz; 	color = imgBlockPath + "white" 		+ 		imgExtension; break;
		case "t" : arrShape = arrT_down; 	color = imgBlockPath + "red" 		+ 		imgExtension; break;
		case "l" : arrShape = arrL_top; 	color = imgBlockPath + "blue" 		+ 		imgExtension; break;
		case "j" : arrShape = arrJ_top; 	color = imgBlockPath + "aqua" 		+ 		imgExtension; break;
	}
	
	currentShape = nextShape;
	calcNextShape();
	
	return buildBlocks(coorX, coorY, color, arrShape);
}

function buildBlocks(coorX, coorY, color, arrShape)
{
	var newBlocks = new Array();
	var columnCount = 1;
	var currX = coorX;
	var currY = coorY;
	var newBlock; 
	
	for(var i = 0; i < arrShape.length; i++)
	{
		if(columnCount != 5)
		{
			currX += moveSpeed;
			
			switch(arrShape[i])
			{
				case 0 :
					newBlock = null;
					break;
				case 1 : 
					newBlock = createBlock(color, currX, currY);
					break;
			}
			
			columnCount++;
			
			if(newBlock != null)
				newBlocks.push(newBlock);
		}
		else
		{
			columnCount = 1;
			currX = coorX;
			currY += moveSpeed;
		}
	}
	
	return newBlocks;
}

function shouldStrafe(side)
{
	var distance;
	
	if(side == "left")
		distance = $("#screen").offset().left;
	else
		distance = $("#screen").offset().left + $("#screen").width() - moveSpeed;

	for(var i = 0; i < arrCurrBlocks.length; i++)
	{
		if($(arrCurrBlocks[i]).offset().left == distance)
			return false;
	}
	
	return true;
}

function areBlocksDown()
{
	for(var i = 0; i < arrCurrBlocks.length; i++)
	{
		if($(arrCurrBlocks[i]).offset().top + moveSpeed >= $("#screen").height() + $("#screen").offset().top)
			return true;
	}
	
	return false;
}

function moveCurrBlocks(direction, amount)
{
	switch(direction)
	{
		case "left" :
			$(rotatingPoint).css("left", ($(rotatingPoint).offset().left - amount) + "px");
			for(var i = 0; i < arrCurrBlocks.length; i++)
				$(arrCurrBlocks[i]).css("left", ($(arrCurrBlocks[i]).offset().left - amount) + "px");
			break;
		case "right" : 
			$(rotatingPoint).css("left", ($(rotatingPoint).offset().left + amount) + "px");
			for(var i = 0; i < arrCurrBlocks.length; i++)
				$(arrCurrBlocks[i]).css("left", ($(arrCurrBlocks[i]).offset().left + amount) + "px");
			break;
		case "down" : 
			$(rotatingPoint).css("top", ($(rotatingPoint).offset().top + amount) + "px");
			for(var i = 0; i < arrCurrBlocks.length; i++)
				$(arrCurrBlocks[i]).css("top", ($(arrCurrBlocks[i]).offset().top + amount) + "px");
			break;
		case "up" : 
			$(rotatingPoint).css("top", ($(rotatingPoint).offset().top - amount) + "px");
			for(var i = 0; i < arrCurrBlocks.length; i++)
				$(arrCurrBlocks[i]).css("top", ($(arrCurrBlocks[i]).offset().top - amount) + "px");
			break;
	}
}

function removeRows()
{
	var topValues = new Array();
	var removedRows = new Array();
	var count = 0; //counts top values
	
	for(var i = 0; i < listOfBlocks.length; i++)
	{
		if($(listOfBlocks[i]).offset().left == $("#screen").offset().left)
			topValues.push($(listOfBlocks[i]).offset().top);
	}
	
	while(topValues[count])
	{
		var topValue = topValues[count];
		var blocksToDelete = new Array(); //assigns blocks to delete
		var blockCounter = 0; //counts the number of blocks in a column
		
		for(var i = 0; i < listOfBlocks.length && topValue != null; i++)
		{
			if($(listOfBlocks[i]).offset().top == topValue)
			{blocksToDelete.push(listOfBlocks[i]); blockCounter++;}
		}
		
		if(blockCounter == 10)
		{
			for(var i = 0; i < blocksToDelete.length; i++)
				$(blocksToDelete[i]).remove(); //removing blocks from the html
			
			for(var i = 0; i < blocksToDelete.length; i++)
				listOfBlocks.splice(listOfBlocks.indexOf(blocksToDelete[i]),1); //removing blocks from the array listOfBlocks
			
			removedRows.push(topValue);
		}
		
		count++;
	}
	
	if(removedRows.length != 0)
	{	
		//adding the removed effect
		for(var i = 0; i < removedRows.length; i++)
			$("#screen").removedColsEffect(removedRows[i]);
		
		$("body").addTextOnScreen(addLines(removedRows.length) + "+", $(rotatingPoint).offset().left, $(rotatingPoint).offset().top-10);
		count = 0; 
		
		while(true)
		{
			var maxTopValue = getNum(removedRows, false); //largest top value

			if(removedRows.indexOf(maxTopValue-25) == -1)
			{
				count++;
				
				for(var i = 0; i < listOfBlocks.length; i++)
				{
					if($(listOfBlocks[i]).offset().top < maxTopValue)
						$(listOfBlocks[i]).css("top", parseInt($(listOfBlocks[i]).offset().top + (count*25)) + "px");
				}
				
				removedRows.splice(removedRows.indexOf(maxTopValue), 1); //removes the said top value
				
				for(var i = 0; i < removedRows.length; i++) //increment all top values for count*25
					removedRows[i] += count*25;
					
				count = 0;
			}
			else 
			{
				count++;
				removedRows.splice(removedRows.indexOf(maxTopValue), 1); //removes the said top value
			}
			
			if(removedRows.length == 0)
				return true;
		}	
	}
	return false;
}

function getNum(numbers, isMin)
{
	var num = numbers[0];
	
	for(var i = 0; i < numbers.length; i++)
	{
		if(isMin)
			num = Math.min(num, numbers[i]);
		else
			num = Math.max(num, numbers[i]);
	}
	
	return num;
}

function isGameOver()
{
	//it is enough to just see where the last 4 elements of the listOfBlocks Array are (what their location is)
	for(var i = listOfBlocks.length-1; i != listOfBlocks.length-5; i--)
	{
		if($(listOfBlocks[i]).offset().top <= $("#screen").offset().top + moveSpeed) {gameOver = true; break;}
		else {gameOver = false;}
	}
}

$(window).on("resize", function(){

	//all blocks
	var arrBlocksLeft = new Array();
	
	for(var i = 0; i < listOfBlocks.length; i++)
		arrBlocksLeft.push($(listOfBlocks[i]).offset().left);
		
	var smallestLeft = getNum(arrBlocksLeft, true);
	
	for(var i = 0; i < listOfBlocks.length; i++)
	{
		var moveFor = $("#screen").offset().left - smallestLeft; 
		$(listOfBlocks[i]).css("left", ($(listOfBlocks[i]).offset().left + moveFor + moveForResize) + "px");
	}
	
	arrBlocksLeft.splice(0,arrBlocksLeft.length);
	
	//next shape
	for(var i = 0; i < arrNextShape.length; i++)
		arrBlocksLeft.push($(arrNextShape[i]).offset().left);
		
	smallestLeft = getNum(arrBlocksLeft, true);
	
	for(var i = 0; i < arrNextShape.length; i++)
	{
		var moveFor = $("#nextBlock").offset().left - smallestLeft; 
		$(arrNextShape[i]).css("left", ($(arrNextShape[i]).offset().left + moveFor + posNextShapeLeft + 35) + "px"); 
	}
	
	arrBlocksLeft.splice(0,arrBlocksLeft.length);
	
	//curr blocks
	for(var i = 0; i < arrCurrBlocks.length; i++)
		arrBlocksLeft.push($(arrCurrBlocks[i]).offset().left);
		
	smallestLeft = getNum(arrBlocksLeft, true);
	
	$(rotatingPoint).css("left", ($("#screen").offset().left + currBlocksResizeFor) + "px"); 
	
	for(var i = 0; i < arrCurrBlocks.length; i++)
	{
		var moveFor = $("#screen").offset().left - smallestLeft; 
		$(arrCurrBlocks[i]).css("left", ($(arrCurrBlocks[i]).offset().left + moveFor + currBlocksResizeFor) + "px"); 
	}
});