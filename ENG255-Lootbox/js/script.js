"use strict";

/*****************

Raving Redactionist
Pippin Barr

You are redacting a document, but it keeps becoming unredacted!
Click the secret information to hide it, don't let all the
secrets become revealed!

******************/
let gameScreen;

// images
let i_ending1;
let i_ending1_2;
let i_ending2;
let i_ending3;
let i_ending4;
let i_ending5;
let i_ending6;
let i_ending7;
let i_ending8;

// variables:
// player stats
let playerLevel = 1;
let playerExp = 0;
let happiness = 100;
let money = 0;
let gems = 0;
let hunger = 100;
let luckOriginal = 1;
let luck = 1;
// shop stats
let foodCount = [0, 0, 0, 0, 0];
let coffeeCount = [0, 0, 0, 0, 0];
let happyJuiceCount = [0, 0, 0, 0, 0];
let luckBoostCount = [0, 0, 0, 0, 0]
let lootboxCount = [0, 0, 0, 0, 0];
let lotteryCount = [0, 0, 0, 0, 0];
let foodPrices = [5, 12, 30, 50, 65];
let coffeePrices = [5, 12, 30, 50, 65];
let happyJuicePrices = [5, 12, 30, 50, 65];
let luckBoostPrices = [5, 12, 30, 50, 65];
let lootboxPrices = [5, 12, 30, 50, 65];
let lotteryPrices = [5, 12, 30, 50, 65];
// lootbox
// NPC levels and exp
// Awareness points: start at 0, at 100, ending 1. Can gather by clicking on petition regulations once the player is aware of it. To become aware, must help each coworker enough.
// Coworker relationship points (for each coworker): all start at 1, end at 10, once `0, gets condition to start petition.
// Addiction points: start at 100, calculated to how much happiness is lost every second. Buying the lootboxes increase this, buying the expensive upgrades of cooking skills, attending hobby groups, help coworkers decrease it. At 0, open the option to

let week = 0; // 15 total, at end of 15th week, end game
let weekPercent = 0; // when 100, goes to next week
let regulationPoints = 0; // wins game at 10
let cookingPoints = 0; // caps out at 5
let hobbyPoints = 0; // caps out at 5

let bestEmployee = "";
let worstEmployee = "";

// the current letter to press to proceed (Q W E R T A S D F G)
let workLetter = 0;
let workLettersList = [81, 87, 69, 82, 84, 65, 83, 68, 70, 71];
let employeesList = [];
let helpList = [];

// how much exp gained from working one letter depend on level
// these are boosted by coffee and happiness points
let expPerLevel = [10, 8, 6, 4, 2, 1, 1, 1, 1, 1];
let moneyPerLevel = [1, 2, 4, 6, 8, 10, 12, 14, 16, 20];

// if drank coffee, how much more work is done per click
let coffeeBoost = 0;

let newsText = 6;
let newsTextList = [
  "At the end of this week, the worst performing employee will be fired.",
  "Luckily, due to good performance, no one needs ot be fired this time.",
  "Lootboxes are on sale this week! Support our business and be happy!",
  "Support our business! Do not support that rediculous peition!",
  "Keep up the good work! You are bringing joy to all!",
  "Satisfy your needs today! Lootboxes just a click away!",
  "Good luck on your first week! Make the boss proud!"
];

let gameEnded = false;
// 1 = Regulations; 2 = depression; 3 = unproductive; 4 = starvation; 5 = disloyal; 6 = better job; 7 = promotion; 8 = downsizing
let endingType = 0;

// $(document).ready(start);



function preload() {
  // load images
  i_ending1 = loadImage(`assets/images/regulations1.png`);
  i_ending1_2 = loadImage(`assets/images/regulations2.png`);
  i_ending2 = loadImage(`assets/images/depress.png`);
  i_ending3 = loadImage(`assets/images/unproduct.png`);
  i_ending4 = loadImage(`assets/images/starve.png`);
  i_ending5 = loadImage(`assets/images/disloyal.png`);
  i_ending6 = loadImage(`assets/images/network.png`);
  i_ending7 = loadImage(`assets/images/promotion.png`);
  i_ending8 = loadImage(`assets/images/downsize.png`);
}

