var currentScore = 0; //player's current score
var amountOfLines = 0;

function addScore(howMuch)
{
	currentScore += howMuch; 	
	$("#scorePanel").html(currentScore);
	
	return howMuch;
}

function addLines(howMany)
{
	//lines
	amountOfLines += howMany;
	$("#linesPanel").html(amountOfLines);
	
	//adds score
	switch(howMany)
	{
		case 1 : 
			return addScore(40);
		case 2 : 
			return addScore(100);
		case 3 : 
			return addScore(300);
		default : 
			return addScore(1200);
	}
}