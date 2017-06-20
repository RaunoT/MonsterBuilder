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

var allPlayers = [];
var playerString = {};
var stringToSave = {};
var allPlayers =[];

var assets = "../assets/monster/";

// Human = 3, Animal = 2, Robot = 1

var Head = [{"url":assets+"starter/head_0.png", "race":0}, {"url":assets+"robot/head_0.png", "race":1}, {"url":assets+"animal/head_0.png", "race":2}, {"url":assets+"human/head_0.png", "race":3}, {"url":assets+"human/head_1.png", "race":3}, {"url":assets+"human/head_2.png", "race":3}, {"url":assets+"animal/head_1.png", "race":2}, {"url":assets+"animal/head_2.png", "race":2}, {"url":assets+"robot/head_1.png", "race":1}, {"url":assets+"robot/head_2.png", "race":1}];
var Chest = [{"url":assets+"starter/body_0.png", "race":0}, {"url":assets+"robot/body_0.png", "race":1}, {"url":assets+"animal/body_0.png", "race":2}, {"url":assets+"human/body_0.png", "race":3}, {"url":assets+"human/body_1.png", "race":3}, {"url":assets+"human/body_2.png", "race":3}, {"url":assets+"animal/body_1.png", "race":2}, {"url":assets+"animal/body_2.png", "race":2}, {"url":assets+"robot/body_1.png", "race":1}, {"url":assets+"robot/body_2.png", "race":1}];
var LeftHand = [{"url":assets+"starter/hand_left_0.png", "race":0}, {"url":assets+"robot/hand_left_0.png", "race":1}, {"url":assets+"animal/hand_left_0.png", "race":2}, {"url":assets+"human/hand_left_0.png", "race":3}, {"url":assets+"human/hand_left_1.png", "race":3}, {"url":assets+"human/hand_left_2.png", "race":3}, {"url":assets+"animal/hand_left_1.png", "race":2}, {"url":assets+"animal/hand_left_2.png", "race":2}, {"url":assets+"robot/hand_left_1.png", "race":1}, {"url":assets+"robot/hand_left_2.png", "race":1}];
var RightHand = [{"url":assets+"starter/hand_right_0.png", "race":0}, {"url":assets+"robot/hand_right_0.png", "race":1}, {"url":assets+"animal/hand_right_0.png", "race":2}, {"url":assets+"human/hand_right_0.png", "race":3}, {"url":assets+"human/hand_right_1.png", "race":3}, {"url":assets+"human/hand_right_2.png", "race":3}, {"url":assets+"animal/hand_right_1.png", "race":2}, {"url":assets+"animal/hand_right_2.png", "race":2}, {"url":assets+"robot/hand_right_1.png", "race":1}, {"url":assets+"robot/hand_right_2.png", "race":1}];
var LeftLeg = [{"url":assets+"starter/leg_left_0.png", "race":0}, {"url":assets+"robot/leg_left_0.png", "race":1}, {"url":assets+"animal/leg_left_0.png", "race":2}, {"url":assets+"human/leg_left_0.png", "race":3}, {"url":assets+"human/leg_left_1.png", "race":3}, {"url":assets+"human/leg_left_2.png", "race":3}, {"url":assets+"animal/leg_left_1.png", "race":2}, {"url":assets+"animal/leg_left_2.png", "race":2}, {"url":assets+"robot/leg_left_1.png", "race":1}, {"url":assets+"robot/leg_left_1.png", "race":1}];
var RightLeg = [{"url":assets+"starter/leg_right_0.png", "race":0}, {"url":assets+"robot/leg_right_0.png", "race":1}, {"url":assets+"animal/leg_right_0.png", "race":2}, {"url":assets+"human/leg_right_0.png", "race":3}, {"url":assets+"human/leg_right_1.png", "race":3}, {"url":assets+"human/leg_right_2", "race":3}, {"url":assets+"animal/leg_right_1.png", "race":2}, {"url":assets+"animal/leg_right_2.png", "race":2}, {"url":assets+"robot/leg_right_1.png", "race":1}, {"url":assets+"robot/leg_right_2.png", "race":1}];

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

	loadServerFn().then(function() {
		if (document.getElementById("opponentList")) {
			loadEnemyList();
		}
	})
	.catch(function(error) {
		console.log(error);
	});
	/*
	$.when(loadServerFn()).then(function() {
		if (document.getElementById("opponentList")) {
			loadEnemyList();
		}
	});
	*/

	if (document.getElementById("reset")) {
		document.getElementById("reset").addEventListener("click", function() {
			reset(true);
		});
	}

	document.getElementById("pHead").addEventListener("click", function() {changePic("pHead", Head, false);} );

	document.getElementById("pChest").addEventListener("click", function() {changePic("pChest", Chest, false);} );

	document.getElementById("pLeftHand").addEventListener("click", function() {changePic("pLeftHand", LeftHand, false);} );

	document.getElementById("pRightHand").addEventListener("click", function() {changePic("pRightHand", RightHand, false);} );

	document.getElementById("pLeftLeg").addEventListener("click", function() {changePic("pLeftLeg", LeftLeg, false);} );

	document.getElementById("pRightLeg").addEventListener("click", function() {changePic("pRightLeg", RightLeg, false);} );

	var play = document.getElementById("play");
    if (play) {
    	play.addEventListener("click", function() {
	    	assignValues();
	    	if (checkMonster()) {
	    		reset(false);
	    		startPlay();
	    		assignValues();
	    		document.getElementById("guide").innerHTML = "<i>The winning bodyparts have been highlighted</i><br>";
	        	document.getElementById("opponentGuide").innerHTML = "<br>";
	        	document.getElementById("heading").innerHTML = findVictor();
	    	} else {
	    		document.getElementById("heading").innerHTML = "COMPLETE YOUR MONSTER!"
	    		$("#heading").css("color", "#dc0000");
	    	}
	    });
    }

    if (document.getElementById("opponentList")) {
    	document.querySelector('body').addEventListener('click', function(event) {
			if (event.target.className == 'fightButton controlBtn') {
				assignValues();
				if (checkMonster()) {
					fight(event.target.id);
					startPlay();
					document.getElementById("guide").innerHTML = "<i>The winning bodyparts have been highlighted</i>";
		        	document.getElementById("opponentGuide").innerHTML = "<br>";
	        		document.getElementById("heading").innerHTML = findVictor();
		        }
			}
		});
    }
};

