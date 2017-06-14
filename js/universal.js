var player = {
	"name":"",
	"pHead":0,
	"pLeftHand":0,
	"pChest":0,
	"pRightHand":0,
	"pLeftLeg":0,
	"pRightLeg":0,
};

var enemy = {
	"Name":"",
	"eHead":0,
	"eLeftHand":0,
	"eChest":0,
	"eRightHand":0,
	"eLeftLeg":0,
	"eRightLeg":0,
};

var playerString = {};
var stringToSave = {};
var allPlayers =[];

var assets = "../assets/monster/";

var Head = [{"url":assets+"robot/head_0.png", "race":"robot"}, {"url":assets+"animal/head_0.png", "race":"animal"}, {"url":assets+"human/head_0.png", "race":"human"}];
var Chest = [{"url":assets+"robot/body_0.png", "race":"robot"}, {"url":assets+"animal/body_0.png", "race":"animal"}, {"url":assets+"human/body_0.png", "race":"human"}];
var LeftHand = [{"url":assets+"robot/hand_left_0.png", "race":"robot"}, {"url":assets+"animal/hand_left_0.png", "race":"animal"}, {"url":assets+"human/hand_left_0.png", "race":"human"}];
var RightHand = [{"url":assets+"robot/hand_right_0.png", "race":"robot"}, {"url":assets+"animal/hand_right_0.png", "race":"animal"}, {"url":assets+"human/hand_right_0.png", "race":"human"}];
var LeftLeg = [{"url":assets+"robot/leg_left_0.png", "race":"robot"}, {"url":assets+"animal/leg_left_0.png", "race":"animal"}, {"url":assets+"human/leg_left_0.png", "race":"human"}];
var RightLeg = [{"url":assets+"robot/leg_right_0.png", "race":"robot"}, {"url":assets+"animal/leg_right_0.png", "race":"animal"}, {"url":assets+"human/leg_right_0.png", "race":"human"}];

var parts = {};
parts["Head"] = Head;
parts["Chest"] = Chest;
parts["LeftHand"] = LeftHand;
parts["RightHand"] = RightHand;
parts["LeftLeg"] = LeftLeg;
parts["RightLeg"] = RightLeg;

var eTypes = ["eHead", "eLeftHand", "eChest", "eRightHand", "eLeftLeg", "eRightLeg"];
var pTypes = ["pHead", "pLeftHand", "pChest", "pRightHand", "pLeftLeg", "pRightLeg"];
var aIParts = ["aIHead", "aILeftHand", "aIChest", "aIRightHand", "aILeftLeg", "aIRightLeg"];

window.onload = function(){

	pHead.addEventListener("click", function() {changePic("pHead", Head);} );

	pChest.addEventListener("click", function() {changePic("pChest", Chest);} );

	pLeftHand.addEventListener("click", function() {changePic("pLeftHand", LeftHand);} );

	pRightHand.addEventListener("click", function() {changePic("pRightHand", RightHand);} );

	pLeftLeg.addEventListener("click", function() {changePic("pLeftLeg", LeftLeg);} );

	pRightLeg.addEventListener("click", function() {changePic("pRightLeg", RightLeg);} );

};

function currentBodypartIndex(bodyparts, url) {
	var current = -1;
	for (var i=0;i<bodyparts.length;i++) {
		if (bodyparts[i]["url"] == url) {
			current = bodyparts.indexOf(bodyparts[i]);
		}
	}
	return current;
}

function changePic(divId, bodyparts) {
	var currentUrl = $("#"+divId+" img").attr("src");
	var current = currentBodypartIndex(bodyparts, currentUrl);
	if (bodyparts[current+1]) {
		var next = current+1;
	} else {
		var next = 0;
	}
	$("#"+divId+" img").remove();
	$("#"+divId).prepend("<img src='"+bodyparts[next]["url"]+"'>");
}

function saveServerFn() {
	$.ajax({
		url: "../server.php?save="+JSON.stringify(player)
	}).done(function(data) {
		console.log('Saved monster to server.');
		console.log(data);
	});
}

function saveMonster() {
	if(checkMonster()==1) {

    getName();

    if(player.name !== "") {
      console.log("Will save now");
  		saveServerFn();
    } else {
      console.log("Insert a name for the monster");
    }
	} else {
		console.log("Monster not ready to save!");
	}
}

function getName() {
  player.name = document.getElementById('newName').value;
}

function checkMonster() {
	var ready = 1;
	for(var i=0; i<pTypes.length; i++) {
		if(player[pTypes[i]]===0){
			ready = 0;
		}
	}
	return ready;
}

function startPlay() {
    console.log("mäng algab");

// Loosin arvuti monsterile väärtused
    for (var i=0;i<aIParts.length;i++) {
        var partDiv = (aIParts[i]);
        var partName = aIParts[i].slice(2);
        console.log(aIParts[i].slice(2));
        giveAIValue(partDiv, parts[partName]);
    }
}

function randomizer(numberOfParts) {
    return Math.floor((Math.random() * numberOfParts));
}

function giveAIValue(divId, bodyparts) {
    var value = randomizer(bodyparts.length);
    $("#"+divId+" img").remove();
    $("#"+divId).prepend("<img src='"+bodyparts[value]["url"]+"'>");
    console.log(bodyparts);
    console.log(value);
}