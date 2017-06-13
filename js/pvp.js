var player = {
	"name":user,
	"pHead":0,
	"pLeftHand":0,
	"pChest":0,
	"pRightHand":0,
	"pLeftLeg":0,
	"pRightLeg":0,
	"won":0,
	"lost":0
};

var enemy = {
	"Name":user,
	"eHead":0,
	"eLeftHand":0,
	"eChest":0,
	"eRightHand":0,
	"eLeftLeg":0,
	"eRightLeg":0,
	"won":0,
	"lost":0
};

var playerString = {};
var stringToSave = {};
var allPlayers =[];

var colors = ["#ffc0cb", "#b3b3b3", "#966d4f"];// roosa, hõbedane, pruun
var eTypes = ["eHead", "eLeftHand", "eChest", "eRightHand", "eLeftLeg", "eRightLeg"];
var pTypes = ["pHead", "pLeftHand", "pChest", "pRightHand", "pLeftLeg", "pRightLeg"];
var enemyCreatureParts = document.getElementsByClassName("enemyCreature");
var playerPoints = 0;
var enemyPoints = 0;

window.onload = function(){

// window.addEventListener("click", function(e) {
// console.log(e);
// });

	loadServerFn();

	setTimeout(function() {
		loadPlayer();
	}, 100);


	pHead.addEventListener("click", function() {changeValue(colors, pHead, "pHead");} );
	pHead.addEventListener("mouseover", function() {pointer(pHead);} );

	pLeftHand.addEventListener("click", function() {changeValue(colors, pLeftHand, "pLeftHand");} );
	pLeftHand.addEventListener("mouseover", function() {pointer(pLeftHand);} );

	pChest.addEventListener("click", function() {changeValue(colors, pChest, "pChest");} );
	pChest.addEventListener("mouseover", function() {pointer(pChest);} );

	pRightHand.addEventListener("click", function() {changeValue(colors, pRightHand, "pRightHand");} );
	pRightHand.addEventListener("mouseover", function() {pointer(pRightHand);} );

	pLeftLeg.addEventListener("click", function() {changeValue(colors, pLeftLeg, "pLeftLeg");} );
	pLeftLeg.addEventListener("mouseover", function() {pointer(pLeftLeg);} );

	pRightLeg.addEventListener("click", function() {changeValue(colors, pRightLeg, "pRightLeg");} );
	pRightLeg.addEventListener("mouseover", function() {pointer(pRightLeg);} );

	confirmer.addEventListener("click", function() {confirmMonster();} );
	confirmer.addEventListener("mouseover", function() {pointer(confirmer);} );

	search.addEventListener("click", function() {chooseEnemy();} );
	random.addEventListener("click", function() {randomEnemy();} );


	playPvP.addEventListener("mouseover", function() {pointer(playPvP);} );

};

function changeValue(list, object, type) {
	for(var i=0; i<list.length; i++);
	player[type] += 1;

	if (player[type] == list.length+1) {
		player[type] = 1;
	}
	object.style.backgroundColor = list[player[type]-1];
}

function pointer(object) {
	object.style.cursor = "pointer";
}

