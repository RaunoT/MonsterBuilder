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

var numberOfRaces = 3+1;

var partis = [{"offset":220,"race":0}, {"offset":440,"race":1}, {"offset":660,"race":2}, {"offset":880,"race":3}, {"offset":1100,"race":1}, {"offset":1320,"race":2}, {"offset":1540,"race":3}, {"offset":1760,"race":1}, {"offset":1980,"race":2}, {"offset":2200,"race":3}]


var allPlayers = [];
var playerString = {};
var stringToSave = {};
var allPlayers =[];


// Human = 3, Animal = 2, Robot = 1

var heads = {"url":"../assets/monster/heads.png", "parts":partis};
var chests = {"url":"../assets/monster/bodies.png", "parts":partis};
var rightArms = {"url":"../assets/monster/arms_right.png", "parts":partis};
var leftArms = {"url":"../assets/monster/arms_left.png", "parts":partis};
var rightLegs = {"url":"../assets/monster/legs_right.png", "parts":partis};
var leftLegs = {"url":"../assets/monster/legs_left.png", "parts":partis};
/*
var assets = "../assets/monster/";
var Head = [{"url":assets+"starter/head_0.png", "race":0}, {"url":assets+"robot/head_0.png", "race":1}, {"url":assets+"animal/head_0.png", "race":2}, {"url":assets+"human/head_0.png", "race":3}, {"url":assets+"human/head_1.png", "race":3}];
var Chest = [{"url":assets+"starter/body_0.png", "race":0}, {"url":assets+"robot/body_0.png", "race":1}, {"url":assets+"animal/body_0.png", "race":2}, {"url":assets+"human/body_0.png", "race":3}, {"url":assets+"human/body_1.png", "race":3}];
var LeftHand = [{"url":assets+"starter/hand_left_0.png", "race":0}, {"url":assets+"robot/hand_left_0.png", "race":1}, {"url":assets+"animal/hand_left_0.png", "race":2}, {"url":assets+"human/hand_left_0.png", "race":3}, {"url":assets+"human/hand_left_1.png", "race":3}];
var RightHand = [{"url":assets+"starter/hand_right_0.png", "race":0}, {"url":assets+"robot/hand_right_0.png", "race":1}, {"url":assets+"animal/hand_right_0.png", "race":2}, {"url":assets+"human/hand_right_0.png", "race":3}, {"url":assets+"human/hand_right_1.png", "race":3}];
var LeftLeg = [{"url":assets+"starter/leg_left_0.png", "race":0}, {"url":assets+"robot/leg_left_0.png", "race":1}, {"url":assets+"animal/leg_left_0.png", "race":2}, {"url":assets+"human/leg_left_0.png", "race":3}, {"url":assets+"human/leg_left_1.png", "race":3}];
var RightLeg = [{"url":assets+"starter/leg_right_0.png", "race":0}, {"url":assets+"robot/leg_right_0.png", "race":1}, {"url":assets+"animal/leg_right_0.png", "race":2}, {"url":assets+"human/leg_right_0.png", "race":3}, {"url":assets+"human/leg_right_1.png", "race":3}];

var parts = {};
parts["Head"] = Head;
parts["Chest"] = Chest;
parts["LeftHand"] = LeftHand;
parts["RightHand"] = RightHand;
parts["LeftLeg"] = LeftLeg;
parts["RightLeg"] = RightLeg;
*/

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

	if (document.getElementById("reset")) {
		document.getElementById("reset").addEventListener("click", function() {
			reset();
		});
	}

	document.getElementById("pHead").addEventListener("click", function() {changePic("pHead", false);} );

	document.getElementById("pChest").addEventListener("click", function() {changePic("pChest", false);} );

	document.getElementById("pLeftHand").addEventListener("click", function() {changePic("pLeftHand", false);} );

	document.getElementById("pRightHand").addEventListener("click", function() {changePic("pRightHand", false);} );

	document.getElementById("pLeftLeg").addEventListener("click", function() {changePic("pLeftLeg", false);} );

	document.getElementById("pRightLeg").addEventListener("click", function() {changePic("pRightLeg", false);} );

	var play = document.getElementById("play");
    if (play) {
    	play.addEventListener("click", function() {
	    	assignValues();
	    	if (checkMonster()) {
	    		resetScores();
	    		startPlay();
	    		assignValues();
	    		document.getElementById("guide").innerHTML = "<i>The winning bodyparts have been highlighted</i>";
	        	document.getElementById("opponentGuide").innerHTML = findVictor();
	    	} else {
	    		alert("Complete your monster.");
	    	}
	    });
    }

    if (document.getElementById("opponentList")) {
    	document.querySelector('body').addEventListener('click', function(event) {
			if (event.target.className == 'fightButton') {
				assignValues();
				if (checkMonster()) {
					fight(event.target.id);
					startPlay();
					document.getElementById("guide").innerHTML = "<i>The winning bodyparts have been highlighted</i>";
		        	document.getElementById("opponentGuide").innerHTML = findVictor();
		        }
			}
		});
    }
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

