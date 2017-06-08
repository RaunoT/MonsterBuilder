<?php

	require("../functions.php");

	if (!isset($_SESSION["userId"])) {

		header("Location: login.php");
		exit();
	}

	$user = $_SESSION["userName"];


?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
		<link href="https://fonts.googleapis.com/css?family=Rock+Salt" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css?family=Amatic+SC:700" rel="stylesheet">
		<link type="text/css" rel="stylesheet" href="../css/style.css">
		<script type="text/javascript">
	    var user = '<?php echo $user; ?>';
		</script>
		<script src="../js/pvp.js" charset="utf-8"></script>
		<title>Monster</title>
	</head>

	<body>

		<div class="box" id="player">
			<div id="playerName"> <?php echo $user; ?> </div>
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

			<div class="box" id="enemy">
				<div id="enemyName"></div>
				<div id="enemyScore"></div>
				<div class="enemyCreature" id="eHead"></div>
				<div class="enemyCreature" id="eLeftHand"></div>
				<div class="enemyCreature" id="eChest"></div>
				<div class="enemyCreature" id="eRightHand"></div>
				<div class="enemyCreature" id="eLeftLeg"></div>
				<div class="enemyCreature" id="eRightLeg"></div>
			</div>

			<div class="interface">
        <div id="placeholder">
          <div id="searchBox">
            <input type="text" name="search" value="", placeholder="Search enemy by name">
          </div>
          <div id="search" class="sbtn">Search</div>
          <div id="random" class="sbtn">Random</div>
        </div>

				<div class="btn" id="confirmer">Confirm</div>
				<div class="btn" id="playPvP">Play</div>
			</div><!--interface-->

		</div><!--container-->
	</body>
</html>
