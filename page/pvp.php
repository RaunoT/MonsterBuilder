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

	$user = $_SESSION["userName"];


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
  	<script type="text/javascript">
  		var user = '<?php echo $user; ?>';
  	</script>
  	<script src="../js/pvp.js" charset="utf-8"></script>
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
		      	<li><a href="main.php">Home</a></li>
		      	<li class="active"><a href="pvp.php">PvP</a></li>
		      	<li><a href="monster.php">PvAI</a></li>
		    </ul>
		    <ul class="nav navbar-nav navbar-right">
		    	<li><a href="?logout=1">Logout</a></li>
		    </ul>
	  	</div>
	</nav>

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