function reset() {
	for (var i in player) {
		if (i != "name" && i != "score") {
			player[i] = 0;
			enemy[i] = 0;
			$("#e"+i).removeClass("greyed");
			$("#p"+i).removeClass("greyed");
			changePic("p"+i, true);
			changePic("e"+i, true);
		}
		player["score"] = 0;
		enemy["score"] = 0;
	}
	document.getElementById("guide").innerHTML = "<i>Loop through different bodyparts by clicking on the corresponding slot</i>";
	document.getElementById("opponentGuide").innerHTML = "<i>After you've created a monster,  either select an opponent from the list and click play or click random to receive a random enemy</i>";
	$("#opponentGuide").css("color", "#afafaf");
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
		$("#opponentGuide").css("color", "#009600");
		return "You win!";
	} else {
		$("#opponentGuide").css("color", "#dc0000");
		return "You lose!";
	}
}

function calculate(player1, player2) {
	// Robot > Human
	// Human > Animal
	// Animal > Robot
	// robot - 1, animal - 2, human - 3
	if(player1 % numberOfRaces == 1) {
		if(player2 % numberOfRaces == 2) {
			// player2 won
			enemy["score"] += 1;
			return 2;
		} else { 
			// player1 won
			player["score"] += 1;
			return 1;
		}
	}
	if(player1 % numberOfRaces == 2) {
		if(player2 % numberOfRaces == 3) {
			// player2 won
			enemy["score"] += 1;
			return 3;
		} else { 
			// player1 won
			player["score"] += 1;
			return 2;
		}
	}
	if(player1 % numberOfRaces == 3) {
		if(player2 % numberOfRaces == 1) {
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

function pictureEnemy(divId, numberOfParts, random) {
	if (random) {
		var offset = randomizer(numberOfParts) * -220;
	} else {
		var offset = enemy[divId.slice(1)] * -220;
	}
	$("#"+divId).css("background-position-x", offset+"px");
}

function changePic(divId, reset) {
	var currentOffset = parseInt($("#"+divId).css("background-position-x"));
	$("#"+divId).removeClass("greyed");
	if (currentOffset > -1980) {
		var newOffset = currentOffset - 220;
	} else {
		var newOffset = -220;
	} 
	if (reset) {
		var newOffset = 0;
	}
	$("#"+divId).css("background-position-x", newOffset+"px");
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
				console.log("Complete your monster first");
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
	        pictureEnemy(partDiv, parts[partName], true);
	    }
	} else if ($("#multiPlayer")) {
		console.log("multiPlayer");
		for (var i=0;i<eTypes.length;i++) {
	        var partDiv = (eTypes[i]);
	        var partName = eTypes[i].slice(1);
	        pictureEnemy(partDiv, parts[partName], false);
	    }
	}

}

function randomizer(numberOfParts) {
    return Math.floor((Math.random() * (numberOfParts-1))+1);
}

function loadEnemyList() {

	if(allPlayers.length>0) {
		var heading = document.createElement("h3");
		var headingText = document.createTextNode("Choose an Enemy to fight with");
		heading.appendChild(headingText);
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

		var enemyNameSpan = document.createElement("span");
		enemyNameSpan.className = 'enemyName';
		var enemyName = document.createTextNode(allPlayers[i].name);
		enemyNameSpan.appendChild(enemyName);
		oneEnemy.appendChild(enemyNameSpan);
		document.getElementById("opponentList").appendChild(oneEnemy);


		var fightButton = document.createElement("button");
		fightButton.className = 'fightButton';
		fightButton.id = i;
		var buttonName = document.createTextNode("Fight");
		fightButton.appendChild(buttonName);
		oneEnemy.appendChild(fightButton);
		document.getElementById("opponentList").appendChild(oneEnemy);

	}
}

function loadEnemy(chosenEnemy) {
	for(var e=0; e<allPlayers.length; e++){
		if(allPlayers[e].name==allPlayers[chosenEnemy].name){
			enemy = allPlayers[e];
			assignValues();
		}
	}
}

function loadServerFn() {
	return $.ajax({
		url: "../database.txt"
	}).done(function(data) {
		allPlayers = JSON.parse(data).players;
		console.log('Loaded monsters from server.');
		for (enemies in allPlayers) {
			allPlayers[enemies]["score"] = 0;
		}
	});
}

function fight(enemy) {
	document.getElementById("opponentList").style.display = 'none';
	document.getElementById("enemyMonster").style.display = 'block';
	loadEnemy(parseInt(enemy));
}
