<?php

  define("FILENAME","database.txt");
  if(isset($_POST["save"]) && !empty($_POST["save"])){
    saveToFile($_POST["save"]);
  }

  function saveToFile($stringToSave){
    if(file_put_contents(FILENAME, $stringToSave)){
      echo ('{"message":"saved successfully"}');
    }
  }

?>
