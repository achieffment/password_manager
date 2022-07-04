<?php

    require_once($_SERVER['DOCUMENT_ROOT'] . "\classes\Timer.php");

    $timer = new Timer();

    echo "<p>" . $timer->getCurrentTime() . "</p>";
    echo "<p>" . $timer->getStartTime() . "</p>";
    echo "<p>" . $timer->getEndTime() . "</p>";
    echo "<p>" . $timer->getTimeDifference();

?>
