"use strict";

/*****************

Raving Redactionist
Pippin Barr

You are redacting a document, but it keeps becoming unredacted!
Click the secret information to hide it, don't let all the
secrets become revealed!

******************/
let gameScreen;

// variables:
let playerLevel = 1;
let playerExp = 0;
let happiness = 100;
let money = 0;
let gems = 0;
let hunger = 100;
let luckOriginal = 1;
let luck = 1;
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

let week = 0;
let weekPercent = 0;
let regulationPoints = 0;
let cookingPoints = 0;
let hobbyPoints = 0;

let workList = [];

let newsText = "News text";

let gameEnded = no;
// 1 = Regulations; 2 = depression; 3 = unproductive; 4 = starvation; 5 = snake; 6 = better job; 7 = promotion
let endingType = 0;

// $(document).ready(start);



// function start() {
// }

function setup() {
  gameScreen = createCanvas(windowWidth, windowHeight);
  gameScreen.style('display', 'block');
  noStroke();
}

function draw() {
  // calculate variables
  ranking();
  endingCheck();
  // draw elemnents
  windowResized();
  background(255);
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
}

// drawing functions

function titleWord() {
  textSize(width/60+height/60);
  textAlign(CENTER, CENTER);
  fill(0);
  text("The Lootbox Mechanic", width/7.5, height/30);
}