function setup() {
  gameScreen = createCanvas(windowWidth, windowHeight);
  gameScreen.style('display', 'block');
  noStroke();
  // create the 3 other employees
  let employeeOne = new Employee("Mr. A");
  employeesList.push(employeeOne);
  let employeeTwo = new Employee("Mrs. B");
  employeesList.push(employeeTwo);
  let employeeThree = new Employee("Ms. C");
  employeesList.push(employeeThree);
  console.log(employeesList);
}

function draw() {
  background(255);
  if (gameEnded === false) {
    // calculate variables
    ranking();
    endingCheck();
    timeCode();
    // draw elemnents
    windowResized();
    titleWord();
    shopWindow();
    workWindow();
    helpNeededWindow();
    weekCount();
    playerStats();
    leaderboard();
    gemShop();
    newsWindow();
    salesAlert();
    realSkills();
    petition();
    // if clicking buttons, register and do the transaction
    mousePressed();
    keyPressed();
  } else if (gameEnded === true) {
    let endingImage;
    let endingImage2;
    switch (endingType) {
      case 0:
        console.log("error");
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(width / 30 + height / 30);
        text("Error", width / 2, height / 2);
        break;
      case 1:
        endingImage = i_ending1;
        endingImage2 = i_ending1_2;
        break;
      case 2:
        endingImage = i_ending2;
        break;
      case 3:
        endingImage = i_ending3;
        break;
      case 4:
        endingImage = i_ending4;
        break;
      case 5:
        endingImage = i_ending5;
        break;
      case 6:
        endingImage = i_ending6;
        break;
      case 7:
        endingImage = i_ending7;
        break;
      case 8:
        endingImage = i_ending8;
        break;
      default:
    }
    imageMode(CENTER, CENTER);
    if (endingType > 1) {
      image(endingImage, width / 2, height / 2, width / 1, height / 1);
    } else if (endingType === 1) {
      fill(0);
      textAlign(CENTER, CENTER);
      textSize(width / 30 + height / 30);
      text("Congrats! You got the best ending!", width / 2, height / 4);
      image(endingImage, width / 4, height - height / 4, width / 2, height / 2);
      image(endingImage2, width - width / 4, height - height / 4, width / 2, height / 2);
    }
  }
}

// drawing functions

function titleWord() {
  textSize(width / 60 + height / 60);
  textAlign(CENTER, CENTER);
  fill(0);
  text("The Lootbox Mechanic", width / 7.5, height / 30);
}

