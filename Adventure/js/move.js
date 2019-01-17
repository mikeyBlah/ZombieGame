window.onload = function() {

let x = 0;
let y = 0;
let orientation = 1;
let userInput = document.querySelector('#userInput');
let userInputForm = document.querySelector('#userInputForm');
let enter = document.querySelector('#enterBtn');
let output = document.querySelector('#outputMessage');
let userMap = document.querySelector('#userMap');
let playerIcon = document.querySelector('#playerIcon');
let level = document.querySelector('#level');
let cash = document.querySelector('#cash');
let exp = document.querySelector('#experience');
let health = document.querySelector('#health');
let xPosDisplay = document.querySelector('#xPos');
let yPosDisplay = document.querySelector('#yPos');
let currentLocOutput = document.querySelector('#currentLoc');
let weaponDisplay = document.querySelector('#weapon');
let strengthDisplay = document.querySelector('#weaponStrength');
let weaponLevelDisplay = document.querySelector('#weaponLevel');
let weaponImg = document.querySelector('#weaponImg');
let weaponImg2 = document.querySelector('#weaponImg2');
let weaponImg3 = document.querySelector('#weaponImg3');
let weaponImg4 = document.querySelector('#weaponImg4');
let currentLoc;
let locText = "Current location: "
let locations = [
"Abandoned Hospital",
"The Docks",
"Warehouse",
"Park",
"Shed",
"Wastelands"
];
let weaponsNew = [
  {
    name: "Fists",
    pwr: 10,
    lvl: 1,
    icon: "./img/fist.png"
  },
  {
    name: "Shiv",
    pwr: 15,
    lvl: 1,
    icon: "./img/shiv.png"
  },
  {
    name: "Cricket bat",
    pwr: 20,
    lvl: 1,
    icon: "./img/cricket.png"
  },
  {
    name: "Chainsaw",
    pwr: 25,
    lvl: 2,
    icon: "./img/chain.png"
  }
];
let weaponSlots = [
  weaponsNew[0].icon
];
let weaponHeld = [
true,
false,
false,
false
];
let player = {
  level: 1,
  cash: 0,
  experience: 0,
  health: 100,
  location: locations[5],
  weapon: weaponsNew[0].name,
  weaponStrength: weaponsNew[0].pwr,
  weaponLevel: weaponsNew[0].lvl
}
let currentWeaponIcon = weaponsNew[0];
updateGame();

//RENDER STATS
function updateGame(){
level.innerHTML = "Player Lvl: " + player.level;
cash.innerHTML = "Cash: " + player.cash;
exp.innerHTML = "Experience: " + player.experience;
health.innerHTML = "Health: " + player.health;
weaponDisplay.innerHTML = "Weapon: " + player.weapon;
strengthDisplay.innerHTML = "Weapon Hitpoints: " + player.weaponStrength;
weaponLevelDisplay.innerHTML = "Weapon Lvl: " + player.weaponLevel;
currentLocOutput.innerHTML = locText + player.location;
weaponImg.src = weaponSlots[0];
freeRoam = 1;
if(player.health <= 0){
  gameOver();
}
}
enter.addEventListener('click', function(){
  if(freeRoam == 1){
  mover();
}else if(freeRoam == 2){
  zombieInteraction();
}else return;
});

function mover(){
  //Move the user based upon the input commands: north, south, east and west
if((userInput.value === "north") || (userInput.value === "North")){

  if(y < 2){
  y +=1
  console.log(y);
  console.log(x);
  xPosDisplay.innerHTML = "X Position: " + x;
  yPosDisplay.innerHTML = "Y Position: " + y;
  orientation = 1;
  checkLoc();
}else{
  moveYNo();
}
}else
if((userInput.value === "south") || (userInput.value === "South")){
  if(y > -2){
  y -=1
  console.log(y);
  console.log(x);
  xPosDisplay.innerHTML = "X Position: " + x;
  yPosDisplay.innerHTML = "Y Position: " + y;
  orientation = 2;
  checkLoc();
}else{
  moveYNo();
}
}else
if((userInput.value === "east") || (userInput.value === "East")){
  if(x < 2){
  x +=1
  console.log(y);
  console.log(x);
  xPosDisplay.innerHTML = "X Position: " + x;
  yPosDisplay.innerHTML = "Y Position: " + y;
  orientation = 3;
  checkLoc();
}else{
  moveXNo();
}
}else
if((userInput.value === "west") || (userInput.value === "West")){
  if(x > -2){
  x -=1
  console.log(y);
  console.log(x);
  xPosDisplay.innerHTML = "X Position: " + x;
  yPosDisplay.innerHTML = "Y Position: " + y;
  orientation = 4;
  checkLoc();
}else{
  moveXNo();
}
}else{
  output.innerHTML = "Please enter a valid command. Hint: north, south, east or west";
}
}
//Send the user a message saying they can not proceed this way - Vertical
function moveYNo(){
  output.innerHTML = "You cannot go this way, a boulder is blocking your path...";
}

//Send the user a message saying they can not proceed this way - Horizontal
function moveXNo(){
  output.innerHTML = "You cannot go this way, a river is blocking your path...";
}

function checkLoc(){
  updateMap();
  output.innerHTML = "";
  if ((x > 0) && (y > 0)){
    currentLoc = locations[2];
    currentLocOutput.innerHTML = locText + currentLoc;
} else if ((x > 1) && (y < 1)){
    currentLoc = locations[3];
    currentLocOutput.innerHTML = locText + currentLoc;
} else if ((x === 1) && (y === -1)){
  currentLoc = locations[5];
  currentLocOutput.innerHTML = locText + currentLoc;
  pickUpWeapon(1);
} else if ((x > -1) && (x < 2) && (y < -1)){
  currentLoc = locations[4];
  currentLocOutput.innerHTML = locText + currentLoc;
} else if (((x === -1) && (y === 2)) || ((x === -2) && (y > 0))){
  currentLoc = locations[0];
  currentLocOutput.innerHTML = locText + currentLoc;
  output.innerHTML = "Don't make a sound, Zombies are close!";
  checkZombie(2);
} else if (((x === -1) && (y === -2)) || ((x === -2) && (y < 1))){
  currentLoc = locations[1];
  currentLocOutput.innerHTML = locText + currentLoc;
  let e = Math.floor(Math.random() * 2) + 2;
  console.log(e);
  pickUpWeapon(e);
} else{
  currentLoc = locations[5];
  currentLocOutput.innerHTML = locText + currentLoc;
    }
  }
function pickUpWeapon(e){
  if(weaponHeld[e] != true){
    output.innerHTML = "You've found a: " + weaponsNew[e].name + "!";
    weaponSlots.push(weaponsNew[e].icon);
    console.log (weaponSlots);
    weaponImg2.src = weaponSlots[1];
    weaponImg3.src = weaponSlots[2];
    weaponImg4.src = weaponSlots[3];
    weaponHeld[e] = true;
  } else return;
}
function selectWeapon(s){
  player.weapon = weaponsNew[s].name;
  player.weaponStrength = weaponsNew[s].pwr;
  player.weaponLevel = weaponsNew[s].lvl;
  output.innerHTML = "You've selected a: " + player.weapon;
  weaponDisplay.innerHTML = "Weapon: " + player.weapon;
  strengthDisplay.innerHTML = "Weapon Stength: " + player.weaponStrength;
  weaponLevelDisplay.innerHTML = "Weapon Lvl: " + player.weaponLevel;
}
function checkZombie(c){
  let zombieRand = Math.floor(Math.random() * c);
  console.log("Random: " + zombieRand);
  if (zombieRand === 1){
    freeRoam = 2;
    output.innerHTML = "Whoooaaa!!!! A Zombie attack or run?";
  } else return;
}
 function zombieInteraction(){
   let zombieStrength = Math.floor(Math.random() * 30) + 20;
   if(userInput.value === "attack"){
     player.health -= zombieStrength - player.weaponStrength;
     console.log ("Zombie Strength " + zombieStrength);
     player.experience +=50;
     output.innerHTML = "You killed the Zombie but took some damage";
     freeRoam = 1;
     updateGame();
   } else if (userInput.value === "run"){
     output.innerHTML = "You managed to escape";
     freeRoam = 1;
     updateGame();
   } else{
     output.innerHTML = "Please enter a valid command. Hint: run or attack";
     freeRoam = 2;
   }
 }
  let startXMap = 85;
  let startYMap = 85;
 function updateMap(){
   userMap.style.left = startXMap + x * 40 + 'px';
   userMap.style.top =  startYMap - y * 40 + 'px';
   if (orientation === 1){
     userMap.style.transform = "rotate(0deg)";
   }else if(orientation === 2){
     userMap.style.transform = "rotate(180deg)";
   }else if(orientation === 3){
     userMap.style.transform = "rotate(90deg)";
   }else{
     userMap.style.transform = "rotate(-90deg)";
   }
 }
 function gameOver(){
    freeRoam = 0;
    output.innerHTML = "You dead, GAME OVER!!! Click to Restart";
 }
 output.addEventListener('click', function(){
   if(freeRoam == 0){
     output.innerHTML = "";
     x = 0;
     y = 0;
     updateGame();
   }
 });
}
