<?php

    define("FILENAME","database.txt");
    $users = array();

    $database = fopen("database.txt", "r") or die("Unable to open file!");
    if (!(filesize("database.txt")>0)) {
        $databaseContents = fread($database,1);
    } else {
        $databaseContents = fread($database,filesize("database.txt"));
    }
    fclose($database);
    $jsonf = json_decode($databaseContents);

    if (!is_null($jsonf)) {
	    if (property_exists($jsonf, "players")) {
	    	if (is_array($jsonf->players)) {
	    		foreach ($jsonf->players as $player) {
                    echo($player->name."<br>");
                    if (!in_array($player->name, $users)) {
                        array_push($users, $player->name);
                    }
	    		}
	    	}
	    }
	}

    function addToJson($newPlayer) {
        if (!property_exists($newPlayer, "name") || !property_exists($newPlayer, "Head") || !property_exists($newPlayer, "LeftHand") || !property_exists($newPlayer, "RightHand") || !property_exists($newPlayer, "Chest") || !property_exists($newPlayer, "LeftLeg") || !property_exists($newPlayer, "RightLeg")) {
            return "Not a coompleted robot";
        }
        $player = new Stdclass();
        $player->name = $newPlayer->name;
        $player->Head = $newPlayer->Head;
        $player->LeftHand = $newPlayer->LeftHand;
        $player->RightHand = $newPlayer->RightHand;
        $player->Chest = $newPlayer->Chest;
        $player->LeftLeg = $newPlayer->LeftLeg;
        $player->RightLeg = $newPlayer->RightLeg;
        return $player;
    }

    if (isset($_GET["save"]) && !empty($_GET["save"])){
        $toAdd = addToJson(json_decode($_GET["save"]));
        if (is_object($toAdd)) {
            if (!is_null($jsonf)) {
                if (property_exists($jsonf, "players")) {
                    if (is_array($jsonf->players)) {
                        if (!in_array($toAdd->name, $users)) {
                            array_push($jsonf->players, $toAdd);
                        } else {
                            foreach ($jsonf->players as $player) {
                                if ($player->name == $toAdd->name) {
                                    $jsonf->players[array_search($player, $jsonf->players)] = $toAdd;
                                }
                            }
                        }
                    } else {
                        $jsonf->players = [];
                        if (!in_array($toAdd->name, $users)) {
                            array_push($jsonf->players, $toAdd);
                        }
                    }
                } else {
                    $jsonf->players = [];
                    if (!in_array($toAdd->name, $users)) {
                        array_push($jsonf->players, $toAdd);
                    }
                }
            } else {
                $jsonf = new Stdclass();
                $jsonf->players = [];
                if (!in_array($toAdd->name, $users)) {
                    array_push($jsonf->players, $toAdd);
                }
            }

            //var_dump($jsonf);
            //echo "<br>";
            if (file_put_contents(FILENAME, json_encode($jsonf))){
                return ("Saved successfully");
            } else {
                return ("Error while saving");
            }
        }
    } else {
        return "Error while saving";
    }




    // Getting data from DB
    // $.ajax({url:"../database.txt"}).done(function(data) {console.log(JSON.parse(data)["players"][0])})

?>
