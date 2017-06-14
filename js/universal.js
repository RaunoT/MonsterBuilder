var player = {
//	"name":"",
	"Head":0,
	"LeftHand":0,
	"Chest":0,
	"RightHand":0,
	"LeftLeg":0,
	"RightLeg":0,
	"score":0,
};

var enemy = {
//	"name":"",
	"Head":0,
	"LeftHand":0,
	"Chest":0,
	"RightHand":0,
	"LeftLeg":0,
	"RightLeg":0,
	"score":0,
};

var playerString = {};
var stringToSave = {};
var allPlayers =[];

var assets = "../assets/monster/";

var Head = [{"url":assets+"robot/head_0.png", "race":1}, {"url":assets+"animal/head_0.png", "race":2}, {"url":assets+"human/head_0.png", "race":3}];
var Chest = [{"url":assets+"robot/body_0.png", "race":1}, {"url":assets+"animal/body_0.png", "race":2}, {"url":assets+"human/body_0.png", "race":3}];
var LeftHand = [{"url":assets+"robot/hand_left_0.png", "race":1}, {"url":assets+"animal/hand_left_0.png", "race":2}, {"url":assets+"human/hand_left_0.png", "race":3}];
var RightHand = [{"url":assets+"robot/hand_right_0.png", "race":1}, {"url":assets+"animal/hand_right_0.png", "race":2}, {"url":assets+"human/hand_right_0.png", "race":3}];
var LeftLeg = [{"url":assets+"robot/leg_left_0.png", "race":1}, {"url":assets+"animal/leg_left_0.png", "race":2}, {"url":assets+"human/leg_left_0.png", "race":3}];
var RightLeg = [{"url":assets+"robot/leg_right_0.png", "race":1}, {"url":assets+"animal/leg_right_0.png", "race":2}, {"url":assets+"human/leg_right_0.png", "race":3}];

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

	var play = document.getElementById("play");
    play.addEventListener("click", function() {
    	assignValues();
    	if (checkMonster()) {
    		resetScores();
    		startPlay();
    		assignValues();
    		findVictor();
    	} else {
    		alert("Complete your monster.");
    	}
    } );
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

function raceFromUrl(partsList, url) {
	return parts[partsList][currentBodypartIndex(parts[partsList], url)]["race"];
}

function assignValues() {
	for (name in pTypes) {
		var part = pTypes[name];
		var partUrl = $("#"+part+" img").attr("src");
		if (!partUrl.includes("starter")) {
			player[part.slice(1)] = raceFromUrl(part.slice(1), partUrl);
		}
	}
	for (name in eTypes) {
		var part = eTypes[name];
		var partUrl = $("#"+part+" img").attr("src");
		if (!partUrl.includes("starter")) {
			enemy[part.slice(1)] = raceFromUrl(part.slice(1), partUrl);
		}
	}
}

function resetScores() {
	player["score"] = 0;
    enemy["score"] = 0;
	for (var i in player) {
		$("#e"+i).removeClass("greyed");
		$("#p"+i).removeClass("greyed");
	}
}

function findVictor() {
	for (var i in player) {
		if (i != "name" && i != "score") {
			if (player[i] != enemy[i]) {
				var winningValue = calculate(player[i], enemy[i]);
				if (player[i] == winningValue) {
					$("#e"+i).addClass("greyed");
				} else {
					$("#p"+i).addClass("greyed");
				}
			} else {
				enemy["score"] += 1;
				player["score"] += 1;
			}
		}
	}
	if (player["score"] > enemy["score"]) {
		alert("You win!");
	} else {
		alert("You lose!");
	}
}

function calculate(player1, player2) {
	// Robot > Human
	// Human > Animal
	// Animal > Robot
	// robot - 1, animal - 2, human - 3
	if(player1 == 1) {
		if(player2 == 2) {
			// player2 won
			enemy["score"] += 1;
			return 2;
		} else { 
			// player1 won
			player["score"] += 1;
			return 1;
		}
	}
	if(player1 == 2) {
		if(player2 == 3) {
			// player2 won
			enemy["score"] += 1;
			return 3;
		} else { 
			// player1 won
			player["score"] += 1;
			return 2;
		}
	}
	if(player1 == 3) {
		if(player2 == 1) {
			// player2 won
			enemy["score"] += 1;
			return 1;
		} else { 
			// player1 won
			player["score"] += 1;
			return 3;
		}
	}
}

function changePic(divId, bodyparts) {
	var currentUrl = $("#"+divId+" img").attr("src");
	$("#"+divId).removeClass("greyed");
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
    console.log("Fight!");

// Loosin arvuti monsterile väärtused
    for (var i=0;i<eTypes.length;i++) {
        var partDiv = (eTypes[i]);
        var partName = eTypes[i].slice(1);
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
}

function checkMonster() {
	var ready = true;
	for(var i=0; i<pTypes.length; i++) {
		if(player[pTypes[i].slice(1)]===0){
			ready = false;
		}
	}
	return ready;
}