function currentBodypartIndex(bodyparts, url) {
	for (var i=0;i<bodyparts.length;i++) {
		if (bodyparts[i]["url"] == url) {
			return bodyparts.indexOf(bodyparts[i]);
		}
	}
	return -1;
}

function raceFromUrl(partsList, url) {
	return partsList[currentBodypartIndex(partsList, url)]["race"];
}

function assignValues() {
	for (name in pTypes) {
		var part = pTypes[name];
		var partUrl = $("#"+part+" img").attr("src");
		if (!partUrl.includes("starter")) {
			//player[part.slice(1)] = raceFromUrl(part.slice(1), partUrl);
			player[part.slice(1)] = partUrl;
		}
	}
	for (name in eTypes) {
		var part = eTypes[name];
		var partUrl = $("#"+part+" img").attr("src");
		if (!partUrl.includes("starter")) {
			//enemy[part.slice(1)] = raceFromUrl(part.slice(1), partUrl);
			enemy[part.slice(1)] = partUrl;
		}
	}
}

function reset(full) {
	for (var i in player) {
		if (i != "name" && i != "score") {
			if (full) {
				player[i] = 0;
				enemy[i] = 0;
				changePic("p"+i, parts[i], true);
				changePic("e"+i, parts[i], true);
			}
			$("#e"+i).removeClass("greyed");
			$("#p"+i).removeClass("greyed");
		}
		player["score"] = 0;
		enemy["score"] = 0;
	}
	document.getElementById("guide").innerHTML = "<i>Loop through different bodyparts by clicking on the corresponding slot</i>";
	document.getElementById("opponentGuide").innerHTML = "<i>After you've created a monster,  either select an opponent from the list and click play or click random to receive a random enemy</i>";
	document.getElementById("heading").innerHTML = "SINGLE-PLAYER MODE";
	$("#heading").css("color", "#ce6000");
}

