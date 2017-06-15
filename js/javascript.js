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
    play.addEventListener("click", function() {
        startPlay();
    });

};


