<?php

	require("../functions.php");

	if (isset($_SESSION["userId"])) {
		header("Location: main.php");
		exit();
	}

	// Muutujad
	$loginEmail = "";
	$loginEmailError = "";
	$loginPasswordError = "";
	$signupEmail = "";
	$signupEmailError = "";
	$signupPasswordError = "";
	$signupPasswordSizeError = "";
	$userNameError = "";
	$userName = "";


	// Kas keegi vajutas nuppu, ja kas see on olemas
	if (isset ($_POST["loginEmail"])) {
		if (empty ($_POST["loginEmail"])) {
			$loginEmailError="*";
		} else {
			$loginEmail = cleanInput($_POST["loginEmail"]);
		}
	}

	if (isset ($_POST["loginPassword"])) {
		if (empty ($_POST["loginPassword"])) {
			$loginPasswordError="*";
		}
	}

	if (isset ($_POST["signupEmail"])) {
		if (empty ($_POST["signupEmail"])) {
			$signupEmailError="*";
		} else {
			$signupEmail = cleanInput($_POST["signupEmail"]);
		}
	}

	if (isset ($_POST["signupPassword"])) {
		if (empty ($_POST["signupPassword"])) {
			$signupPasswordError="*";
		} else {
			if (strlen ($_POST["signupPassword"]) < 8 ) {
				$signupPasswordSizeError="*Parool peab olema vähemalt 8 tähemärki pikk";
			}
		}
	}

	if (isset ($_POST["userName"])) {
		if (empty ($_POST["userName"])) {
			$userNameError="*";
		} else {
			$userName = cleanInput($_POST["userName"]);
		}
	}

	if ( $signupEmailError == "" &&
		 $signupPasswordError == "" &&
		 $signupPasswordSizeError == "" &&
		 $userNameError == "" &&
		 isset($_POST["signupEmail"]) &&
		 isset($_POST["signupPassword"]) &&
		 isset($_POST["userName"])
	) {

		$password = hash("sha512", $_POST["signupPassword"]);

		signup($signupEmail, $password, $userName);

		$signupEmail = "";
		$userName = "";
	}

	$notice = "";

	if ( isset($_POST["loginEmail"]) &&
		 isset($_POST["loginPassword"]) &&
		 !empty($_POST["loginEmail"]) &&
		 !empty($_POST["loginPassword"])
	) {
		$notice = login($_POST["loginEmail"], $_POST["loginPassword"]);
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

	<h1>Monster Builder</h1>
	<br><br>
	<div class="container-fluid">
		<div class="row">
	    	<div class="col-sm-4 col-sm-offset-4 text-center">
	    		<h2>Login</h2>
	    		<form method="POST" data-toggle="validator" role="form">
	    			<div class="input-group has-feedback">
	    				<span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
			    		<input class="form-control" name="loginEmail" placeholder="Email" value="<?=$loginEmail;?>" type="Email" data-error="Invalid email address!" required><!--<span class="error"><?php echo $loginEmailError; ?></span>-->
			    		<span class="glyphicon form-control-feedback" aria-hidden="true"></span>
			    		<div class="help-block with-errors"></div>
			    	</div>
			    	<br>
			    	<div class="input-group has-feedback">
			    		<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
			    		<input class="form-control" name="loginPassword" placeholder="Password" type="password" required><!--<span class="error"><?php echo $loginPasswordError; ?></span>-->
			    	</div>
			   		<br>
		    		<input class="btn" type="submit" value="Log in">
		    		<button type="button" class="btn" data-toggle="modal" data-target="#Signup">Sign up</button>
    			</form>
	    	</div>
	    </div>
	</div>

</body>
</html>

<?php require("../assets/modal/signup.modal.php"); ?>