function shopWindow() {
  fill(200);
  rectMode(CENTER, CENTER);
  rect(width / 2, height - height / 5, width, height / 4 + height / 6);
  fill(0);
  textSize(width / 100 + height / 100);
  textAlign(CENTER, CENTER);
  text("Type", width / 20, height - height / 2.6);
  text("Tier", width / 60, height - height / 2.8);
  text("1", width / 60, height - height / 3.3);
  text("2", width / 60, height - height / 4.2);
  text("3", width / 60, height - height / 6);
  text("4", width / 60, height - height / 10);
  text("5", width / 60, height - height / 30);
  text("10%", width / 18, height - height / 3.3);
  text("25%", width / 18, height - height / 4.2);
  text("40%", width / 18, height - height / 6);
  text("60%", width / 18, height - height / 10);
  text("85%", width / 18, height - height / 30);
  text("Food", width / 8, height - height / 2.6);
  text("Coffee", width / 4, height - height / 2.6);
  text("Happy Juice", width / 2.5, height - height / 2.6);
  text("Luck Boost", width - width / 2.4, height - height / 2.6);
  text("Lootbox", width - width / 4.5, height - height / 2.6);
  text("Lottery", width - width / 15, height - height / 2.6);
  // food
  fill(255, 200, 0);
  rect(width / 9, height - height / 3.3, width / 25, height / 30);
  rect(width / 6, height - height / 3.3, width / 25, height / 30);
  rect(width / 9, height - height / 4.2, width / 25, height / 30);
  rect(width / 6, height - height / 4.2, width / 25, height / 30);
  rect(width / 9, height - height / 6, width / 25, height / 30);
  rect(width / 6, height - height / 6, width / 25, height / 30);
  rect(width / 9, height - height / 10, width / 25, height / 30);
  rect(width / 6, height - height / 10, width / 25, height / 30);
  rect(width / 9, height - height / 30, width / 25, height / 30);
  rect(width / 6, height - height / 30, width / 25, height / 30);
  fill(0);
  text("Buy", width / 9, height - height / 3.3);
  text("Use", width / 6, height - height / 3.3);
  text("Buy", width / 9, height - height / 4.2);
  text("Use", width / 6, height - height / 4.2);
  text("Buy", width / 9, height - height / 6);
  text("Use", width / 6, height - height / 6);
  text("Buy", width / 9, height - height / 10);
  text("Use", width / 6, height - height / 10);
  text("Buy", width / 9, height - height / 30);
  text("Use", width / 6, height - height / 30);
  text(foodPrices[0] + "$", width / 9, height - height / 3);
  text("X " + foodCount[0], width / 6, height - height / 3);
  text(foodPrices[1] + "$", width / 9, height - height / 3.7);
  text("X " + foodCount[1], width / 6, height - height / 3.7);
  text(foodPrices[2] + "$", width / 9, height - height / 5);
  text("X " + foodCount[2], width / 6, height - height / 5);
  text(foodPrices[3] + "$", width / 9, height - height / 7.6);
  text("X " + foodCount[3], width / 6, height - height / 7.6);
  text(foodPrices[4] + "$", width / 9, height - height / 16);
  text("X " + foodCount[4], width / 6, height - height / 16);
  // coffee
  fill(255, 200, 0);
  rect(width / 4.3, height - height / 3.3, width / 25, height / 30);
  rect(width / 3.4, height - height / 3.3, width / 25, height / 30);
  rect(width / 4.3, height - height / 4.2, width / 25, height / 30);
  rect(width / 3.4, height - height / 4.2, width / 25, height / 30);
  rect(width / 4.3, height - height / 6, width / 25, height / 30);
  rect(width / 3.4, height - height / 6, width / 25, height / 30);
  rect(width / 4.3, height - height / 10, width / 25, height / 30);
  rect(width / 3.4, height - height / 10, width / 25, height / 30);
  rect(width / 4.3, height - height / 30, width / 25, height / 30);
  rect(width / 3.4, height - height / 30, width / 25, height / 30);
  fill(0);
  text("Buy", width / 4.3, height - height / 3.3);
  text("Use", width / 3.4, height - height / 3.3);
  text("Buy", width / 4.3, height - height / 4.2);
  text("Use", width / 3.4, height - height / 4.2);
  text("Buy", width / 4.3, height - height / 6);
  text("Use", width / 3.4, height - height / 6);
  text("Buy", width / 4.3, height - height / 10);
  text("Use", width / 3.4, height - height / 10);
  text("Buy", width / 4.3, height - height / 30);
  text("Use", width / 3.4, height - height / 30);
  text(coffeePrices[0] + "$", width / 4.3, height - height / 3);
  text("X " + coffeeCount[0], width / 3.4, height - height / 3);
  text(coffeePrices[1] + "$", width / 4.3, height - height / 3.7);
  text("X " + coffeeCount[1], width / 3.4, height - height / 3.7);
  text(coffeePrices[2] + "$", width / 4.3, height - height / 5);
  text("X " + coffeeCount[2], width / 3.4, height - height / 5);
  text(coffeePrices[3] + "$", width / 4.3, height - height / 7.6);
  text("X " + coffeeCount[3], width / 3.4, height - height / 7.6);
  text(coffeePrices[4] + "$", width / 4.3, height - height / 16);
  text("X " + coffeeCount[4], width / 3.4, height - height / 16);
  // happy Juice
  fill(255, 200, 0);
  rect(width / 2.7, height - height / 3.3, width / 25, height / 30);
  rect(width / 2.3, height - height / 3.3, width / 25, height / 30);
  rect(width / 2.7, height - height / 4.2, width / 25, height / 30);
  rect(width / 2.3, height - height / 4.2, width / 25, height / 30);
  rect(width / 2.7, height - height / 6, width / 25, height / 30);
  rect(width / 2.3, height - height / 6, width / 25, height / 30);
  rect(width / 2.7, height - height / 10, width / 25, height / 30);
  rect(width / 2.3, height - height / 10, width / 25, height / 30);
  rect(width / 2.7, height - height / 30, width / 25, height / 30);
  rect(width / 2.3, height - height / 30, width / 25, height / 30);
  fill(0);
  text("Buy", width / 2.7, height - height / 3.3);
  text("Use", width / 2.3, height - height / 3.3);
  text("Buy", width / 2.7, height - height / 4.2);
  text("Use", width / 2.3, height - height / 4.2);
  text("Buy", width / 2.7, height - height / 6);
  text("Use", width / 2.3, height - height / 6);
  text("Buy", width / 2.7, height - height / 10);
  text("Use", width / 2.3, height - height / 10);
  text("Buy", width / 2.7, height - height / 30);
  text("Use", width / 2.3, height - height / 30);
  text(happyJuicePrices[0] + "$", width / 2.7, height - height / 3);
  text("X " + happyJuiceCount[0], width / 2.3, height - height / 3);
  text(happyJuicePrices[1] + "$", width / 2.7, height - height / 3.7);
  text("X " + happyJuiceCount[1], width / 2.3, height - height / 3.7);
  text(happyJuicePrices[2] + "$", width / 2.7, height - height / 5);
  text("X " + happyJuiceCount[2], width / 2.3, height - height / 5);
  text(happyJuicePrices[3] + "$", width / 2.7, height - height / 7.6);
  text("X " + happyJuiceCount[3], width / 2.3, height - height / 7.6);
  text(happyJuicePrices[4] + "$", width / 2.7, height - height / 16);
  text("X " + happyJuiceCount[4], width / 2.3, height - height / 16);
  // luck boost
  fill(255, 200, 0);
  rect(width / 1.8, height - height / 3.3, width / 25, height / 30);
  rect(width / 1.6, height - height / 3.3, width / 25, height / 30);
  rect(width / 1.8, height - height / 4.2, width / 25, height / 30);
  rect(width / 1.6, height - height / 4.2, width / 25, height / 30);
  rect(width / 1.8, height - height / 6, width / 25, height / 30);
  rect(width / 1.6, height - height / 6, width / 25, height / 30);
  rect(width / 1.8, height - height / 10, width / 25, height / 30);
  rect(width / 1.6, height - height / 10, width / 25, height / 30);
  rect(width / 1.8, height - height / 30, width / 25, height / 30);
  rect(width / 1.6, height - height / 30, width / 25, height / 30);
  fill(0);
  text("Buy", width / 1.8, height - height / 3.3);
  text("Use", width / 1.6, height - height / 3.3);
  text("Buy", width / 1.8, height - height / 4.2);
  text("Use", width / 1.6, height - height / 4.2);
  text("Buy", width / 1.8, height - height / 6);
  text("Use", width / 1.6, height - height / 6);
  text("Buy", width / 1.8, height - height / 10);
  text("Use", width / 1.6, height - height / 10);
  text("Buy", width / 1.8, height - height / 30);
  text("Use", width / 1.6, height - height / 30);
  text(happyJuicePrices[0] + "$", width / 1.8, height - height / 3);
  text("X " + happyJuiceCount[0], width / 1.6, height - height / 3);
  text(happyJuicePrices[1] + "$", width / 1.8, height - height / 3.7);
  text("X " + happyJuiceCount[1], width / 1.6, height - height / 3.7);
  text(happyJuicePrices[2] + "$", width / 1.8, height - height / 5);
  text("X " + happyJuiceCount[2], width / 1.6, height - height / 5);
  text(happyJuicePrices[3] + "$", width / 1.8, height - height / 7.6);
  text("X " + happyJuiceCount[3], width / 1.6, height - height / 7.6);
  text(happyJuicePrices[4] + "$", width / 1.8, height - height / 16);
  text("X " + happyJuiceCount[4], width / 1.6, height - height / 16);
  // Lootbox
  fill(255, 200, 0);
  rect(width - width / 4, height - height / 3.3, width / 25, height / 30);
  rect(width - width / 5.5, height - height / 3.3, width / 25, height / 30);
  rect(width - width / 4, height - height / 4.2, width / 25, height / 30);
  rect(width - width / 5.5, height - height / 4.2, width / 25, height / 30);
  rect(width - width / 4, height - height / 6, width / 25, height / 30);
  rect(width - width / 5.5, height - height / 6, width / 25, height / 30);
  rect(width - width / 4, height - height / 10, width / 25, height / 30);
  rect(width - width / 5.5, height - height / 10, width / 25, height / 30);
  rect(width - width / 4, height - height / 30, width / 25, height / 30);
  rect(width - width / 5.5, height - height / 30, width / 25, height / 30);
  fill(0);
  text("Buy", width - width / 4, height - height / 3.3);
  text("Use", width - width / 5.5, height - height / 3.3);
  text("Buy", width - width / 4, height - height / 4.2);
  text("Use", width - width / 5.5, height - height / 4.2);
  text("Buy", width - width / 4, height - height / 6);
  text("Use", width - width / 5.5, height - height / 6);
  text("Buy", width - width / 4, height - height / 10);
  text("Use", width - width / 5.5, height - height / 10);
  text("Buy", width - width / 4, height - height / 30);
  text("Use", width - width / 5.5, height - height / 30);
  text(luckBoostPrices[0] + "$", width - width / 4, height - height / 3);
  text("X " + luckBoostCount[0], width - width / 5.5, height - height / 3);
  text(luckBoostPrices[1] + "$", width - width / 4, height - height / 3.7);
  text("X " + luckBoostCount[1], width - width / 5.5, height - height / 3.7);
  text(luckBoostPrices[2] + "$", width - width / 4, height - height / 5);
  text("X " + luckBoostCount[2], width - width / 5.5, height - height / 5);
  text(luckBoostPrices[3] + "$", width - width / 4, height - height / 7.6);
  text("X " + luckBoostCount[3], width - width / 5.5, height - height / 7.6);
  text(luckBoostPrices[4] + "$", width - width / 4, height - height / 16);
  text("X " + luckBoostCount[4], width - width / 5.5, height - height / 16);
  // Lottery
  fill(255, 200, 0);
  rect(width - width / 10, height - height / 3.3, width / 25, height / 30);
  rect(width - width / 30, height - height / 3.3, width / 25, height / 30);
  rect(width - width / 10, height - height / 4.2, width / 25, height / 30);
  rect(width - width / 30, height - height / 4.2, width / 25, height / 30);
  rect(width - width / 10, height - height / 6, width / 25, height / 30);
  rect(width - width / 30, height - height / 6, width / 25, height / 30);
  rect(width - width / 10, height - height / 10, width / 25, height / 30);
  rect(width - width / 30, height - height / 10, width / 25, height / 30);
  rect(width - width / 10, height - height / 30, width / 25, height / 30);
  rect(width - width / 30, height - height / 30, width / 25, height / 30);
  fill(0);
  text("Buy", width - width / 10, height - height / 3.3);
  text("Use", width - width / 30, height - height / 3.3);
  text("Buy", width - width / 10, height - height / 4.2);
  text("Use", width - width / 30, height - height / 4.2);
  text("Buy", width - width / 10, height - height / 6);
  text("Use", width - width / 30, height - height / 6);
  text("Buy", width - width / 10, height - height / 10);
  text("Use", width - width / 30, height - height / 10);
  text("Buy", width - width / 10, height - height / 30);
  text("Use", width - width / 30, height - height / 30);
  text(lotteryPrices[0] + "$", width - width / 10, height - height / 3);
  text("X " + lotteryCount[0], width - width / 30, height - height / 3);
  text(lotteryPrices[1] + "$", width - width / 10, height - height / 3.7);
  text("X " + lotteryCount[1], width - width / 30, height - height / 3.7);
  text(lotteryPrices[2] + "$", width - width / 10, height - height / 5);
  text("X " + lotteryCount[2], width - width / 30, height - height / 5);
  text(lotteryPrices[3] + "$", width - width / 10, height - height / 7.6);
  text("X " + lotteryCount[3], width - width / 30, height - height / 7.6);
  text(lotteryPrices[4] + "$", width - width / 10, height - height / 16);
  text("X " + lotteryCount[4], width - width / 30, height - height / 16);
}

