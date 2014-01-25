$(document).on("keydown", function(e){

	shouldMove = true;

	if(e.which == 37) //left
		moveLeft = true;
	
	if(e.which == 39) //right
		moveRight = true;
		
	if(e.which == 40) //down - speed up
		speedUp = true;
		
	if(e.which == 38 && !gameOver && !gamePaused) //up - for rotating blocks
		rotateBlocks();
		
	if(e.which == 32 && !gameOver && !gamePaused) //spacebar
		fastForwardBlocks();
	
	if(e.which == 80 && !gameOver && $("#aboutDialog").is(":hidden"))
	{
		if(gamePaused)
		{
			gamePaused = false;
			onManipulate();
			onMoveBlocks();
			$(pauseScreen).showElement(false);
		}
		else
		{
			gamePaused = true;
			$(pauseScreen).showElement(true);
		}
	}
	
	if(!gameOver)
		removeOffScreen(); //moves the blocks onto the screen if they're off the screen
		
	if(e.which == 38 || e.which == 40 || e.which == 32) //this will prevent scrolling with the keyboard
		e.preventDefault();
		
	if(e.which == 13 && gameOver) //enter - starts the game
		startGame();
	
});

$(document).on("keyup", function(e){
	
	shouldMove = false;
	
	if(e.which == 37) //left
		moveLeft = false;
	
	if(e.which == 39) //right
		moveRight = false;	
	
	if(e.which == 40) //speed up
		speedUp = false;
		
});