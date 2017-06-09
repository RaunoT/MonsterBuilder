<?php

    define("FILENAME","database.txt");

    $database = fopen("database.txt", "r") or die("Unable to open file!");
    $databaseContents = fread($database,filesize("database.txt"));
    fclose($database);
    $jsonf = json_decode($databaseContents);


    function addToJson($newPlayer) {
        $player = new Stdclass();
        $player->name = $newPlayer->name;
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
        echo "Player added to database<br>";
    }
    
    foreach ($jsonf->players as $t) {
        echo($t->name."<br>");
    }

    // Getting data from DB
    // $.ajax({url:"../database.txt"}).done(function(data) {console.log(JSON.parse(data)["players"][0])})

?>
