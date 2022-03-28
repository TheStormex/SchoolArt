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
let foodCount = 0;
let coffeeCount = 0;
let happyJuiceCount = 0;
let luckBoostCount = 0;
// lootbox
// NPC levels and exp
// Awareness points: start at 0, at 100, ending 1. Can gather by clicking on petition regulations once the player is aware of it. To become aware, must help each coworker enough.
// Coworker relationship points (for each coworker): all start at 1, end at 10, once `0, gets condition to start petition.
// Addiction points: start at 100, calculated to how much happiness is lost every second. Buying the lootboxes increase this, buying the expensive upgrades of cooking skills, attending hobby groups, help coworkers decrease it. At 0, open the option to

let week = 0;
let weekPercent = 0;

// $(document).ready(start);



// function start() {
// }

function setup() {
  gameScreen = createCanvas(windowWidth, windowHeight);
  gameScreen.style('display', 'block');
  noStroke();
}

function draw() {
  windowResized();
  background(255);
  // elemnents
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
  text("Food", width/8, height-height/2.6);
  text("Coffee", width/4, height-height/2.6);
  text("Happy Juice", width/2.5, height-height/2.6);
  text("Luck Boost", width-width/2.4, height-height/2.6);
  text("Lootbox", width-width/4.5, height-height/2.6);
  text("Lottery", width-width/15, height-height/2.6);
  text("Tier", width/60, height-height/2.8);
  text("Type", width/20, height-height/2.6);
  text("Tier", width/60, height-height/2.8);
  text("Type", width/20, height-height/2.6);
  text("Tier", width/60, height-height/2.8);
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
  text("JoyGems " + gems + " Gs", width/100, height/3.5);
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
  textSize(width/60+height/60);
  textAlign(CENTER, CENTER);
  text("Week " + week + "  " + weekPercent + "%", width/2.9, height/ 30);
}

function newsWindow() {
  fill(200);
  rectMode(CENTER, CENTER);
  rect(width/2, height-height/2.05, width, height/7);
  fill(0);
  textSize(width/60+height/60);
  textAlign(CENTER, CENTER);
  text("Week " + week + "  " + weekPercent + "%", width/2.9, height/ 30);
}

function salesAlert() {
  fill(0);
  textSize(width/50+height/50);
  textAlign(CENTER, CENTER);
  text("SALES!", width-width/7, height/6);
  fill(255, 0, 0);
  ellipse(width-width/20, height/6, width/30+height/30);
}

function realSkills() {
  fill(0);
  textSize(width/60+height/60);
  textAlign(CENTER, CENTER);
  text("Week " + week + "  " + weekPercent + "%", width/2.9, height/ 30);
}

function petition() {
  fill(255, 200, 0);
  rectMode(CENTER, CENTER);
  rect(width-width/2.7, height/30, width/6, height/20);
  fill(0);
  textSize(width/100+height/100);
  textAlign(CENTER, CENTER);
  text("Petition Regulations", width-width/2.7, height/30);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
