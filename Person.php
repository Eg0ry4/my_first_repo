<?php

class Person
{
  private $name;
  private $surname;
  private $age;
  private $hp;
  private $mother;
  private $father;

  function __construct($name, $surname, $age, $mother = null, $father = null)
  {
    $this->name = $name;
    $this->surname = $surname;
    $this->age = $age;
    $this->mother = $mother;
    $this->father = $father;
    $this->hp = 100;
  }

  function sayHi($name)
  {
    return "Hi, $name, I`m " . $this->name;
  }

  function setHp($hp)
  {
    if ($this->hp + $hp > 100) $this->hp = 100;
    else $this->hp = $this->hp + $hp;
  }

  function getHp()
  {
    return $this->hp;
  }
  function getName()
  {
    return $this->name;
  }
  function getMother()
  {
    return $this->mother;
  }
  function getFather()
  {
    return $this->father;
  }
  function getInfo()
  {
    return "My name is - " . $this->getName() . 
      "<br> My father's name is " . $this->getFather()->getName() .
      "<br> My mother's name is " . $this->getMother()->getName() .
      "<br> My mother's mother(my grandma) name is " . $this->getMother()->getMother()->getName() .
      "<br> My mother's father(my grandpa) name is " . $this->getMother()->getFather()->getName() .
      "<br> My father's mother (my another grandma) name is " . $this->getFather()->getMother()->getName() .
      "<br> My father's father(my another grandpa) name is " . $this->getFather()->getFather()->getName();
  }
}

$ruslan = new Person("Ruslan", "Prokofev", "77", null, null);
$ludmila = new Person("Ludmila", "Prokofeva", "75", null, null);

$igor = new Person("Igor", "Nikiforov", "78", null, null);
$sveta = new Person("Svetlana", "Nikiforova", "73", null, null);

$alex = new Person("Aleksey", "Ivanov", "43", $ludmila, $ruslan);
$olga = new Person("Olga", "Nikiforova", "40", $sveta, $igor);

$nikita = new Person("Nikita", "Ivanov-Nikiforov", "12", $olga, $alex);

echo $nikita->getInfo();
// echo $nikita->getMother()->getFather()->getName();

// echo $alex->sayHi($igor->name);
// Здоровье не может быть более 100 единиц


// $medKit = 50;
// $alex->setHp(-30); // Упал,повредил здоровье
// echo $alex->getHp() . "<br>";
// $alex->setHp($medKit); // Нашел аптечку
// echo $alex->getHp() . "<br>";

// $alex->name = "Лёха";
// echo $alex->name;
// echo $igor->name;
