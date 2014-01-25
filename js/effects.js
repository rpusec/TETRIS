$.fn.showElement = function(show)
{	
	//show/hide because it's initially hidden (used display:none)
	$(this).show();
	var defaultTop = $(this).offset().top;
	var defaultHeight = $(this).height();
	$(this).hide();
	
	if(show)
	{
		$.each($(this).children(), function(){
			$(this).css("opacity", "0");
		});
	
		$(this).show();
		$(this).css("top", defaultTop+(defaultHeight/2));
		$(this).height(0);
		$(this).animate({"height": defaultHeight, "top": defaultTop}, 400, "linear", function(){
			$.each($(this).children(), function(){
				$(this).animate({"opacity": 1});
			});
		});
	}
	else
	{
		$(this).show();
		
		var parentElement = this;
		
		$.each($(this).children(), function(){
			$(this).animate({"opacity": 0}, 400, "linear", function(){
				$(parentElement).animate({"height": 0, "top": defaultTop+(defaultHeight/2)}, 400, "linear", function(){
					$(this).css("top", defaultTop);
					$(this).height(defaultHeight);
					$(this).hide();
				});
			});
		});
	}
}

$.fn.appearFromLeft = function(what)
{
	$(what).css("opacity", "0.5");
	$(this).append(what);
	$(what).animate({"left": $(what).offset().left + 10}, 200, "linear", function(){
		$(this).animate({"opacity": 1}, 400, "linear");
	});
}

$.fn.highlightBtn = function(shouldHigh)
{	
	if(shouldHigh)	
	{
		$(this).css({
			transition : 'background 0.25s ease-in-out',
			"background-color": "#66c3ff"
		});
	}
	else
	{
		$(this).css({
			transition : 'background 0.25s ease-in-out',
			"background-color": "#0087dd"
		});
	}
}

$.fn.addTextOnScreen = function(text, xCoor, yCoor)
{
	var flyingText = $("<div class=\"flyingText\">" + text + "</div>");
	flyingText.css({"position": "absolute", "top": yCoor, "left": xCoor});
	
	$(this).append(flyingText);
	
	$(flyingText).animate({"top": $(flyingText).offset().top-70, "opacity": 0}, 1000, "linear", function(){
		$(this).remove();
	});
}

$.fn.removedColsEffect = function(yCoor)
{
	var flashDiv = $("<div></div>");
	flashDiv.css({
		"position": "absolute", 
		"top": yCoor, 
		"left": $(this).offset().left, 
		"width": $(this).width(), 
		"height": 25,
		"background-color": "#fff"
	});
	
	$(flashDiv).animate({"opacity": 0, "height": 0, "top": yCoor + (25/2)}, 700, "linear", function(){
		$(this).remove();
	});
	
	$("body").append(flashDiv);
}

$.fn.fastForwardEffect = function(currBlocksArr, flashHeight, bgColor)
{
	var leftCoors = new Array();
	var topCoors = new Array();

	for(var i = 0; i < currBlocksArr.length; i++)
	{
		leftCoors.push($(currBlocksArr[i]).offset().left);
		topCoors.push($(currBlocksArr[i]).offset().top);
	}
	
	var minLeft = getNum(leftCoors, true); //is the x coordinate of the flash
	var maxLeft = getNum(leftCoors, false);
	var maxTop = getNum(topCoors, false); //is the y coordinate of the flash
	var flashWidth = (maxLeft - minLeft) + 25; //width of the flash
	
	var flashDiv = $("<div></div>");
	flashDiv.css({
		"position": "absolute",
		"left": minLeft,
		"top": maxTop,
		"width": flashWidth,
		"height": flashHeight,
		"background-color": bgColor,
		"opacity": 0.5,
		"border-radius": "7px"
	});
	
	$(flashDiv).animate({"opacity": 0, "width": 0, "left": minLeft + (flashWidth/2)}, 700, "linear", function(){
		$(this).remove();
	});
	
	$(this).append(flashDiv);
}

$.fn.flashScreen = function()
{
	var flashDiv = $("<div></div>");
	flashDiv.css({
		"position": "absolute",
		"left": $(this).offset().left,
		"top": $(this).offset().top,
		"background-color": "#fff",
		"width": $(this).width(),
		"height": $(this).height(),
		"border-radius": "5px"
	});
	
	$(flashDiv).animate({"opacity": 0}, 1000, "linear", function(){
		$(this).remove();
	});
	
	$("body").append(flashDiv);
}