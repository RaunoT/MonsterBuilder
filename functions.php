<?php

	require("../../../config.php");

	session_start();

	$database = "if16_raitkeer";


	function signup($email, $password, $userName) {

		$mysqli = new mysqli($GLOBALS["serverHost"], $GLOBALS["serverUsername"], $GLOBALS["serverPassword"], $GLOBALS["database"]);

		$stmt = $mysqli->prepare("INSERT INTO player_list (email, password, username) VALUE (?, ?, ?)");

		$stmt->bind_param("sss", $email, $password, $userName);

		if ( $stmt->execute() ) {
		}
	}

	function login($email, $password) {

		$notice = "";

		$mysqli = new mysqli($GLOBALS["serverHost"], $GLOBALS["serverUsername"], $GLOBALS["serverPassword"], $GLOBALS["database"]);

		$stmt = $mysqli->prepare("
			SELECT id, email, password, username
			FROM player_list
			WHERE email = ?

		");

		$stmt->bind_param("s", $email);

		$stmt->bind_result($id, $emailFromDb, $passwordFromDb, $userNameFromDb);

		$stmt->execute();

		if($stmt->fetch()) {

			$hash = hash("sha512", $password);

			if ($hash == $passwordFromDb) {

				$_SESSION["userId"] = $id;
				$_SESSION["userEmail"] = $emailFromDb;
				$_SESSION["userName"] = $userNameFromDb;

				header("Location: main.php");

			} else {
				$notice = "Wrong password!";
			}


		} else {

			$notice = "Couldn't find user with email: ".$email;
		}

		$stmt->close();
		$mysqli->close();

		return $notice;

	}

  function cleanInput ($input) {

		$input = trim($input);

		//võtab välja "\"
		$input = stripslashes($input);

		//html asendused nt.\ asemel unicode
		$input = htmlspecialchars($input);

		return $input;

	}

?>