function workWindow() {
  fill(200);
  rectMode(CENTER, CENTER);
  rect(width / 2.8, height / 4, width / 2.8, height / 2.7);
  fill(0);
  textSize(width / 80 + height / 80);
  textAlign(CENTER, CENTER);
  text("Work", width / 2.8, height / 3 - height / 4.2);
  // draw the rect under the current letter to press
  fill(255, 200, 0);
  if (workLetter < 5) {
    rect(width / 4.5 + (width / 15) * workLetter, height / 6, width / 18, height / 10);

  } else if (workLetter >= 5) {
    rect(width / 4.5 + (width / 15) * (workLetter - 5), height / 3, width / 18, height / 10);
  }
  fill(0);
  textSize(width / 30 + height / 30);
  text("Q", width / 4.5, height / 3 - height / 6);
  text("W", width / 4.5 + (width / 15), height / 3 - height / 6);
  text("E", width / 4.5 + (width / 15) * 2, height / 3 - height / 6);
  text("R", width / 4.5 + (width / 15) * 3, height / 3 - height / 6);
  text("T", width / 4.5 + (width / 15) * 4, height / 3 - height / 6);
  text("A", width / 4.5, height / 3);
  text("S", width / 4.5 + (width / 15), height / 3);
  text("D", width / 4.5 + (width / 15) * 2, height / 3);
  text("F", width / 4.5 + (width / 15) * 3, height / 3);
  text("G", width / 4.5 + (width / 15) * 4, height / 3);
}