function shopWindow() {
  fill(200);
  rectMode(CENTER, CENTER);
  rect(width/2, height-height/5, width, height/4+height/6);
  fill(0);
  textSize(width/100+height/100);
  textAlign(CENTER, CENTER);
  text("Type", width/20, height-height/2.6);
  text("Tier", width/60, height-height/2.8);
  text("1", width/60, height-height/3.3);
  text("2", width/60, height-height/4.2);
  text("3", width/60, height-height/6);
  text("4", width/60, height-height/10);
  text("5", width/60, height-height/30);
  text("10%", width/18, height-height/3.3);
  text("25%", width/18, height-height/4.2);
  text("40%", width/18, height-height/6);
  text("60%", width/18, height-height/10);
  text("85%", width/18, height-height/30);
  text("Food", width/8, height-height/2.6);
  text("Coffee", width/4, height-height/2.6);
  text("Happy Juice", width/2.5, height-height/2.6);
  text("Luck Boost", width-width/2.4, height-height/2.6);
  text("Lootbox", width-width/4.5, height-height/2.6);
  text("Lottery", width-width/15, height-height/2.6);
  // food
  fill(255, 200, 0);
  rect(width/9, height-height/3.3, width/25, height/30);
  rect(width/6, height-height/3.3, width/25, height/30);
  rect(width/9, height-height/4.2, width/25, height/30);
  rect(width/6, height-height/4.2, width/25, height/30);
  rect(width/9, height-height/6, width/25, height/30);
  rect(width/6, height-height/6, width/25, height/30);
  rect(width/9, height-height/10, width/25, height/30);
  rect(width/6, height-height/10, width/25, height/30);
  rect(width/9, height-height/30, width/25, height/30);
  rect(width/6, height-height/30, width/25, height/30);
  fill(0);
  text("Buy", width/9, height-height/3.3);
  text("Use", width/6, height-height/3.3);
  text("Buy", width/9, height-height/4.2);
  text("Use", width/6, height-height/4.2);
  text("Buy", width/9, height-height/6);
  text("Use", width/6, height-height/6);
  text("Buy", width/9, height-height/10);
  text("Use", width/6, height-height/10);
  text("Buy", width/9, height-height/30);
  text("Use", width/6, height-height/30);
  text(foodPrices[0] + "$", width/9, height-height/3);
  text("X " + foodCount[0], width/6, height-height/3);
  text(foodPrices[1] + "$", width/9, height-height/3.7);
  text("X " + foodCount[1], width/6, height-height/3.7);
  text(foodPrices[2] + "$", width/9, height-height/5);
  text("X " + foodCount[2], width/6, height-height/5);
  text(foodPrices[3] + "$", width/9, height-height/7.6);
  text("X " + foodCount[3], width/6, height-height/7.6);
  text(foodPrices[4] + "$", width/9, height-height/16);
  text("X " + foodCount[4], width/6, height-height/16);
  // coffee
  fill(255, 200, 0);
  rect(width/4.3, height-height/3.3, width/25, height/30);
  rect(width/3.4, height-height/3.3, width/25, height/30);
  rect(width/4.3, height-height/4.2, width/25, height/30);
  rect(width/3.4, height-height/4.2, width/25, height/30);
  rect(width/4.3, height-height/6, width/25, height/30);
  rect(width/3.4, height-height/6, width/25, height/30);
  rect(width/4.3, height-height/10, width/25, height/30);
  rect(width/3.4, height-height/10, width/25, height/30);
  rect(width/4.3, height-height/30, width/25, height/30);
  rect(width/3.4, height-height/30, width/25, height/30);
  fill(0);
  text("Buy", width/4.3, height-height/3.3);
  text("Use", width/3.4, height-height/3.3);
  text("Buy", width/4.3, height-height/4.2);
  text("Use", width/3.4, height-height/4.2);
  text("Buy", width/4.3, height-height/6);
  text("Use", width/3.4, height-height/6);
  text("Buy", width/4.3, height-height/10);
  text("Use", width/3.4, height-height/10);
  text("Buy", width/4.3, height-height/30);
  text("Use", width/3.4, height-height/30);
  text(coffeePrices[0] + "$", width/4.3, height-height/3);
  text("X " + coffeeCount[0], width/3.4, height-height/3);
  text(coffeePrices[1] + "$", width/4.3, height-height/3.7);
  text("X " + coffeeCount[1], width/3.4, height-height/3.7);
  text(coffeePrices[2] + "$", width/4.3, height-height/5);
  text("X " + coffeeCount[2], width/3.4, height-height/5);
  text(coffeePrices[3] + "$", width/4.3, height-height/7.6);
  text("X " + coffeeCount[3], width/3.4, height-height/7.6);
  text(coffeePrices[4] + "$", width/4.3, height-height/16);
  text("X " + coffeeCount[4], width/3.4, height-height/16);
  // happy Juice
  fill(255, 200, 0);
  rect(width/2.7, height-height/3.3, width/25, height/30);
  rect(width/2.3, height-height/3.3, width/25, height/30);
  rect(width/2.7, height-height/4.2, width/25, height/30);
  rect(width/2.3, height-height/4.2, width/25, height/30);
  rect(width/2.7, height-height/6, width/25, height/30);
  rect(width/2.3, height-height/6, width/25, height/30);
  rect(width/2.7, height-height/10, width/25, height/30);
  rect(width/2.3, height-height/10, width/25, height/30);
  rect(width/2.7, height-height/30, width/25, height/30);
  rect(width/2.3, height-height/30, width/25, height/30);
  fill(0);
  text("Buy", width/2.7, height-height/3.3);
  text("Use", width/2.3, height-height/3.3);
  text("Buy", width/2.7, height-height/4.2);
  text("Use", width/2.3, height-height/4.2);
  text("Buy", width/2.7, height-height/6);
  text("Use", width/2.3, height-height/6);
  text("Buy", width/2.7, height-height/10);
  text("Use", width/2.3, height-height/10);
  text("Buy", width/2.7, height-height/30);
  text("Use", width/2.3, height-height/30);
  text(happyJuicePrices[0] + "$", width/2.7, height-height/3);
  text("X " + happyJuiceCount[0], width/2.3, height-height/3);
  text(happyJuicePrices[1] + "$", width/2.7, height-height/3.7);
  text("X " + happyJuiceCount[1], width/2.3, height-height/3.7);
  text(happyJuicePrices[2] + "$", width/2.7, height-height/5);
  text("X " + happyJuiceCount[2], width/2.3, height-height/5);
  text(happyJuicePrices[3] + "$", width/2.7, height-height/7.6);
  text("X " + happyJuiceCount[3], width/2.3, height-height/7.6);
  text(happyJuicePrices[4] + "$", width/2.7, height-height/16);
  text("X " + happyJuiceCount[4], width/2.3, height-height/16);
  // luck boost
  fill(255, 200, 0);
  rect(width/1.8, height-height/3.3, width/25, height/30);
  rect(width/1.6, height-height/3.3, width/25, height/30);
  rect(width/1.8, height-height/4.2, width/25, height/30);
  rect(width/1.6, height-height/4.2, width/25, height/30);
  rect(width/1.8, height-height/6, width/25, height/30);
  rect(width/1.6, height-height/6, width/25, height/30);
  rect(width/1.8, height-height/10, width/25, height/30);
  rect(width/1.6, height-height/10, width/25, height/30);
  rect(width/1.8, height-height/30, width/25, height/30);
  rect(width/1.6, height-height/30, width/25, height/30);
  fill(0);
  text("Buy", width/1.8, height-height/3.3);
  text("Use", width/1.6, height-height/3.3);
  text("Buy", width/1.8, height-height/4.2);
  text("Use", width/1.6, height-height/4.2);
  text("Buy", width/1.8, height-height/6);
  text("Use", width/1.6, height-height/6);
  text("Buy", width/1.8, height-height/10);
  text("Use", width/1.6, height-height/10);
  text("Buy", width/1.8, height-height/30);
  text("Use", width/1.6, height-height/30);
  text(happyJuicePrices[0] + "$", width/1.8, height-height/3);
  text("X " + happyJuiceCount[0], width/1.6, height-height/3);
  text(happyJuicePrices[1] + "$", width/1.8, height-height/3.7);
  text("X " + happyJuiceCount[1], width/1.6, height-height/3.7);
  text(happyJuicePrices[2] + "$", width/1.8, height-height/5);
  text("X " + happyJuiceCount[2], width/1.6, height-height/5);
  text(happyJuicePrices[3] + "$", width/1.8, height-height/7.6);
  text("X " + happyJuiceCount[3], width/1.6, height-height/7.6);
  text(happyJuicePrices[4] + "$", width/1.8, height-height/16);
  text("X " + happyJuiceCount[4], width/1.6, height-height/16);
  // Lootbox
  fill(255, 200, 0);
  rect(width-width/4, height-height/3.3, width/25, height/30);
  rect(width-width/5.5, height-height/3.3, width/25, height/30);
  rect(width-width/4, height-height/4.2, width/25, height/30);
  rect(width-width/5.5, height-height/4.2, width/25, height/30);
  rect(width-width/4, height-height/6, width/25, height/30);
  rect(width-width/5.5, height-height/6, width/25, height/30);
  rect(width-width/4, height-height/10, width/25, height/30);
  rect(width-width/5.5, height-height/10, width/25, height/30);
  rect(width-width/4, height-height/30, width/25, height/30);
  rect(width-width/5.5, height-height/30, width/25, height/30);
  fill(0);
  text("Buy", width-width/4, height-height/3.3);
  text("Use", width-width/5.5, height-height/3.3);
  text("Buy", width-width/4, height-height/4.2);
  text("Use", width-width/5.5, height-height/4.2);
  text("Buy", width-width/4, height-height/6);
  text("Use", width-width/5.5, height-height/6);
  text("Buy", width-width/4, height-height/10);
  text("Use", width-width/5.5, height-height/10);
  text("Buy", width-width/4, height-height/30);
  text("Use", width-width/5.5, height-height/30);
  text(luckBoostPrices[0] + "$", width-width/4, height-height/3);
  text("X " + luckBoostCount[0], width-width/5.5, height-height/3);
  text(luckBoostPrices[1] + "$", width-width/4, height-height/3.7);
  text("X " + luckBoostCount[1], width-width/5.5, height-height/3.7);
  text(luckBoostPrices[2] + "$", width-width/4, height-height/5);
  text("X " + luckBoostCount[2], width-width/5.5, height-height/5);
  text(luckBoostPrices[3] + "$", width-width/4, height-height/7.6);
  text("X " + luckBoostCount[3], width-width/5.5, height-height/7.6);
  text(luckBoostPrices[4] + "$", width-width/4, height-height/16);
  text("X " + luckBoostCount[4], width-width/5.5, height-height/16);
  // Lottery
  fill(255, 200, 0);
  rect(width-width/10, height-height/3.3, width/25, height/30);
  rect(width-width/30, height-height/3.3, width/25, height/30);
  rect(width-width/10, height-height/4.2, width/25, height/30);
  rect(width-width/30, height-height/4.2, width/25, height/30);
  rect(width-width/10, height-height/6, width/25, height/30);
  rect(width-width/30, height-height/6, width/25, height/30);
  rect(width-width/10, height-height/10, width/25, height/30);
  rect(width-width/30, height-height/10, width/25, height/30);
  rect(width-width/10, height-height/30, width/25, height/30);
  rect(width-width/30, height-height/30, width/25, height/30);
  fill(0);
  text("Buy", width-width/10, height-height/3.3);
  text("Use", width-width/30, height-height/3.3);
  text("Buy", width-width/10, height-height/4.2);
  text("Use", width-width/30, height-height/4.2);
  text("Buy", width-width/10, height-height/6);
  text("Use", width-width/30, height-height/6);
  text("Buy", width-width/10, height-height/10);
  text("Use", width-width/30, height-height/10);
  text("Buy", width-width/10, height-height/30);
  text("Use", width-width/30, height-height/30);
  text(lotteryPrices[0] + "$", width-width/10, height-height/3);
  text("X " + lotteryCount[0], width-width/30, height-height/3);
  text(lotteryPrices[1] + "$", width-width/10, height-height/3.7);
  text("X " + lotteryCount[1], width-width/30, height-height/3.7);
  text(lotteryPrices[2] + "$", width-width/10, height-height/5);
  text("X " + lotteryCount[2], width-width/30, height-height/5);
  text(lotteryPrices[3] + "$", width-width/10, height-height/7.6);
  text("X " + lotteryCount[3], width-width/30, height-height/7.6);
  text(lotteryPrices[4] + "$", width-width/10, height-height/16);
  text("X " + lotteryCount[4], width-width/30, height-height/16);
}

