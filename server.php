<?php

    define("FILENAME","database.txt");

    $database = fopen("database.txt", "r") or die("Unable to open file!");
    if(!(filesize("database.txt")>0)) {
    	$databaseContents = fread($database,1);
    } else {
    	$databaseContents = fread($database,filesize("database.txt"));
    }
    fclose($database);
    $jsonf = json_decode($databaseContents);


    function addToJson($newPlayer) {
    	if(!property_exists($newPlayer, "name") || !property_exists($newPlayer, "pHead") || !property_exists($newPlayer, "pLeftHand") || !property_exists($newPlayer, "pRightHand") || !property_exists($newPlayer, "pChest") || !property_exists($newPlayer, "pLeftLeg") || !property_exists($newPlayer, "pRightLeg")) {
    		return "Not a coompleted robot";
    	}
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
    
  	if(isset($_GET["save"]) && !empty($_GET["save"])){
    	$toAdd = addToJson(json_decode($_GET["save"]));
    	if(is_object($toAdd)) {
    		if(!is_null($jsonf)) {
			    if(property_exists($jsonf, "players")) {
			    	if(is_array($jsonf->players)) {
			    		array_push($jsonf->players, $toAdd);
			    	} else {
			    		$jsonf->players = [];
			    		array_push($jsonf->players, $toAdd);
			    	}
			    } else {
			    	$jsonf->players = [];
			    	array_push($jsonf->players, $toAdd);
			    }
			} else {
				$jsonf = new Stdclass();
				$jsonf->players = [];
			    array_push($jsonf->players, $toAdd);
			}
    		
    		//var_dump($jsonf);
    		//echo "<br>";
	    	if(file_put_contents(FILENAME, json_encode($jsonf))){
	    		return ("Saved successfully");
	    	} else {
	    		return ("Error while saving");
	    	}
    	}
  	} else {
  		return "Error while saving";
  	}
    
    /*
    if(!is_null($jsonf)) {
	    if(property_exists($jsonf, "players")) {
	    	if(is_array($jsonf->players)) {
	    		foreach ($jsonf->players as $t) {
	        		echo($t->name."<br>");
	    		}
	    	}
	    }
	}
	*/

    // Getting data from DB
    // $.ajax({url:"../database.txt"}).done(function(data) {console.log(JSON.parse(data)["players"][0])})

?>
