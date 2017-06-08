<?php

    $allPlayers = array();

    define("FILENAME","database.json");
    if(isset($_POST["save"]) && !empty($_POST["save"])){
        saveToFile($_POST["save"]);
    }

    function saveToFile($stringToSave){
        if(file_put_contents(FILENAME, $stringToSave)){
            echo ('{"message":"saved successfully"}');
        }
    }

    $myfile = fopen("database.txt", "r") or die("Unable to open file!");
    $contents = fread($myfile,filesize("database.txt"));
    fclose($myfile);
    $jsonf = json_decode($contents);


    function addToJson($newPlayer) {
        $player = new Stdclass();
        $player->Name = $newPlayer->Name;
        $player->pHead = $newPlayer->pHead;
        $player->pLeftHand = $newPlayer->pLeftHand;
        $player->pRightHand = $newPlayer->pRightHand;
        $player->pChest = $newPlayer->pChest;
        $player->pLeftLeg = $newPlayer->pLeftLeg;
        $player->pRightLeg = $newPlayer->pRightLeg;
        return $player;
    }
    

    $toAdd = addToJson($jsonf->players[0], $jsonf->players);
    array_push($jsonf->players, $toAdd);
    if (file_put_contents(FILENAME, json_encode($jsonf))) {
        //var_dump($jsonf);
    }
    
    //print_r($jsonf->players);
    //echo json_decode($contents);
    //var_dump($jsonf->players[1]->Name);
    foreach ($jsonf->players as $t) {
        //echo ($t->Name);
        //array_push($allPlayers, $t->Name);
        echo($t->Name."<br>");
    }

    //print_r($allPlayers);






?>
