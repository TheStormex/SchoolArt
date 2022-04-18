"use strict";

/*****************

The Lootbox Mechanic
Che Tan

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
let socialPoints = 0; // 100 total, more have, slower happiness falls
// shop stats
let foodCount = 0;
let coffeeCount = 0;
let happyJuiceCount = 0;
let lootboxCount = 1;
let foodPrice = 18;
let coffeePrice = 15;
let happyJuicePrice = 8;
// let luckBoostPrice = 5;
let lootboxPrice = 10;
let lootboxSalesPrice = 5;
// let lotteryPrice = 20;
// let cookingPrice = 30;
let socializePrice = 30;

let coffeeUsed = false;

// if drank coffee, how much more work is done per click
let coffeeBoost = 5;
let productivity = 1;
let productivityBase = 1;
// how much food gives interm of hunger
let foodBoost = 20;
let happyJuiceBoost = 20;
// each used gives 1 less happiness back
let happyJuiceUsed = 0;
let lootboxBought = 0;
let lootboxOpened = 0;
let numberOfItems;
let lootboxItems = [];
let firstLootbox = true;

// obstacles
let obstacleWorkUp = false;
let obstacleWorkTimer = 0;
let obstacleWorkCooldown = 60 * 30;
let obstacleWorkClicks = 0;
let obstacleWorkTotalClicks = 1;
let obstacleBuyUp = false;
let obstacleBuyTimer = 0;
let obstacleBuyCooldown = 60 * 32;
let obstacleBuyClicks = 0;
let obstacleBuyTotalClicks = 1;
let obstacleUseUp = false;
let obstacleUseTimer = 0;
let obstacleUseCooldown = 60 * 25;
let obstacleUseClicks = 0;
let obstacleUseTotalClicks = 1;
let obstacleTimeUp = false;
let obstacleTimeTimer = 0;
let obstacleTimeCooldown = 60 * 28;
let obstacleTimeClicks = 0;
let obstacleTimeTotalClicks = 1;
let obstacleStatsUp = false;
let obstacleStatsTimer = 0;
let obstacleStatsCooldown = 60 * 33;
let obstacleStatsClicks = 0;
let obstacleStatsTotalClicks = 1;
let obstaclePopupUp = false;
let obstaclePopupTimer = 0;
let obstaclePopupCooldown = 60 * 26;
let obstaclePopupClicks = 0;
let obstaclePopupTotalClicks = 1;


// lootbox
// NPC levels and exp
// Awareness points: start at 0, at 100, ending 1. Can gather by clicking on petition regulations once the player is aware of it. To become aware, must help each coworker enough.
// Coworker relationship points (for each coworker): all start at 1, end at 10, once `0, gets condition to start petition.
// Addiction points: start at 100, calculated to how much happiness is lost every second. Buying the lootboxes increase this, buying the expensive upgrades of cooking skills, attending hobby groups, help coworkers decrease it. At 0, open the option to

let week = 1; // 15 total, at end of 15th week, end game
let weekPercent = 0; // when 100, goes to next week
let regulationPoints = 0; // wins game at 25
let playerRegulationPoints = 0;

// the current letter to press to proceed (Q W E R T A S D F G)
let workLetter = 0;
let workLettersList = [81, 87, 69, 82, 84, 65, 83, 68, 70, 71];

// how much exp gained from working one letter depend on level
// these are boosted by coffee and happiness points
let expPerLevel = [10, 8, 6, 4, 2, 1, 1, 1, 1, 1];
let moneyPerLevel = [1, 2, 4, 6, 8, 10, 12, 14, 16, 20];

let newsText = 6;
let newsTextList = [
  "At the end of this week, the worst performing employee will be fired.",
  "Luckily, due to good performance, no one needs to be fired this time.",
  "Lootboxes are on sale this weekend! Support our business and be happy!",
  "Support our business! Do not support that ridiculous petition!",
  "Keep up the good work! You are bringing joy to all!",
  "Satisfy your needs today! Lootboxes just a click away!",
  "Good luck on your first week! Have a lootbox on us! Press L to open it!"
];

let gameEnded = false;
// 1 = Regulations; 2 = depression; 3 = unproductive; 4 = starvation; 5 = disloyal; 6 = better job; 7 = promotion; 8 = downsizing
let endingType = 0;

//time variables
let framecount = 0;
let hungerTimer = 0;
let hungerCooldown = 90;
let happinessTimer = 0;
let happinessCooldown = 60;
let weekTimer = 0;
let weekCooldown = 36;
let coffeeTimer = 0;
let coffeeCooldown = 120;

function preload() {
  // load images
  i_ending1 = loadImage(`assets/images/regulations1.PNG`);
  i_ending1_2 = loadImage(`assets/images/regulations2.PNG`);
  i_ending2 = loadImage(`assets/images/depress.PNG`);
  i_ending3 = loadImage(`assets/images/unproduct.PNG`);
  i_ending4 = loadImage(`assets/images/starve.PNG`);
  i_ending5 = loadImage(`assets/images/disloyal.PNG`);
  i_ending6 = loadImage(`assets/images/network.PNG`);
  i_ending7 = loadImage(`assets/images/promotion.PNG`);
  i_ending8 = loadImage(`assets/images/downsize.PNG`);
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
    instructions();
    shopWindow();
    workWindow();
    weekCount();
    playerStats();
    newsWindow();
    socializeAction();
    petition();
    newJob();
    obstacles();
    lastLootbox();
    salesAlert();
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

function instructions() {
  fill(200);
  rectMode(CENTER, CENTER);
  rect(width - width / 9, height / 4, width / 5, height / 2.7);
  fill(0);
  textSize(width / 80 + height / 80);
  textAlign(CENTER, CENTER);
  text("Instructions", width - width / 9, height / 3 - height / 4.2);
  textSize(width / 100 + height / 100);
  text("Press the indicated keys", width - width / 9, height / 3 - height / 5);
  text("Work for money", width - width / 9, height / 3 - height / 6);
  text("Keep hunger and happiness", width - width / 9, height / 3 - height / 7.5);
  text("from reaching 0", width - width / 9, height / 3 - height / 10);
  text("Survive 15 weeks of work", width - width / 9, height / 3 - height / 15);
  text("Reach level 10 for promotion", width - width / 9, height / 3 - height / 30);
  text("Stave off addiction", width - width / 9,  height / 2 - height / 6);
  text("Work as hard as you can", width - width / 9, height / 2 - height / 7.5);
  text("or find another way...", width - width / 9, height / 2 - height / 10);
}

function shopWindow() {
  fill(200);
  rectMode(CENTER, CENTER);
  rect(width / 2, height - height / 5, width, height / 4 + height / 6);
  fill(0);
  textSize(width / 50 + height / 50);
  textAlign(CENTER, CENTER);
  text("Shop", width / 20, height - height / 2.7);

  textSize(width / 50 + height / 50);
  text("Food", width / 6, height - height / 2.7);
  text("Coffee", width / 2.8, height - height / 2.7);
  text("Happy Juice", width - width / 2.5, height - height / 2.7);
  // food
  textSize(width / 80 + height / 80);
  text("Restore Hunger", width / 6, height - height / 3.5);
  text("Buy for " + foodPrice + " $ (Y)", width / 6, height - height / 4);
  text("Use 1 (H)", width / 6, height - height / 8);
  text("You have " + foodCount, width / 6, height - height / 12);
  // coffee
  text("Work Faster for 5 seconds", width / 2.8, height - height / 3.5);
  text("Buy for " + coffeePrice + " $ (U)", width / 2.8, height - height / 4);
  text("Use 1 (J)", width / 2.8, height - height / 8);
  text("You have " + coffeeCount, width / 2.8, height - height / 12);
  // juice
  text("Restore Happiness", width - width / 2.5, height - height / 3.5);
  text("Buy for " + happyJuicePrice + " $ (I)", width - width / 2.5, height - height / 4);
  text("Use 1 (K)", width - width / 2.5, height - height / 8);
  text("You have " + happyJuiceCount, width - width / 2.5, height - height / 12);
  // lootbox
  // extra attention to lootbox if low happiness
  if (weekPercent >= 80) {
    fill(255, 0, 0);
    text("Buy for " + lootboxSalesPrice + " $ (O)", width - width / 6, height - height / 4);
  } else {
    fill(0);
    text("Buy for " + lootboxPrice + " $ (O)", width - width / 6, height - height / 4);
  }
  if (happiness < 70) {
    fill(255, 0, 0);
  }
  if (happiness < 40) {
    textSize(width / 100 + height / 100);
    text("You know you want it", width - width / 6, height - height / 5);
  } else {
    fill(0);
  }
  textSize(width / 50 + height / 50);
  text("Lootbox", width - width / 6, height - height / 2.7);
  textSize(width / 80 + height / 80);
  text("Can be anything!", width - width / 6, height - height / 3.5);
  text("Use 1 (L)", width - width / 6, height - height / 8);
  text("You have " + lootboxCount, width - width / 6, height - height / 12);
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

function newJob() {
  if (socialPoints >= 100) {
    fill(200);
    rectMode(LEFT, CENTER);
    rect(width / 11, height / 2.7, width / 6, height / 8);
    fill(0);
    textSize(width / 100 + height / 100);
    textAlign(CENTER, CENTER);
    text("You got a new job offer", width / 11, height / 3);
    text("from a friend, take it?", width / 11, height / 2.7);
    text("Press 1", width / 11, height / 2.45);
  }
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
  if (socialPoints >= 100) {
    newsText = 3;
  } else if (weekPercent >= 80) {
    newsText = 2;
  } else {
    if (week === 5 || week === 10 || week === 15) {
      newsText = 0;
    } else if (week === 6 || week === 11) {
      newsText = 1;
    } else if (week === 1) {
      newsText = 6;
    } else if (week === 2 || week === 4 || week === 8 || week === 12 || week === 14) {
      newsText = 5;
    } else if (week === 3 || week === 7 || week === 9 || week === 13) {
      newsText = 4;
    }
  }
  text(newsTextList[newsText], width / 12, height / 2.1);
}

function salesAlert() {
  if (weekPercent >= 80) {
    textSize(width / 80 + height / 80);
    textAlign(CENTER, CENTER);
    fill(255, 0, 0);
    text("LOOTBOX SALES!", width - width / 7, height / 30);
  }
}

function socializeAction() {
  fill(0);
  textSize(width / 100 + height / 100);
  textAlign(CENTER, CENTER);
  text("Take time off to socialize (M) for 20$", width - width / 2.2, height / 30);
}

function petition() {
  if (socialPoints === 100) {
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
  }
}

function lastLootbox() {
  fill(255, 200, 0);
  rectMode(CENTER, CENTER);
  rect(width - width / 3, height / 4, width / 5, height / 2.7);
  fill(0);
  textSize(width / 80 + height / 80);
  textAlign(CENTER, CENTER);
  text("Last Lootbox", width - width / 3, height / 3 - height / 4.2);
  textSize(width / 100 + height / 100);
  for (let i = 0; i < lootboxItems.length; i++) {
    text(lootboxItems[i][0] + " X " + lootboxItems[i][1], width - width / 3, height / 6 + (height / 15) * i);
  }
}

// draw obstacles
function obstacles() {
  // work
  if (obstacleWorkUp === true) {
    fill(0);
    rectMode(LEFT, CENTER);
    rect(width / 2.8, height / 4, width / 2.8, height / 2.7);
    fill(255);
    textSize(width / 20 + height / 20);
    textAlign(CENTER, CENTER);
    text("Z", width / 2.8, height / 4);
  }
  // buy
  if (obstacleBuyUp === true) {
    fill(0);
    rectMode(LEFT, CENTER);
    rect(width / 3, height - height / 3.5, width - width / 5, height / 4);
    fill(255);
    textSize(width / 20 + height / 20);
    textAlign(CENTER, CENTER);
    text("X", width / 3, height - height / 3.5);
  }
  // use
  if (obstacleUseUp === true) {
    fill(0);
    rectMode(LEFT, CENTER);
    rect(width / 3, height - height / 10, width - width / 5, height / 5);
    fill(255);
    textSize(width / 20 + height / 20);
    textAlign(CENTER, CENTER);
    text("C", width / 3, height - height / 10);
  } // time
  if (obstacleTimeUp === true) {
    fill(0);
    rectMode(LEFT, CENTER);
    rect(width / 2.1, height / 30, width / 2.4, height / 20);
    fill(255);
    textSize(width / 80 + height / 80);
    textAlign(CENTER, CENTER);
    text("V", width / 2.1, height / 30);
  } // stats
  if (obstacleStatsUp === true) {
    fill(0);
    rectMode(LEFT, CENTER);
    rect(width / 11, height / 4, width / 6, height / 2.7);
    fill(255);
    textSize(width / 20 + height / 20);
    textAlign(CENTER, CENTER);
    text("B", width / 11, height / 4);
  } // popup
  if (obstaclePopupUp === true) {
    fill(0);
    rectMode(CENTER, CENTER);
    rect(width / 2.6, height - height / 2.05, width - width / 5.4, height / 7);
    fill(255);
    textSize(width / 20 + height / 20);
    text("N", width / 2.6, height - height / 2.05);
    fill(255, 0, 0);
    textSize(width / 20 + height / 20);
    textAlign(CENTER, CENTER);
    let xLocation = random(width);
    let yLocation = random(height);
    text("LOOTBOX!", xLocation, yLocation);

  }
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
    if (obstacleWorkUp === false) {
      if (keyCode === workLettersList[workLetter]) {
        if (coffeeUsed === true) {
          productivity += coffeeBoost;
        } else {
          productivity = productivityBase;
        }
        money += (moneyPerLevel[playerLevel - 1]) * productivity;
        playerExp += (expPerLevel[playerLevel - 1]) * productivity;
        workLetter = round(random(9));
      } else {
        // if work key not the right one, lose
        money -= moneyPerLevel[playerLevel - 1];
        happiness--;
        if (money < 0) {
          money = 0;
        }
      }
    }
  } else {
    // if key is not a work key, do the action
    switch (keyCode) {
      case 80: // P
        if (socialPoints === 100) {
          regulationPoints++;
          weekPercent += 2;
        }
        break;
      case 49: // 1
        if (socialPoints === 100) {
          gameEnded = true;
          endingType = 6;
        }
        break;
        // use items
      case 72: // H
        if (obstacleUseUp === false) {
          if (foodCount > 0) {
            foodCount--;
            hunger += foodBoost;
            hunger = constrain(hunger, 0, 100);
          }
        }
        break;
      case 74: // J
        if (obstacleUseUp === false) {
          if (coffeeCount > 0) {
            coffeeCount--;
            coffeeUsed = true;
            coffeeTimer = 0;
          }
        }
        break;
      case 75: // K
        if (obstacleUseUp === false) {
          if (happyJuiceCount > 0) {
            happyJuiceCount--;
            happiness += happyJuiceBoost - happyJuiceUsed;
            happiness = constrain(happiness, 0, 100);
            happyJuiceUsed++;
          }
        }
        break;
      case 76: // L
        if (lootboxCount > 0) {
          lootboxCount--;
          openLootbox();
        }
        break;
        // buy items
      case 89: // Y
        if (obstacleBuyUp === false) {
          if (money >= foodPrice) {
            money -= foodPrice;
            foodCount++;
          }
        }
        break;
      case 85: // U
        if (obstacleBuyUp === false) {
          if (money >= coffeePrice) {
            money -= coffeePrice;
            coffeeCount++;
          }
        }
        break;
      case 73: // I
        if (obstacleBuyUp === false) {
          if (money >= happyJuicePrice) {
            money -= happyJuicePrice;
            happyJuiceCount++;
          }
        }
        break;
      case 79: // O
        if (weekPercent >= 80) {
          if (money >= lootboxSalesPrice) {
            money -= lootboxSalesPrice;
            lootboxCount++;
            lootboxBought++;
          }
        } else {
          if (money >= lootboxPrice) {
            money -= lootboxPrice;
            lootboxCount++;
            lootboxBought++;
          }
        }
        break;
      case 77: // M, socialize
        if (obstacleTimeUp === false) {
          if (money >= 20) {
            money -= 20;
            happiness += 3 + round(socialPoints / 2);
            happiness = constrain(happiness, 0, 100);
            weekPercent += 20;
            socialPoints += 5;
            socialPoints = constrain(socialPoints, 0, 100);
          }
        }
        break;
        // if the obstacles are present
      case 90: // Z, work
        if (obstacleWorkUp === true) {
          obstacleWorkClicks++;
          if (obstacleWorkClicks >= obstacleWorkTotalClicks) {
            obstacleWorkUp = false;
            obstacleWorkTimer = 0;
            obstacleWorkTotalClicks = round(random(1)) + 1;
          }
        }
        break;
      case 88: // X, buy
        if (obstacleBuyUp === true) {
          obstacleBuyClicks++;
          if (obstacleBuyClicks >= obstacleBuyTotalClicks) {
            obstacleBuyUp = false;
            obstacleBuyTimer = 0;
            obstacleBuyTotalClicks = round(random(1)) + 1;
          }
        }
        break;
      case 67: // C, use
        if (obstacleUseUp === true) {
          obstacleUseClicks++;
          if (obstacleUseClicks >= obstacleUseTotalClicks) {
            obstacleUseUp = false;
            obstacleUseTimer = 0;
            obstacleUseTotalClicks = round(random(1)) + 1;
          }
        }
        break;
      case 86: // V, time
        if (obstacleTimeUp === true) {
          obstacleTimeClicks++;
          if (obstacleTimeClicks >= obstacleTimeTotalClicks) {
            obstacleTimeUp = false;
            obstacleTimeTimer = 0;
            obstacleTimeTotalClicks = round(random(1)) + 1;
          }
        }
        break;
      case 66: // B, stats
        if (obstacleStatsUp === true) {
          obstacleStatsClicks++;
          if (obstacleStatsClicks >= obstacleStatsTotalClicks) {
            obstacleStatsUp = false;
            obstacleStatsTimer = 0;
            obstacleStatsTotalClicks = round(random(1)) + 1;
          }
        }
        break;
      case 78: // N, popup
        if (obstaclePopupUp === true) {
          obstaclePopupClicks++;
          if (obstaclePopupClicks >= obstaclePopupTotalClicks) {
            obstaclePopupUp = false;
            obstaclePopupTimer = 0;
            obstaclePopupTotalClicks = round(random(1)) + 1;
          }
        }
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

// when opening a lootbox, how many different items are gained
// how many of each of those items are gained
function openLootbox() {
  lootboxOpened++;
  if (firstLootbox === true) {
    lootboxItems = [
      [],
      [],
      [],
      []
    ];
    numberOfItems = 4;
    lootboxItems.length = numberOfItems;
    for (let i = 0; i < numberOfItems; i++) {
      let thisItemCode = round(random(100));
      let quantityCode = round(random(100));;
      let thisItem;
      let thisItemName;
      let thisItemQuantity;
      if (thisItemCode <= 40) {
        thisItem = 0;
      } else if (thisItemCode > 40 && thisItemCode <= 70) {
        thisItem = 1;
      } else if (thisItemCode > 70 && thisItemCode <= 90) {
        thisItem = 2;
      } else {
        thisItem = 3;
      }
      if (quantityCode <= 80) {
        thisItemQuantity = 2;
      } else if (quantityCode > 80 && quantityCode <= 95) {
        thisItemQuantity = 3;
      } else if (quantityCode > 95) {
        thisItemQuantity = 4;
      }
      switch (thisItem) {
        case 0: // juice
          happyJuiceCount += thisItemQuantity;
          thisItemName = "Happy Juice";
          break;
        case 1: // coffee
          coffeeCount += thisItemQuantity;
          thisItemName = "Coffee";
          break;
        case 2: // food
          foodCount += thisItemQuantity;
          thisItemName = "Food";
          break;
        case 3: // lootbox
          lootboxCount += thisItemQuantity;
          thisItemName = "Lootbox";
          break;
        default:
      }
      lootboxItems[i] = [thisItemName, thisItemQuantity];
    }
    firstLootbox = false;
  } else {
    let randomGenerated = round(random(100));
    if (randomGenerated <= 70) {
      numberOfItems = 1;
    } else if (randomGenerated > 70 && randomGenerated <= 90) {
      numberOfItems = 2;
    } else if (randomGenerated > 90 && randomGenerated < 98) {
      numberOfItems = 3;
    } else {
      numberOfItems = 4;
    }
    lootboxItems = [
      [],
      [],
      [],
      []
    ];
    lootboxItems.length = numberOfItems;
    for (let i = 0; i < numberOfItems; i++) {
      let thisItemCode = round(random(100));
      let quantityCode = round(random(100));;
      let thisItem;
      let thisItemName;
      let thisItemQuantity;
      if (thisItemCode <= 40) {
        thisItem = 0;
      } else if (thisItemCode > 40 && thisItemCode <= 70) {
        thisItem = 1;
      } else if (thisItemCode > 70 && thisItemCode <= 90) {
        thisItem = 2;
      } else {
        thisItem = 3;
      }
      if (quantityCode <= 80) {
        thisItemQuantity = 1;
      } else if (quantityCode > 80 && quantityCode <= 95) {
        thisItemQuantity = 2;
      } else if (quantityCode > 95 && quantityCode < 98) {
        thisItemQuantity = 3;
      } else {
        thisItemQuantity = 4;
      }
      switch (thisItem) {
        case 0: // juice
          happyJuiceCount += thisItemQuantity;
          thisItemName = "Happy Juice";
          break;
        case 1: // coffee
          coffeeCount += thisItemQuantity;
          thisItemName = "Coffee";
          break;
        case 2: // food
          foodCount += thisItemQuantity;
          thisItemName = "Food";
          break;
        case 3: // lootbox
          lootboxCount += thisItemQuantity;
          thisItemName = "Lootbox";
          break;
        default:
      }
      lootboxItems[i] = [thisItemName, thisItemQuantity];
    }
  }
}

function levelUp() {
  if (playerLevel < 10) {
    if (playerExp >= 100) {
      playerExp = 0;
      playerLevel++;
    }
  } else {
    // nothing
  }
}

function timeCode() {
  happinessTimer++;
  if (happinessTimer >= (happinessCooldown + socialPoints * 5 - lootboxOpened * 5)) {
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
  if (coffeeUsed === true) {
    coffeeTimer++;
    if (coffeeTimer >= coffeeCooldown) {
      coffeeUsed = false;
    }
  }
  // obstale timers, wait until time to turn it on
  if (obstacleWorkUp === false) {
    obstacleWorkTimer++;
    obstacleWorkClicks = 0;
    if (obstacleWorkTimer >= (obstacleWorkCooldown + socialPoints * 4 - week * 30 + random(360))) {
      obstacleWorkUp = true;
    }
  }
  if (obstacleBuyUp === false) {
    obstacleBuyTimer++;
    obstacleBuyClicks = 0;
    if (obstacleBuyTimer >= (obstacleBuyCooldown + socialPoints * 4 - week * 30 + random(360))) {
      obstacleBuyUp = true;
    }
  }
  if (obstacleUseUp === false) {
    obstacleUseTimer++;
    obstacleUseClicks = 0;
    if (obstacleUseTimer >= (obstacleUseCooldown + socialPoints * 4 - week * 30 + random(360))) {
      obstacleUseUp = true;
    }
  }
  if (obstacleTimeUp === false) {
    obstacleTimeTimer++;
    obstacleTimeClicks = 0;
    if (obstacleTimeTimer >= (obstacleTimeCooldown + socialPoints * 4 - week * 30 + random(360))) {
      obstacleTimeUp = true;
    }
  }
  if (obstacleStatsUp === false) {
    obstacleStatsTimer++;
    obstacleStatsClicks = 0;
    if (obstacleStatsTimer >= (obstacleStatsCooldown + socialPoints * 4 - week * 30 + random(360))) {
      obstacleStatsUp = true;
    }
  }
  if (obstaclePopupUp === false) {
    obstaclePopupTimer++;
    obstaclePopupClicks = 0;
    if (obstaclePopupTimer >= (obstaclePopupCooldown + socialPoints * 4 - week * 30 + random(360))) {
      obstaclePopupUp = true;
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
  if (regulationPoints >= 25) {
    gameEnded = true;
    endingType = 1;
  }
  if (week >= 5) {
    if (playerLevel < 4) {
      gameEnded = true;
      endingType = 3;
    }
  }
  if (week >= 10) {
    if (playerLevel < 6) {
      gameEnded = true;
      endingType = 3;
    }
  }
  if (week >= 15 && weekPercent === 100) {
    gameEnded = true;
    if (playerLevel >= 10) {
      if (regulationPoints >= 3) {
        endingType = 5;
      } else {
        endingType = 7;
      }
    } else {
      endingType = 8;
    }
  }
}
