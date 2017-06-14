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

var headUrls = ["../assets/monster/robot/head_0.png", "../assets/monster/animal/head_0.png", "../assets/monster/human/head_0.png"];
var chestUrls = ["../assets/monster/robot/body_0.png", "../assets/monster/animal/body_0.png", "../assets/monster/human/body_0.png"];
var leftHandUrls = ["../assets/monster/robot/hand_left_0.png", "../assets/monster/animal/hand_left_0.png", "../assets/monster/human/hand_left_0.png"];
var rightHandUrls = ["../assets/monster/robot/hand_right_0.png", "../assets/monster/animal/hand_right_0.png", "../assets/monster/human/hand_right_0.png"];
var leftLegUrls = ["../assets/monster/robot/leg_left_0.png", "../assets/monster/animal/leg_left_0.png", "../assets/monster/human/leg_left_0.png"];
var rightLegUrls = ["../assets/monster/robot/leg_right_0.png", "../assets/monster/animal/leg_right_0.png", "../assets/monster/human/leg_right_0.png"];

var eTypes = ["eHead", "eLeftHand", "eChest", "eRightHand", "eLeftLeg", "eRightLeg"];
var pTypes = ["pHead", "pLeftHand", "pChest", "pRightHand", "pLeftLeg", "pRightLeg"];

window.onload = function(){

	pHead.addEventListener("click", function() {changePic("pHead", headUrls);} );

	pChest.addEventListener("click", function() {changePic("pChest", chestUrls);} );

	pLeftHand.addEventListener("click", function() {changePic("pLeftHand", leftHandUrls);} );

	pRightHand.addEventListener("click", function() {changePic("pRightHand", rightHandUrls);} );

	pLeftLeg.addEventListener("click", function() {changePic("pLeftLeg", leftLegUrls);} );

	pRightLeg.addEventListener("click", function() {changePic("pRightLeg", rightLegUrls);} );

};

function changeValue(list, object, type) {
	for(var i=0; i<list.length; i++);
	player[type] += 1;

	if (player[type] == list.length+1) {
		player[type] = 1;
	}
	object.style.backgroundColor = list[player[type]-1];
}

function changePic(divId, bodyparts) {
	var currentUrl = $("#"+divId+" img").attr("src");
	$("#"+divId+" img").remove();
	var current = bodyparts.indexOf(currentUrl);
	console.log(current);
	console.log(currentUrl);
	$("#"+divId).prepend("<img src='"+bodyparts[current+1]+"'>");
	console.log(bodyparts[current+1]);
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
