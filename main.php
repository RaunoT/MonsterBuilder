<?php

	require("functions.php");

	if (!isset($_SESSION["userId"])) {

		header("Location: login.php");
		exit();
	}

	if (isset($_GET["logout"])) {

		session_destroy();

		header("Location: login.php");
		exit();
	}

?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
		<link href="https://fonts.googleapis.com/css?family=Rock+Salt" rel="stylesheet">
		<link type="text/css" rel="stylesheet" href="main.css" />
		<script src="javascript.js" charset="utf-8"></script>
		<title>Monster</title>
	</head>

	<body>

		<div class="container">

			<div class="box" id="savedPlayer">
				<div id="savedPlayerScore"></div>
				<div class="savedPlayerCreature" id="SPhead"></div>
				<div class="savedPlayerCreature" id="SPleftHand"></div>
				<div class="savedPlayerCreature" id="SPchest"></div>
				<div class="savedPlayerCreature" id="SPrightHand"></div>
				<div class="savedPlayerCreature" id="SPleftLeg"></div>
				<div class="savedPlayerCreature" id="SPrightLeg"></div>
			</div>

		</div><!--container-->

    <div id="lContainer">

			<a href="?logout=1" id="logoutBtn"><div id="logout"><span>Log out</span></div></a>

			<div id="hallOfFame"></div>

			<div class="interface">
				<div id="placeholder"></div>
				<a href="pvp.php"><div class="btn" id="PvP">PvP</div></a>
				<a href="monster.php"><div class="btn" id="PvAI">PvAI</div></a>
			</div>

		</div>

	</body>
</html>
