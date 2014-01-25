///////////////
// CONSTANTS // I would've used the "const" to make legitimate constants thingies, but it isn't supported by all browsers, oh well...
///////////////

var I_VERTICAL = "ivertical";
var I_HORIZONTAL = "ihorizontal";

var J_TOP = "jtop";
var J_LEFT = "jleft";
var J_DOWN = "jdown";
var J_RIGHT = "jright";

var L_TOP = "ltop";
var L_LEFT = "lleft";
var L_DOWN = "ldown";
var L_RIGHT = "lright";

var O_NORMAL = "onormal";

var Z_VERTICAL = "zvertical";
var Z_HORIZONTAL = "zhorizontal";

var T_TOP = "ttop";
var T_LEFT = "tleft";
var T_DOWN = "tdown";
var T_RIGHT = "tright";

///////////////////
// THE "I" SHAPE //
/////////////////// 

var arrI_vert = 
[
	1,0,0,0,0,
	1,0,0,0,0,
	1,0,0,0,0,
	1,0,0,0,0
];

var arrI_horiz = 
[
	1,1,1,1,0,
	0,0,0,0,0,
	0,0,0,0,0,
	0,0,0,0,0
];

///////////////////
// THE "J" SHAPE //
/////////////////// 

var arrJ_top = 
[
	0,1,0,0,0,
	0,1,0,0,0,
	1,1,0,0,0,
	0,0,0,0,0
];

var arrJ_left = 
[
	1,1,1,0,0,
	0,0,1,0,0,
	0,0,0,0,0,
	0,0,0,0,0
];

var arrJ_down = 
[
	1,1,0,0,0,
	1,0,0,0,0,
	1,0,0,0,0,
	0,0,0,0,0
];

var arrJ_right = 
[
	1,0,0,0,0,
	1,1,1,0,0,
	0,0,0,0,0,
	0,0,0,0,0
];

///////////////////
// THE "L" SHAPE //
/////////////////// 

var arrL_top = 
[
	1,0,0,0,0,
	1,0,0,0,0,
	1,1,0,0,0,
	0,0,0,0,0
];

var arrL_left = 
[
	0,0,1,0,0,
	1,1,1,0,0,
	0,0,0,0,0,
	0,0,0,0,0
];

var arrL_down = 
[
	1,1,0,0,0,
	0,1,0,0,0,
	0,1,0,0,0,
	0,0,0,0,0
];

var arrL_right = 
[
	1,1,1,0,0,
	1,0,0,0,0,
	0,0,0,0,0,
	0,0,0,0,0
];

///////////////////
// THE "O" SHAPE //
/////////////////// 

var arrO = 
[
	1,1,0,0,0,
	1,1,0,0,0,
	0,0,0,0,0,
	0,0,0,0,0
];

///////////////////
// THE "Z" SHAPE //
/////////////////// 

var arrZ_horiz = 
[
	1,1,0,0,0,
	0,1,1,0,0,
	0,0,0,0,0,
	0,0,0,0,0
];

var arrZ_vert = 
[
	0,1,0,0,0,
	1,1,0,0,0,
	1,0,0,0,0,
	0,0,0,0,0
];

///////////////////
// THE "T" SHAPE //
/////////////////// 

var arrT_top = 
[
	0,1,0,0,0,
	1,1,1,0,0,
	0,0,0,0,0,
	0,0,0,0,0
];

var arrT_left = 
[
	0,1,0,0,0,
	1,1,0,0,0,
	0,1,0,0,0,
	0,0,0,0,0
];

var arrT_down = 
[
	0,0,0,0,0,
	1,1,1,0,0,
	0,1,0,0,0,
	0,0,0,0,0
];

var arrT_right = 
[
	0,1,0,0,0,
	0,1,1,0,0,
	0,1,0,0,0,
	0,0,0,0,0
];