function confirmMonster() {
	if(checkMonster()==1) {
		var playerString = JSON.stringify(player);
		console.log("Monster väärib savemist!");

	// console.log(playerString);
	//
	// saveServerFn();

	/////////////////////////////////////////////////pooooooooooleli

	} else {
		console.log("Monstril tervis puha korrast ära!");
	}
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

function loadPlayer() {
	for(var p=0; p<allPlayers.length; p++){
		if(allPlayers[p].name==player.name){

			console.log(player.name);
			player.name = allPlayers[p].name;
			player.pHead = allPlayers[p].pHead;
			document.getElementById('pHead').style.backgroundColor = colors[player.pHead-1];
			player.pLeftHand = allPlayers[p].pLeftHand;
			document.getElementById('pLeftHand').style.backgroundColor = colors[player.pLeftHand-1];
			player.pChest = allPlayers[p].pChest;
			document.getElementById('pChest').style.backgroundColor = colors[player.pChest-1];
			player.pRightHand = allPlayers[p].pRightHand;
			document.getElementById('pRightHand').style.backgroundColor = colors[player.pRightHand-1];
			player.pLeftLeg = allPlayers[p].pLeftLeg;
			document.getElementById('pLeftLeg').style.backgroundColor = colors[player.pLeftLeg-1];
			player.pRightLeg = allPlayers[p].pRightLeg;
			document.getElementById('pRightLeg').style.backgroundColor = colors[player.pRightLeg-1];
			player.won = allPlayers[p].won;
			player.lost = allPlayers[p].lost;

		}
	}
}

function chooseEnemy() {
	var searchingEnemy = document.getElementById('searchInput').value;
	var searchingEnemyValue = -1;
	document.getElementById('error').innerHTML = "";

	if(searchingEnemy==="") {
		document.getElementById('error').innerHTML = "Insert monster name";
	} else {
		for(var i=0; i<allPlayers.length; i++) {
			if(allPlayers[i].Name==searchingEnemy) {
				searchingEnemyValue = i;
			}
		}

		if(searchingEnemyValue==-1) {
			document.getElementById('error').innerHTML = "No such monster in the database";
		} else {
			loadEnemy(searchingEnemyValue);
		}
	}
}

function randomEnemy() {
	var randomlyChosenEnemy = Math.floor((Math.random() * allPlayers.length));
	document.getElementById('error').innerHTML = "";
	
	if(allPlayers[randomlyChosenEnemy].Name==player.Name) {
		randomEnemy();
	} else {
		loadEnemy(randomlyChosenEnemy);
	}
}

function loadEnemy(chosenEnemy) {
	for(var e=0; e<allPlayers.length; e++){
		if(allPlayers[e].Name==allPlayers[chosenEnemy].Name){

			enemy.Name = allPlayers[e].Name;
			document.getElementById('enemyName').innerHTML = enemy.Name;
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
			enemy.won = allPlayers[e].won;
			enemy.lost = allPlayers[e].lost;

			console.log(enemy.Name);

		}
	}
}


function loadServerFn() {
	console.log('loadServer');

	// POST server.php save=mingivaartus
	var xmlDoc = new XMLHttpRequest();

	xmlDoc.open('GET', '../database.txt', true);

	xmlDoc.onreadystatechange = function() {
		if (xmlDoc.readyState === 4 && xmlDoc.status === 200) {
			// tekstifaili sisu teen objektiks ja võtan väärtuse sisse
			var JSobject = JSON.parse(xmlDoc.responseText);
			allPlayers = JSobject["players"];
		}
	};
	xmlDoc.send();
}



function saveServerFn() {
	console.log('saveServer');

	var stringToSave = player;

	// POST server.php save=mingivaartus
	var xmlDoc = new XMLHttpRequest();
	xmlDoc.open('GET', '../server.php?save='+JSON.stringify(stringToSave), true);
	xmlDoc.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xmlDoc.onreadystatechange = function() {
		if (xmlDoc.readyState === 4 && xmlDoc.status === 200) {
			console.log(xmlDoc.responseText);
		}
	};

	xmlDoc.send();

}


function startPlay() {
	console.log("mäng algab");
	// Loosin arvuti monsterile väärtused
	for(var i=0; i<AICreatureParts.length; i++) {
		giveAIValue(AICreatureParts[i], types[i]);
	}
	// Loen mõlema monsteri punktid kahe süsteemi kaudu kokku
	for(var j=0; j<types.length; j++) {
		AIPoints += valuate(valueCounter[types[j]], pTypes);
	}

	for(var k=0; k<types.length; k++) {
		playerPoints += valuate(valueCounter[pTypes[k]], types);
	}

	for(var l=0; l<types.length; l++) {
		AIPoints += valuate2(valueCounter[types[l]], valueCounter[pTypes[l]]);
	}

	for(var m=0; m<pTypes.length; m++) {
		playerPoints += valuate2(valueCounter[pTypes[m]], valueCounter[types[m]]);
	}

	// Kuvan punktid ja muudan võitja(te) punktide tausta kollaseks
	var playerScore = document.getElementById('playerScore');
	playerScore.innerHTML = getPlayerScore();

	var AIScore = document.getElementById('AIScore');
	AIScore.innerHTML = getAIScore();

	winner();
}

function randomizer() {
	return Math.floor((Math.random() * 3) + 1);
}

function valuate(partValue, list) {
	var points = 0;
	if(partValue==1) {
		for(var i=0; i<list.length; i++) {
			if(valueCounter[list[i]]==2 || valueCounter[list[i]]===0){
				points +=1;
			}
		}
	}

	else if(partValue==2) {
		for(var j=0; j<list.length; j++) {
			if(valueCounter[list[j]]==3 || valueCounter[list[j]]===0){
				points +=1;
			}
		}
	}

	else if(partValue==3) {
		for(var k=0; k<list.length; k++) {
			if(valueCounter[list[k]]==1 || valueCounter[list[k]]===0){
				points +=1;
			}
		}
	}

	return points;
}

function valuate2(subjectPartValue, partValue) {
	var points = 0;
	if(subjectPartValue==1) {
		if(partValue==2 || partValue===0) {
			points += 1;
		}
	}

	if(subjectPartValue==2) {
		if(partValue==3 || partValue===0) {
			points += 1;
		}
	}

	if(subjectPartValue==3) {
		if(partValue==1 || partValue===0) {
			points += 1;
		}
	}

	return points;
}


function winner(){

	AIScore.style.backgroundColor = "#eee";
	playerScore.style.backgroundColor = "#eee";

	if(AIPoints===0 && playerPoints===0) {}

	else if(AIPoints>playerPoints) {
		AIScore.style.backgroundColor = "yellow";
	}

	else if(AIPoints<playerPoints) {
		playerScore.style.backgroundColor = "yellow";
	}

	else{
		AIScore.style.backgroundColor = "yellow";
		playerScore.style.backgroundColor = "yellow";
	}
}

function getPlayerScore() {
	this.score = playerPoints;
	return score;
}

function getAIScore() {
	this.score = AIPoints;
	return score;
}