function helpNeededWindow() {
  fill(200);
  rectMode(CENTER, CENTER);
  rect(width - width / 3, height / 4, width / 4, height / 2.7);
  fill(0);
  textSize(width / 80 + height / 80);
  textAlign(CENTER, CENTER);
  text("Help Needed", width - width / 3, height / 3 - height / 4.2);
}

function weekCount() {
  fill(0);
  textSize(width / 60 + height / 60);
  textAlign(CENTER, CENTER);
  text("Week " + week + "  " + weekPercent + "%", width / 2.9, height / 30);
}

function playerStats() {
  fill(0);
  textSize(width / 100 + height / 100);
  textAlign(LEFT, CENTER);
  text("Player", width / 100, height / 12);
  text("Level " + playerLevel, width / 100, height / 8.5);
  text("EXP " + playerExp + "%", width / 100, height / 6.6);
  text("Happiness " + happiness + "%", width / 100, height / 5.4);
  text("Hunger " + hunger + "%", width / 100, height / 4.5);
  text("Money " + money + "$", width / 100, height / 3.9);
  text("JoyGems " + gems + " Gs", width / 100, height / 3.45);
}

function leaderboard() {
  fill(0);
  textSize(width / 60 + height / 60);
  textAlign(LEFT, CENTER);
  text("Leaderboard", width - width / 5, height / 4.5);
  textSize(width / 80 + height / 80);
  text("1 - " + "name", width - width / 5, height / 3.5);
  text("Level - " + " EXP  - ", width - width / 5, height / 3.1);
}