function workWindow() {
  fill(200);
  rectMode(CENTER, CENTER);
  rect(width/2.8, height/4, width/2.8, height/2.7);
  fill(0);
  textSize(width/80+height/80);
  textAlign(CENTER, CENTER);
  text("Work", width/2.8, height/3-height/4.2);
}

function helpNeededWindow() {
  fill(200);
  rectMode(CENTER, CENTER);
  rect(width-width/3, height/4, width/4, height/2.7);
  fill(0);
  textSize(width/80+height/80);
  textAlign(CENTER, CENTER);
  text("Help Needed", width-width/3, height/3-height/4.2);
}

function weekCount() {
  fill(0);
  textSize(width/60+height/60);
  textAlign(CENTER, CENTER);
  text("Week " + week + "  " + weekPercent + "%", width/2.9, height/ 30);
}

function playerStats() {
  fill(0);
  textSize(width/100+height/100);
  textAlign(LEFT, CENTER);
  text("Player", width/100, height/12);
  text("Level " + playerLevel, width/100, height/8.5);
  text("EXP " + playerExp + "%", width/100, height/6.6);
  text("Happiness " + happiness + "%", width/100, height/5.4);
  text("Hunger " + hunger + "%", width/100, height/4.5);
  text("Money " + money + "$", width/100, height/3.9);
  text("JoyGems " + gems + " Gs", width/100, height/3.45);
}

