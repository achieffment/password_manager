<?php
//    session_start();

    date_default_timezone_set("Europe/Moscow");

    require_once("classes/Storage.php");
    require_once("classes/Timer.php");

    $storage = new Storage();

?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="style/style.css">
    <link rel="stylesheet" href="assets/fancybox.css">
    <link rel="stylesheet" href="assets/bootstrap.min.css">
</head>
<body>

    <div class="hidden-info">
        <?php print_r($storage->json); ?>
    </div>

    <header>
        <div class="header-time">

        </div>
        <div class="header-title">
            <h1>Your password manager</h1>
        </div>
        <div class="header-notifier">

        </div>
    </header>

    <section>
        <input class='form-control' type="text" name="search" placeholder="Input account name to search">
        <div class="table-responsive">
            <table class="table accountsTable">
                <thead>
                <td data-name="id">id</td>
                <td data-name="accountName">Account Name</td>
                <td data-name="link">Browser Link</td>
                <td data-name="login">Login</td>
                <td data-name="password">Password</td>
                <td data-name="mails">Mails</td>
                <td data-name="name">Name</td>
                <td data-name="username">Username</td>
                <td data-name="dob">Date Of Birth</td>
                <td data-name="location">Location</td>
                <td data-name="index">Index</td>
                <td data-name="tel">Telephone</td>
                <td data-name="comment">Comment</td>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
        <div class="buttonAddContainer">
            <button class="btn btn-outline-dark buttonAdd">
                <p>+</p>
            </button>
        </div>
    </section>

    <footer>

    </footer>

    <div id="delete-dialog">
        <h3>Are you sure want <br>to delete password?<br><br></h3>
        <button class="btn btn-outline-danger buttonDeleteConfirm">Yes</button>
    </div>

    <div id="showMore-dialog">
        <table class="table showMoreTable">
            <tr>
                <td>Pin-Code</td>
                <td><input type="text" value="" name="pinCode"></td>
            </tr>
            <tr>
                <td>Secret Questions</td>
                <td><textarea name="secretQuestions"></textarea></td>
            </tr>
            <tr>
                <td>Secret Answers</td>
                <td><textarea name="secretAnswers"></textarea></td>
            </tr>
            <tr>
                <td>Auth Codes</td>
                <td><textarea name="authCodes"></textarea></td>
            </tr>
            <tr>
                <td>Job Company Name</td>
                <td><input type="text" value="" name="jobCompany"></td>
            </tr>
            <tr>
                <td>Job Role</td>
                <td><input type="text" value="" name="jobRole"></td>
            </tr>
            <tr>
                <td>Job Location</td>
                <td><textarea name="jobLocation"></textarea></td>
            </tr>
            <tr>
                <td>Job Index</td>
                <td><input type="text" value="" name="jobIndex"></td>
            </tr>
            <tr>
                <td>Created</td>
                <td><p class="created"></p></td>
            </tr>
            <tr>
                <td>Updated</td>
                <td><p class="updated"></p></td>
            </tr>
        </table>
    </div>

    <script src="assets/jquery-3.6.0.min.js"></script>
    <script src="assets/fancybox.umd.js"></script>
    <script src="assets/bootstrap.js"></script>
    <script src="js/classes.js"></script>
    <script src="js/functions.js"></script>
    <script src="js/script.js"></script>

</body>
</html>
