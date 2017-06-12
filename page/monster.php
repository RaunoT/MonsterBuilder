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
    <!-- JS -->
    <script src="../js/javascript.js"></script>
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
			      	<li><a href="pvp.php">Singleplayer</a></li>
			      	<li class="active"><a href="monster.php">Multiplayer</a></li>
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

	<div class="box" id="player">
		<div id="playerScore"></div>
		<div class="playerCreature" id="pHead"></div>
		<div class="playerCreature" id="pLeftHand"></div>
		<div class="playerCreature" id="pChest"></div>
		<div class="playerCreature" id="pRightHand"></div>
		<div class="playerCreature" id="pLeftLeg"></div>
		<div class="playerCreature" id="pRightLeg"></div>
	</div><!--.box player-->

	<div class="container">

		<a href="main.php"><div id="back"><span>Back</span></div></a>

		<div class="box" id="AI">
			<div id="AIScore"></div>
			<div class="AICreature" id="head"></div>
			<div class="AICreature" id="leftHand"></div>
			<div class="AICreature" id="chest"></div>
			<div class="AICreature" id="rightHand"></div>
			<div class="AICreature" id="leftLeg"></div>
			<div class="AICreature" id="rightLeg"></div>
		</div><!--.box AI-->

		<div class="interface">
			<div id="placeholder"></div>
			<div class="btn" id="refresh">Reload</div>
			<div class="btn" id="play">Play</div>
		</div><!--interface-->

	</div><!--container-->

</body>
</html>