function leaderboard() {
  fill(0);
  textSize(width/80+height/80);
  textAlign(LEFT, CENTER);
  text("Leaderboard", width-width/5, height/4.5);
  text("1", width-width/5, height/3.8);
}

function gemShop() {
  fill(0);
  textSize(width/100+height/100);
  textAlign(LEFT, CENTER);
  text("90 Gs", width/100, height/2.92);
  text("220 Gs", width/100, height/2.7);
  text("340 Gs", width/100, height/2.52);
  text("570 Gs", width/100, height/2.35);
  textAlign(RIGHT, CENTER);
  text("5$", width/10, height/2.92);
  text("13$", width/10, height/2.7);
  text("19$", width/10, height/2.51);
  text("33$", width/10, height/2.35);
  fill(255, 200, 0);
  rectMode(CENTER, CENTER);
  rect(width/7, height/2.92, width/20, height/40);
  rect(width/7, height/2.7, width/20, height/40);
  rect(width/7, height/2.51, width/20, height/40);
  rect(width/7, height/2.35, width/20, height/40);
  fill(0);
  textSize(width/100+height/100);
  textAlign(RIGHT, CENTER);
  text("BUY!", width/6.3, height/2.92);
  text("BUY!", width/6.3, height/2.7);
  text("BUY!", width/6.3, height/2.51);
  text("BUY!", width/6.3, height/2.35);
}

function newsWindow() {
  fill(200);
  rectMode(LEFT, CENTER);
  rect(width/2.6, height-height/2.05, width-width/5.4, height/7);
  fill(0);
  textSize(width/60+height/60);
  textAlign(CENTER, CENTER);
  text("News", width/30, height/2.1);
  textSize(width/100+height/100);
  textAlign(LEFT, CENTER);
  text(newsText, width/12, height/2.1);
}

function salesAlert() {
  fill(0);
  textSize(width/50+height/50);
  textAlign(CENTER, CENTER);
  text("SALES!", width-width/7, height/6);
  fill(255, 0, 0);
  ellipse(width-width/20, height/8, width/20+height/20);
}

function realSkills() {
  fill(0);
  textSize(width/100+height/100);
  textAlign(LEFT, CENTER);
  text("Learn Cooking", width-width/5, height/50);
  text("$", width-width/5, height/20);
  text("Hobby Group", width-width/5, height/12);
  text("$", width-width/5, height/9);
  fill(255, 200, 0);
  rectMode(CENTER, CENTER);
  rect(width-width/8, height/20, width/20, height/40);
  rect(width-width/8, height/9, width/20, height/40);
  fill(0);
  textSize(width/100+height/100);
  textAlign(RIGHT, CENTER);
  text("Do", width-width/8.5, height/20);
  text("Do", width-width/8.5, height/9);
}

function petition() {
  fill(255, 200, 0);
  rectMode(CENTER, CENTER);
  rect(width-width/2.7, height/30, width/6, height/30);
  fill(0);
  textSize(width/100+height/100);
  textAlign(CENTER, CENTER);
  text("Petition Regulations", width-width/2.7, height/30);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// calculation functions

function ranking() {

}

function doWork() {

}

function buySomething(cost, thingGained, amountGained) {

}

function endingCheck() {

}
