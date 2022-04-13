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
let playerMaxLevel = false;
let happiness = 100;
let money = 0;
// let gems = 0;
let hunger = 100;
let socialPoints = 0; // 100 total
// let luckOriginal = 1;
// let luck = 1;
// shop stats
let foodCount = 0;
let coffeeCount = 0;
let happyJuiceCount = 0;
// let luckBoostCount = 0;
let lootboxCount = 0;
// let lotteryCount = 0;
let foodPrice = 18;
let coffeePrice = 8;
let happyJuicePrice = 15;
// let luckBoostPrice = 5;
let lootboxPrice = 10;
// let lotteryPrice = 20;
// let cookingPrice = 30;
let socializePrice = 30;

let coffeeTimer = 0;
let coffeeCooldown = 10;
// if drank coffee, how much more work is done per click
let coffeeBoost = 2;
// base
let foodBoost = 20;


// lootbox
// NPC levels and exp
// Awareness points: start at 0, at 100, ending 1. Can gather by clicking on petition regulations once the player is aware of it. To become aware, must help each coworker enough.
// Coworker relationship points (for each coworker): all start at 1, end at 10, once `0, gets condition to start petition.
// Addiction points: start at 100, calculated to how much happiness is lost every second. Buying the lootboxes increase this, buying the expensive upgrades of cooking skills, attending hobby groups, help coworkers decrease it. At 0, open the option to

let week = 1; // 15 total, at end of 15th week, end game
let weekPercent = 0; // when 100, goes to next week
let regulationPoints = 0; // wins game at 100
let playerRegulationPoints = 0;
// let cookingPoints = 0; // caps out at 5
// let hobbyPoints = 0; // caps out at 5

// the current letter to press to proceed (Q W E R T A S D F G)
let workLetter = 0;
let workLettersList = [81, 87, 69, 82, 84, 65, 83, 68, 70, 71];
// let employeesList = [];
// let helpList = [];

// how much exp gained from working one letter depend on level
// these are boosted by coffee and happiness points
let expPerLevel = [10, 8, 6, 4, 2, 1, 1, 1, 1, 1];
let moneyPerLevel = [1, 2, 4, 6, 8, 10, 12, 14, 16, 20];



let newsText = 6;
let newsTextList = [
  "At the end of this week, the worst performing employee will be fired.",
  "Luckily, due to good performance, no one needs to be fired this time.",
  "Lootboxes are on sale this week! Support our business and be happy!",
  "Support our business! Do not support that rediculous peition!",
  "Keep up the good work! You are bringing joy to all!",
  "Satisfy your needs today! Lootboxes just a click away!",
  "Good luck on your first week! Make the boss proud!"
];

let gameEnded = false;
// 1 = Regulations; 2 = depression; 3 = unproductive; 4 = starvation; 5 = disloyal; 6 = better job; 7 = promotion; 8 = downsizing
let endingType = 0;

//time variables
let framecount = 0;
let hungerTimer = 0;
let hungerCooldown = 60;
let happinessTimer = 0;
let happinessCooldown = 90;
let weekTimer = 0;
let weekCooldown = 36;

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
  frameRate(60);
  noStroke();

  workLetter = round(random(9));
}

function draw() {
  background(255);
  if (gameEnded === false) {
    // calculate variables
    timeCode();
    endingCheck();
    levelUp();
    // draw elemnents
    windowResized();
    titleWord();
    shopWindow();
    workWindow();
    // helpNeededWindow();
    weekCount();
    playerStats();
    // gemShop();
    newsWindow();
    // salesAlert();
    realSkills();
    petition();
    framecount++;
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
  textSize(width / 50 + height / 50);
  textAlign(CENTER, CENTER);
  text("Shop", width / 20, height - height / 2.7);

  textSize(width / 100 + height / 100);
  text("Food", width / 6, height - height / 2.6);
  text("Coffee", width / 2.8, height - height / 2.6);
  text("Happy Juice", width - width / 2.5, height - height / 2.6);
  // extra attention to lootbox if low happiness
  if (happiness < 70) {
    textSize(width / 60 + height / 60);
  }
  if (happiness < 40) {
    fill(255, 0, 0);
  }
  text("Lootbox", width - width / 6, height - height / 2.6);
  // food
  fill(255, 200, 0);
  fill(0);

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
  // what news should play?

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

}

function petition() {
//  if (socialPoints === 100) {
    fill(200);
    rectMode(CENTER, CENTER);
    rect(width - width / 10, height - height / 2.05, width / 5.5, height / 7);
    fill(0);
    textSize(width / 100 + height / 100);
    textAlign(CENTER, CENTER);
    text("Promote Petition (P)", width - width / 10, height / 2.15);
    textSize(width / 150 + height / 150);
    text("You learned how the lootbox industry", width - width / 10, height - height / 2);
    text("Keep consumers addicted for profit", width - width / 10, height - height / 2.1);
    text("Your social circle created a petition", width - width / 10, height - height / 2.2);
    text("to regulate the market", width - width / 10, height - height / 2.3);
//  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// calculation functions

function keyPressed() { // 81, 87, 69, 82, 84, 65, 83, 68, 70, 71
  // check if key is a work key
  let isWorkKey = false;
  for (let i = 0; i < workLettersList.length; i++) {
    if (keyCode === workLettersList[i]) {
      isWorkKey = true;
    }
  }
  if (isWorkKey === true) {
    if (keyCode === workLettersList[workLetter]) {
      money += moneyPerLevel[playerLevel-1];
      playerExp += expPerLevel[playerLevel-1];
      workLetter = round(random(9));
    } else {
      // if work key not the right one, lose
      money -= moneyPerLevel[playerLevel-1];
      happiness--;
      if (money < 0) {
        money = 0;
      }
    }
  } else {
    // if key is not a work key, do the action
    switch (keyCode) {
      case 10:

        break;
      default:
    }
  }
  return false;
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
    case "box":
      lootboxCount += amountGained;
      break;
    default:
  }
}

function openLootbox() {

}

function levelUp() {
  if (playerLevel < 10) {
    if (playerExp >= 100) {
      playerExp = 0;
      playerLevel++;
    }
  } else {
    playerMaxLevel = true;
  }
}

function timeCode() {
  happinessTimer++;
  if (happinessTimer >= happinessCooldown) {
    happiness--;
    happinessTimer = 0;
  }
  hungerTimer++;
  if (hungerTimer >= hungerCooldown) {
    hunger--;
    hungerTimer = 0;
  }
  weekTimer++;
  if (weekTimer >= weekCooldown) {
    weekPercent++;
    weekTimer = 0;
  }
  if (weekPercent >= 100) {
    if (week < 15) {
      week++;
      weekPercent = 0;
    }
  }
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
  if (regulationPoints === 10) {
    gameEnded = true;
    endingType = 1;
  }
  if (week === 5) {
    if (playerLevel < 4) {
      endingType = 3;
    }
  }
  if (week === 5) {
    if (playerLevel < 4) {
      endingType = 3;
    }
  }
  if (week === 15 && weekPercent === 100) {
    gameEnded = true;
    if (playerLevel === 10) {
      if (playerRegulationPoints >= 3) {
        endingType = 5;
      } else {
        endingType = 7;
      }
    } else {
      endingType = 8;
    }
  }
}
