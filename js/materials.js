var imgBlockPath = "media/blocks/";
var imgExtension = ".png";

var welcomeMsgSkin = "<div id='welcomeMsg'>" + 
	"<p>Welcome to an unofficial game of Tetris!</p>" + 
	"<table>" + 
		"<tr>" + 
			"<td class='tblTxtCenter' colspan='2'><b>Controls</b></td>" + 
		"</tr>" + 
		"<tr>" + 
			"<td class='tdStiled'><b>Move left</b></td>" + 
			"<td class='tdStiled'><i>LEFT ARROW</i></td>" + 
		"</tr>" + 
		"<tr>" + 
			"<td class='tdStiled'><b>Move right</b></td>" + 
			"<td class='tdStiled'><i>RIGHT ARROW</i></td>" + 
		"</tr>" + 
		"<tr>" + 
			"<td class='tdStiled'><b>Rotate</b></td>" + 
			"<td class='tdStiled'><i>UP ARROW</i></td>" + 
		"</tr>" + 
		"<tr>" + 
			"<td class='tdStiled'><b>Fast forward</b></td>" + 
			"<td class='tdStiled'><i>SPACE</i></td>" + 
		"</tr>" + 
		"<tr>" + 
			"<td class='tdStiled'><b>Pause</b></td>" + 
			"<td class='tdStiled'><i>P</i></td>" + 
		"</tr>" + 
		"<tr>" + 
			"<td colspan='2' style='padding-top:20px; padding-bottom:20px;'><div class='startBtn' onclick='startGame()' onmouseover='$(this).highlightBtn(true)' onmouseout='$(this).highlightBtn(false)'><b>Play</b></div></td>" + 
		"</tr>" + 
	"</table>" + 
	"</div>";
	
var gameOverScreenSkin = "<div id='gameOverScreen'>" + 
	"<table>" + 
		"<tr>" + 
			"<td class='tblTxtCenter' colspan='2'><b>Game Over</b></td>" + 
		"</tr>" + 
		"<tr>" + 
			"<td class='tdStiled'><b>Score:</b> </td>" + 
			"<td class='tdStiled' id='goScore'></td>" + 
		"</tr>" + 
		"<tr>" + 
			"<td class='tdStiled'><b>Lines:</b> </td>" + 
			"<td class='tdStiled' id='goLines'></td>" + 
		"</tr>" +  
		"<tr>" + 
			"<td colspan='2' style='padding-top:20px; padding-bottom:20px;'><div class='startBtn' onclick='startGame()' onmouseover='$(this).highlightBtn(true)' onmouseout='$(this).highlightBtn(false)'><b>Play again?</b></div></td>" + 
		"</tr>" + 
	"</table>" + 
	"<div>";
	
var aboutDialogSkin = 
"<table>" + 
	"<tr>" + 
		"<td><b>About</b></td>" + 
		"<td><div onmouseover='$(this).highlightBtn(true)' onmouseout='$(this).highlightBtn(false)' style='height:15px; width:15px; background-color:#0087dd; background-image:url(media/x_img.png); float:right; cursor:pointer; margin-bottom:10px; border-radius:2px;' onclick='closeAboutMenu()'></div></td>" + 
	"</tr>" + 
	"<tr>" + 
		"<td colspan='2'>" + 
			"<p>Tetris is a game originally developed and programmed by Alexey Pajitnov. " + 
			"This is a completely fanmade version of the game, therefore I am in no " + 
			"way associated with Nintendo nor Sega, who were some of the publichers of the original game. </p>" + 
			"<p>The code, graphics, and animations were created by myself, with a little help of a javascript library called <a href='http://www.jquery.com/' target='_blank'>JQuery</a>. </p>" + 
		"</td>" + 
	"</tr>" + 
"</table>";