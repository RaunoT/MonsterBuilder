var valueCounter = {
    "pHead": 0,
    "pLeftHand": 0,
    "pChest": 0,
    "pRightHand": 0,
    "pLeftLeg": 0,
    "pRightLeg":0,
    "head": 0,
    "leftHand": 0,
    "chest": 0,
    "rightHand": 0,
    "leftLeg": 0,
    "rightLeg":0
};
var Head = [{"url":"../assets/monster/robot/head_0.png", "race":"robot"}, {"url":"../assets/monster/animal/head_0.png", "race":"animal"}, {"url":"../assets/monster/human/head_0.png", "race":"human"}];
var Chest = [{"url":"../assets/monster/robot/body_0.png", "race":"robot"}, {"url":"../assets/monster/animal/body_0.png", "race":"animal"}, {"url":"../assets/monster/human/body_0.png", "race":"human"}];
var LeftHand = [{"url":"../assets/monster/robot/hand_left_0.png", "race":"robot"}, {"url":"../assets/monster/animal/hand_left_0.png", "race":"animal"}, {"url":"../assets/monster/human/hand_left_0.png", "race":"human"}];
var RightHand = [{"url":"../assets/monster/robot/hand_right_0.png", "race":"robot"}, {"url":"../assets/monster/animal/hand_right_0.png", "race":"animal"}, {"url":"../assets/monster/human/hand_right_0.png", "race":"human"}];
var LeftLeg = [{"url":"../assets/monster/robot/leg_left_0.png", "race":"robot"}, {"url":"../assets/monster/animal/leg_left_0.png", "race":"animal"}, {"url":"../assets/monster/human/leg_left_0.png", "race":"human"}];
var RightLeg = [{"url":"../assets/monster/robot/leg_right_0.png", "race":"robot"}, {"url":"../assets/monster/animal/leg_right_0.png", "race":"animal"}, {"url":"../assets/monster/human/leg_right_0.png", "race":"human"}];

var parts = {};
parts["Head"] = Head;
parts["Chest"] = Chest;
parts["LeftHand"] = LeftHand;
parts["RightHand"] = RightHand;
parts["LeftLeg"] = LeftLeg;
parts["RightLeg"] = RightLeg;


var types = ["head", "leftHand", "chest", "rightHand", "leftLeg", "rightLeg"];
var pTypes = ["pHead", "pLeftHand", "pChest", "pRightHand", "pLeftLeg", "pRightLeg"];
var aIParts = ["aIHead", "aILeftHand", "aIChest", "aIRightHand", "aILeftLeg", "aIRightLeg"];


window.onload = function(){

    pHead.addEventListener("click", function() {changeValue(colors, pHead, "pHead");} );

    pLeftHand.addEventListener("click", function() {changeValue(colors, pLeftHand, "pLeftHand");} );

    pChest.addEventListener("click", function() {changeValue(colors, pChest, "pChest");} );

    pRightHand.addEventListener("click", function() {changeValue(colors, pRightHand, "pRightHand");} );

    pLeftLeg.addEventListener("click", function() {changeValue(colors, pLeftLeg, "pLeftLeg");} );

    pRightLeg.addEventListener("click", function() {changeValue(colors, pRightLeg, "pRightLeg");} );

    var play = document.getElementById("play");
    play.addEventListener("click", function() {startPlay();} );

    play.addEventListener("click", function() {
    document.getElementById("guide").innerHTML = "<i>The winning bodyparts have been highlighted</i>";
    });

    play.addEventListener("click", function() {
    document.getElementById("opponentGuide").innerHTML = "<br>";
    });

    document.getElementById("refresh").addEventListener("click", function(){
    document.getElementById("opponentGuide").innerHTML = "<i>After you click play, the computer will automatically generate an enemy monster for you</i>";
    });

    document.getElementById("refresh").addEventListener("click", function(){
    document.getElementById("guide").innerHTML = "<i>Loop through different bodyparts by clicking on the corresponding slot</i>";
    });
};


function changeValue(list, object, type) {
    for(var i=0; i<list.length; i++);
    valueCounter[type] += 1;
    if (valueCounter[type] == list.length+1) {
        valueCounter[type] = 1;
    }
    object.style.backgroundColor = list[valueCounter[type]-1];
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