function findVictor() {
	for (var i in player) {
		if (i != "name" && i != "score") {
			if (raceFromUrl(parts[i], player[i]) != raceFromUrl(parts[i], enemy[i])) {
				var winningValue = calculate(player[i], enemy[i], i);
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
		$("#heading").css("color", "#009600");
		return "YOU WIN!";
	} else if (player["score"] == enemy["score"]) {
		$("#heading").css("color", "#009600");
		return "IT'S A TIE!";
	} else {
		$("#heading").css("color", "#dc0000");
		return "YOU LOSE!";
	}
}

function calculate(player1, player2, bodypart) {
	// Robot > Human
	// Human > Animal
	// Animal > Robot
	// robot - 1, animal - 2, human - 3
	if(raceFromUrl(parts[bodypart], player1) == 1) {
		if(raceFromUrl(parts[bodypart], player2) == 2) {
			// player2 won
			enemy["score"] += 1;
			return player2;
		} else { 
			// player1 won
			player["score"] += 1;
			return player1;
		}
	}
	if(raceFromUrl(parts[bodypart], player1) == 2) {
		if(raceFromUrl(parts[bodypart], player2) == 3) {
			// player2 won
			enemy["score"] += 1;
			return player2;
		} else { 
			// player1 won
			player["score"] += 1;
			return player1;
		}
	}
	if(raceFromUrl(parts[bodypart], player1) == 3) {
		if(raceFromUrl(parts[bodypart], player2) == 1) {
			// player2 won
			enemy["score"] += 1;
			return player2;
		} else { 
			// player1 won
			player["score"] += 1;
			return player1;
		}
	}
}

function changePic(divId, bodyparts, reset) {
	var currentUrl = $("#"+divId+" img").attr("src");
	$("#"+divId).removeClass("greyed");
	var current = currentBodypartIndex(bodyparts, currentUrl);
	if (bodyparts[current+1]) {
		var next = current+1;
	} else {
		var next = 1;
	} 
	if (reset) {
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
	if(checkMonster()) {

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
	var ready = true;
	for (i in player) {
		if (i != "name" && i != "score") {
			if (player[i] == 0) {
				document.getElementById("heading").innerHTML = "COMPLETE YOUR MONSTER!"
	    		$("#heading").css("color", "#dc0000");
				return false;
			}
		}
	}
	return ready;
}

function startPlay() {
    console.log("Fight!");

	if (document.getElementById("singlePlayer")) {
		console.log("singlePlayer");
		// Loosin arvuti monsterile väärtused
	    for (var i=0;i<eTypes.length;i++) {
	        var partDiv = (eTypes[i]);
	        var partName = eTypes[i].slice(1);
	        getAi(partDiv, parts[partName]);
	    }
	} else if (document.getElementById("multiPlayer")) {
		console.log("multiPlayer");
		for (var i=0;i<eTypes.length;i++) {
	        var partDiv = (eTypes[i]);
	        var partName = eTypes[i].slice(1);
	        // TODO: function to picture saved enemy
	    }
	}

}

function randomizer(numberOfParts) {
    return Math.floor((Math.random() * (numberOfParts-1))+1);
}

function getAi(divId, bodyparts) {
	var value = randomizer(bodyparts.length);
    $("#"+divId+" img").remove();
    $("#"+divId).prepend("<img src='"+bodyparts[value]["url"]+"'>");
}

function loadEnemyList() {

	if(allPlayers.length>0) {
		var heading = document.createElement("h2");
		var span = document.createElement("span");
		var headingText = document.createTextNode("SELECT OPPONENT");
		span.className = "underline";
		heading.appendChild(span);
		span.appendChild(headingText);
		document.getElementById("opponentList").appendChild(heading);
	} else {
		var emptyListHeading = document.createElement("h3");
		var emptyListHeadingText = document.createTextNode("No saved monsters yet, be first!");
		emptyListHeading.appendChild(emptyListHeadingText);
		document.getElementById("opponentList").appendChild(emptyListHeading);
	}

	for(var i=0; i<allPlayers.length; i++) {

		var oneEnemy = document.createElement("div");
		oneEnemy.className = 'oneEnemy';

		var fightButton = document.createElement("button");
		fightButton.className = 'fightButton controlBtn';
		fightButton.id = i;
		var buttonName = document.createTextNode("Fight");
		fightButton.appendChild(buttonName);
		oneEnemy.appendChild(fightButton);
		document.getElementById("opponentList").appendChild(oneEnemy);

		var enemyNameSpan = document.createElement("span");
		enemyNameSpan.className = 'enemyName';
		var enemyName = document.createTextNode(allPlayers[i].name);
		enemyNameSpan.appendChild(enemyName);
		oneEnemy.appendChild(enemyNameSpan);
		document.getElementById("opponentList").appendChild(oneEnemy);
	}
}

function loadServerFn() {
	 return $.ajax({
		url: "../database.txt?time=" + new Date().getTime()
	}).done(function(data) {
		allPlayers = JSON.parse(data).players;
		console.log('Loaded monsters from server.');
		for (enemies in allPlayers) {
			allPlayers[enemies]["score"] = 0;
		}
	});
}

function loadEnemy(enemyIndex) {
	for(var e=0; e<allPlayers.length; e++){
		if(allPlayers[e].name==allPlayers[enemyIndex].name){
			enemy = allPlayers[e];
			assignValues();
		}
	}
}

function fight(enemyIndex) {
	document.getElementById("opponentList").style.display = 'none';
	document.getElementById("enemyMonster").style.display = 'block';
	loadEnemy(parseInt(enemyIndex));
}

function back() {
	document.getElementById("opponentList").style.display = 'block';
	document.getElementById("enemyMonster").style.display = 'none';
	reset(false);
}