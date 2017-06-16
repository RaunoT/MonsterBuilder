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
				fight(event.target.id);
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
			changePic("p"+i, parts[i], true);
			changePic("e"+i, parts[i], true);
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
    return Math.floor((Math.random() * (numberOfParts-1))+1);
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

			enemy.name = allPlayers[e].name;
			document.getElementById('enemyName').innerHTML = enemy.name;
			enemy.eHead = allPlayers[e].pHead;
			document.getElementById('eHead').style.backgroundColor = colors[enemy.eHead-1];
			enemy.eLeftHand = allPlayers[e].pLeftHand;
			document.getElementById('eLeftHand').style.backgroundColor = colors[enemy.eLeftHand-1];
			enemy.eChest = allPlayers[e].pChest;
			document.getElementById('eChest').style.backgroundColor = colors[enemy.eChest-1];
			enemy.eRightHand = allPlayers[e].pRightHand;
			document.getElementById('eRightHand').style.backgroundColor = colors[enemy.eRightHand-1];
			enemy.eLeftLeg = allPlayers[e].pLeftLeg;
			document.getElementById('eLeftLeg').style.backgroundColor = colors[enemy.eLeftLeg-1];
			enemy.eRightLeg = allPlayers[e].pRightLeg;
			document.getElementById('eRightLeg').style.backgroundColor = colors[enemy.eRightLeg-1];

			console.log(enemy.eHead);

		}
	}
}

function loadServerFn() {
	return $.ajax({
		url: "../database.txt"
	}).done(function(data) {
		allPlayers = JSON.parse(data).players;
		console.log('Loaded monsters from server.');
	});
}