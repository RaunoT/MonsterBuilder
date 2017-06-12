<?php

	require("../functions.php");

	if (!isset($_SESSION["userId"])) {

		header("Location: index.php");
		exit();
	}

	if (isset($_GET["logout"])) {

		session_destroy();

		header("Location: index.php");
		exit();
	}

?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Monster Builder</title>
    <!-- Bootstrap -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  	<script src="https://cdnjs.cloudflare.com/ajax/libs/1000hz-bootstrap-validator/0.11.9/validator.min.js"></script>
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Luckiest+Guy" rel="stylesheet">
    <!-- CSS -->
    <link type="text/css" rel="stylesheet" href="../css/style.css">
</head>
<body>

	<!-- Fixed top navbar -->
	<nav class="navbar navbar-inverse navbar-fixed-top">
		<div class="container-fluid">
	    	<div class="navbar-header">
	    		<!-- Burgermenüü -->
	    		<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
			        <span class="sr-only">Toggle navigation</span>
			        <span class="icon-bar"></span>
			        <span class="icon-bar"></span>
			        <span class="icon-bar"></span>
				</button>
	      		<a class="navbar-brand" href="main.php">Monster Builder</a>
	    	</div>
	    	<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			    <ul class="nav navbar-nav">
			    	<li><a href="monster.php">Singleplayer</a></li>
			      	<li><a href="pvp.php">Multiplayer</a></li>
			    </ul>
			    <ul class="nav navbar-nav navbar-right">
			    	<li>
						<a href="?logout=1">
							<span class="glyphicon glyphicon-log-out"></span>
						</a>
			    	</li>
			    </ul>
			</div>
	  	</div>
	</nav>

	<div class="box" id="savedPlayer">
		<div id="savedPlayerScore"></div>
		<div class="savedPlayerCreature" id="SPhead"></div>
		<div class="savedPlayerCreature" id="SPleftHand"></div>
		<div class="savedPlayerCreature" id="SPchest"></div>
		<div class="savedPlayerCreature" id="SPrightHand"></div>
		<div class="savedPlayerCreature" id="SPleftLeg"></div>
		<div class="savedPlayerCreature" id="SPrightLeg"></div>
	</div>

</body>
</html>
