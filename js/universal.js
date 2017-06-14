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

var colors = ["#ffc0cb", "#b3b3b3", "#966d4f"];// roosa, hõbedane, pruun
var eTypes = ["eHead", "eLeftHand", "eChest", "eRightHand", "eLeftLeg", "eRightLeg"];
var pTypes = ["pHead", "pLeftHand", "pChest", "pRightHand", "pLeftLeg", "pRightLeg"];

window.onload = function(){

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

	save.addEventListener("click", function() {saveMonster();} );
	save.addEventListener("mouseover", function() {pointer(save);} );

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