function gemShop() {
  fill(0);
  textSize(width / 100 + height / 100);
  textAlign(LEFT, CENTER);
  text("90 Gs", width / 100, height / 2.92);
  text("220 Gs", width / 100, height / 2.7);
  text("340 Gs", width / 100, height / 2.52);
  text("570 Gs", width / 100, height / 2.35);
  textAlign(RIGHT, CENTER);
  text("5$", width / 10, height / 2.92);
  text("13$", width / 10, height / 2.7);
  text("19$", width / 10, height / 2.51);
  text("33$", width / 10, height / 2.35);
  fill(255, 200, 0);
  rectMode(CENTER, CENTER);
  rect(width / 7, height / 2.92, width / 20, height / 40);
  rect(width / 7, height / 2.7, width / 20, height / 40);
  rect(width / 7, height / 2.51, width / 20, height / 40);
  rect(width / 7, height / 2.35, width / 20, height / 40);
  fill(0);
  textSize(width / 100 + height / 100);
  textAlign(RIGHT, CENTER);
  text("BUY!", width / 6.3, height / 2.92);
  text("BUY!", width / 6.3, height / 2.7);
  text("BUY!", width / 6.3, height / 2.51);
  text("BUY!", width / 6.3, height / 2.35);
}

function newsWindow() {
  fill(200);
  rectMode(LEFT, CENTER);
  rect(width / 2.6, height - height / 2.05, width - width / 5.4, height / 7);
  fill(0);
  textSize(width / 60 + height / 60);
  textAlign(CENTER, CENTER);
  text("News", width / 30, height / 2.1);
  textSize(width / 100 + height / 100);
  textAlign(LEFT, CENTER);
  text(newsTextList[newsText], width / 12, height / 2.1);
}

