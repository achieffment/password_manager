<?php

    require_once($_SERVER['DOCUMENT_ROOT'] . '\classes\Storage.php');

    $storage = new Storage();

    if (isset($_POST['dataWrite']) && isset($_POST['data'])) {
        if ($_POST['dataWrite'] == "Y" && !empty($_POST['data'])) {
            $json = $_POST['data'];
            $storage->dataWrite($json);
        }
    }