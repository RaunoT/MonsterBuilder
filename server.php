<?php

    define("FILENAME","database.json");

    $database = fopen("database.json", "r") or die("Unable to open file!");
    $databaseContents = fread($database,filesize("database.json"));
    fclose($database);
    $jsonf = json_decode($databaseContents);


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
        echo "Player added to database";
    }
    
    foreach ($jsonf->players as $t) {
        echo($t->Name."<br>");
    }

?>