function salesAlert() {
  fill(0);
  textSize(width / 50 + height / 50);
  textAlign(CENTER, CENTER);
  text("SALES!", width - width / 7, height / 6);
  fill(255, 0, 0);
  ellipse(width - width / 20, height / 8, width / 20 + height / 20);
}

function realSkills() {
  fill(0);
  textSize(width / 100 + height / 100);
  textAlign(LEFT, CENTER);
  text("Learn Cooking", width - width / 5, height / 50);
  text("$", width - width / 5, height / 20);
  text("Hobby Group", width - width / 5, height / 12);
  text("$", width - width / 5, height / 9);
  fill(255, 200, 0);
  rectMode(CENTER, CENTER);
  rect(width - width / 8, height / 20, width / 20, height / 40);
  rect(width - width / 8, height / 9, width / 20, height / 40);
  fill(0);
  textSize(width / 100 + height / 100);
  textAlign(RIGHT, CENTER);
  text("Do", width - width / 8.5, height / 20);
  text("Do", width - width / 8.5, height / 9);
}

function petition() {
  fill(255, 200, 0);
  rectMode(CENTER, CENTER);
  rect(width - width / 2.7, height / 30, width / 6, height / 30);
  fill(0);
  textSize(width / 100 + height / 100);
  textAlign(CENTER, CENTER);
  text("Petition Regulations", width - width / 2.7, height / 30);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// calculation functions

// calculate the rankings of each employee
function ranking() {

}

// check all buttons, if any is pressed, do one of the following codes
function mousePressed() {
  if (mouseX < width && mouseX > 0 && mouseY < height && mouseY > 0) {

  }

}

// calculate the numbers for doing work if right key is pressed
// function doWork() {
//   console.log("work");
// }

function keyPressed() { // 81, 87, 69, 82, 84, 65, 83, 68, 70, 71
  switch (keyCode) {
    case 81: // Q
      console.log("81");
      break;
    case 87: // W
      console.log("81");
      break;
    case 69: // E
      console.log("81");
      break;
    case 82: // R
      console.log("81");
      break;
    case 84: // T
      console.log("81");
      break;
    case 65: // A
      console.log("81");
      break;
    case 83: // S
      console.log("81");
      break;
    case 68: // D
      console.log("81");
      break;
    case 70: // F
      console.log("81");
      break;
    case 71: // G
      console.log("81");
      break;
    default:
  }
}

function buySomething(cost, thingGained, amountGained) {
  money -= cost;
  switch (thingGained) {
    case "food":
      foodCount += amountGained;
      break;
    case "coffee":
      coffeeCount += amountGained;
      break;
    case "juice":
      happyJuiceCount += amountGained;
      break;
    case "boost":
      luckBoostCount += amountGained;
      break;
    case "box":
      lootboxCount += amountGained;
      break;
    case "lottery":
      lotteryCount += amountGained;
      break;
    case "gems":
      gems += amountGained;
    default:
  }
}

function doHelpQuest() {

}

function timeCode() {

}

function endingCheck() {
  if (hunger <= 0) {
    gameEnded = true;
    endingType = 4;
  }
  if (happiness <= 0) {
    gameEnded = true;
    endingType = 2;
  }
}
