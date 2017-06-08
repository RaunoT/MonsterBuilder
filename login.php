<?php

	require("functions.php");

	if (isset($_SESSION["userId"])) {

		header("Location: main.php");
		exit();
	}

	//MUUTUJAD
	$loginEmail = "";
	$loginEmailError = "";
	$loginPasswordError = "";
	$signupEmail = "";
	$signupEmailError = "";
	$signupPasswordError = "";
	$signupPasswordSizeError = "";
	$userNameError = "";
	$userName = "";


	//kas keegi vajutas nuppu ja see on olemas

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
		<title>Monster</title>
    <link type="text/css" rel="stylesheet" href="login.css" />
	</head>

	<body>
		<header>
			<h1>Monster</h1>
		</header>
		<div class="wrapper">

			<div class="login box">

				<h2>Log in</h2>

				<form method="POST">

					<input class="field" name="loginEmail" placeholder="email" value="<?=$loginEmail;?>" type="email"><span class="error"><?php echo $loginEmailError; ?></span>

					<br><br>

					<input class="field" name="loginPassword" placeholder="password" type="password"><span class="error"><?php echo $loginPasswordError; ?></span>

					<br><br>

					<input class="btn" type="submit" value="Log in">

				</form>

			</div><!--.loginBox-->

			<p><?=$notice;?><?php echo $signupPasswordSizeError; ?></p>

			<div class="signUp box">

				<h2>Create User</h2>

				<form method="POST">

					<input class="field" name="signupEmail" placeholder="email" value="<?=$signupEmail;?>" type="email"><span class="error"><?php echo $signupEmailError; ?></span>
					<br><br>

					<input class="field" name="signupPassword" placeholder="password" type="password"><span class="error"><?php echo $signupPasswordError; ?></span>
					<br><br>

					<input class="field" name="userName" placeholder="your monster's name" maxlength="25" value="<?=$userName;?>" type="text"><span class="error"><?php echo $userNameError; ?></span>
					<br><br>

					<input class="btn" type="submit" value="Create User">

				</form>

			</div><!--.signUpBox-->
		</div><!--.wrapper-->
	</body>
</html>
