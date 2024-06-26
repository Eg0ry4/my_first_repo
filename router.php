<?php

session_start();

$url = explode("/", $_SERVER["REQUEST_URI"]);
require_once("php/db.php");
require_once("php/classes/User.php");

if ($url[1] == "login") {
  $content = file_get_contents("pages/login.php");
} else if ($url[1] == "register") {
  $content = file_get_contents("pages/register.html");
} else if ($url[1] == "contact") {
  $content = file_get_contents("pages/contact.html");
} else if ($url[1] == "tracking") {
  $content = file_get_contents("pages/tracking-order.html");
} else if ($url[1] == "users") {
  require_once("pages/users/index.html");
} else if ($url[1] == "regUser") {
  echo User::addUser($_POST["name"], $_POST["surname"], $_POST["email"], $_POST["pass"]);
} else if ($url[1] == "authUser") {
  echo User::authUser($_POST["email"], $_POST["pass"]);
} else {
  $content = file_get_contents("pages/index.php");
}

if (!empty($content)) require_once("template.php");
