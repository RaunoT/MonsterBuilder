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
	      		<a class="navbar-brand" href="#">Monster Builder</a>
	    	</div>
		    <ul class="nav navbar-nav">
		      	<li class="active"><a href="main.php">Home</a></li>
		      	<li><a href="pvp.php">PvP</a></li>
		      	<li><a href="monster.php">PvAI</a></li>
		    </ul>
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




			<a href="?logout=1" id="logoutBtn"><div id="logout"><span>Log out</span></div></a>



</body>
</html>
