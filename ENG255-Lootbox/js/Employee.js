class Employee {
  constructor(name) {
    this.name = name;
    this.level = 1;
    this.exp = 0;
    this.productivity = 1;
    this.isAlly = false;
  }
  // text("Learn Cooking", width - width / 5, height / 50);
  // text(cookingPrice + "$", width - width / 5, height / 20);
  // text("Hobby Group", width - width / 5, height / 12);
  // text(hobbyPrice + "$", width - width / 5, height / 9);
  // fill(255, 200, 0);
  // rectMode(CENTER, CENTER);
  // rect(width - width / 8, height / 20, width / 20, height / 40);
  // rect(width - width / 8, height / 9, width / 20, height / 40);
  // fill(0);
  // textSize(width / 100 + height / 100);
  // textAlign(RIGHT, CENTER);
  // text("Do", width - width / 8.5, height / 20);
  // text("Do", width - width / 8.5, height / 9);

  // function leaderboard() {
  //   fill(0);
  //   textSize(width / 60 + height / 60);
  //   textAlign(LEFT, CENTER);
  //   text("Leaderboard", width - width / 5, height / 4.5);
  //   textSize(width / 80 + height / 80);
  //   text("1 - " + "name", width - width / 5, height / 3.5);
  //   text("Level - " + " EXP  - ", width - width / 5, height / 3.1);
  // }

  // function gemShop() {
  //   fill(0);
  //   textSize(width / 100 + height / 100);
  //   textAlign(LEFT, CENTER);
  //   text("90 Gs", width / 100, height / 2.92);
  //   text("220 Gs", width / 100, height / 2.7);
  //   text("340 Gs", width / 100, height / 2.52);
  //   text("570 Gs", width / 100, height / 2.35);
  //   textAlign(RIGHT, CENTER);
  //   text("5$", width / 10, height / 2.92);
  //   text("13$", width / 10, height / 2.7);
  //   text("19$", width / 10, height / 2.51);
  //   text("33$", width / 10, height / 2.35);
  //   fill(255, 200, 0);
  //   rectMode(CENTER, CENTER);
  //   rect(width / 7, height / 2.92, width / 20, height / 40);
  //   rect(width / 7, height / 2.7, width / 20, height / 40);
  //   rect(width / 7, height / 2.51, width / 20, height / 40);
  //   rect(width / 7, height / 2.35, width / 20, height / 40);
  //   fill(0);
  //   textSize(width / 100 + height / 100);
  //   textAlign(RIGHT, CENTER);
  //   text("BUY!", width / 6.3, height / 2.92);
  //   text("BUY!", width / 6.3, height / 2.7);
  //   text("BUY!", width / 6.3, height / 2.51);
  //   text("BUY!", width / 6.3, height / 2.35);
  // }
  // function helpNeededWindow() {
  //   fill(200);
  //   rectMode(CENTER, CENTER);
  //   rect(width - width / 3, height / 4, width / 4, height / 2.7);
  //   fill(0);
  //   textSize(width / 80 + height / 80);
  //   textAlign(CENTER, CENTER);
  //   text("Help Needed", width - width / 3, height / 3 - height / 4.2);
  // }
  // function doHelpQuest() {
  //
  // }
  // check all buttons, if any is pressed, do one of the following codes
  // function mousePressed() {
  //   // food buy
  //   if (mouseX < width/9 + width/25 && mouseX > width/9 && mouseY < height - height / 3.3 + height /30 && mouseY > height - height / 3.3) {
  //     console.log("click");
  //   }
  //   // food use
  //
  // }
  // calculate the numbers for doing work if right key is pressed
  // function doWork() {
  //   console.log("work");
  // }
  //  text("JoyGems " + gems + " Gs", width / 100, height / 3.45);
  // text("Tier", width / 60, height - height / 2.8);
  // text("1 (Y)", width / 60, height - height / 3.3);
  // text("2 (U)", width / 60, height - height / 4.2);
  // text("3 (I)", width / 60, height - height / 6);
  // text("4 (O)", width / 60, height - height / 10);
  // text("5 (P)", width / 60, height - height / 30);
  // text("10%", width / 18, height - height / 3.3);
  // text("25%", width / 18, height - height / 4.2);
  // text("40%", width / 18, height - height / 6);
  // text("60%", width / 18, height - height / 10);
  // text("85%", width / 18, height - height / 30);
  // text("Buy", width / 9, height - height / 3.3);
  // text("Use", width / 6, height - height / 3.3);
  // text("Buy", width / 9, height - height / 4.2);
  // text("Use", width / 6, height - height / 4.2);
  // text("Buy", width / 9, height - height / 6);
  // text("Use", width / 6, height - height / 6);
  // text("Buy", width / 9, height - height / 10);
  // text("Use", width / 6, height - height / 10);
  // text("Buy", width / 9, height - height / 30);
  // text("Use", width / 6, height - height / 30);
  // text(foodPrices[0] + "$", width / 9, height - height / 3);
  // text("X " + foodCount[0], width / 6, height - height / 3);
  // text(foodPrices[1] + "$", width / 9, height - height / 3.7);
  // text("X " + foodCount[1], width / 6, height - height / 3.7);
  // text(foodPrices[2] + "$", width / 9, height - height / 5);
  // text("X " + foodCount[2], width / 6, height - height / 5);
  // text(foodPrices[3] + "$", width / 9, height - height / 7.6);
  // text("X " + foodCount[3], width / 6, height - height / 7.6);
  // text(foodPrices[4] + "$", width / 9, height - height / 16);
  // text("X " + foodCount[4], width / 6, height - height / 16);
  // coffee
  // fill(255, 200, 0);
  // rect(width / 4.3, height - height / 3.3, width / 25, height / 30);
  // rect(width / 3.4, height - height / 3.3, width / 25, height / 30);
  // rect(width / 4.3, height - height / 4.2, width / 25, height / 30);
  // rect(width / 3.4, height - height / 4.2, width / 25, height / 30);
  // rect(width / 4.3, height - height / 6, width / 25, height / 30);
  // rect(width / 3.4, height - height / 6, width / 25, height / 30);
  // rect(width / 4.3, height - height / 10, width / 25, height / 30);
  // rect(width / 3.4, height - height / 10, width / 25, height / 30);
  // rect(width / 4.3, height - height / 30, width / 25, height / 30);
  // rect(width / 3.4, height - height / 30, width / 25, height / 30);
  // fill(0);
  // text("Buy", width / 4.3, height - height / 3.3);
  // text("Use", width / 3.4, height - height / 3.3);
  // text("Buy", width / 4.3, height - height / 4.2);
  // text("Use", width / 3.4, height - height / 4.2);
  // text("Buy", width / 4.3, height - height / 6);
  // text("Use", width / 3.4, height - height / 6);
  // text("Buy", width / 4.3, height - height / 10);
  // text("Use", width / 3.4, height - height / 10);
  // text("Buy", width / 4.3, height - height / 30);
  // text("Use", width / 3.4, height - height / 30);
  // text(coffeePrices[0] + "$", width / 4.3, height - height / 3);
  // text("X " + coffeeCount[0], width / 3.4, height - height / 3);
  // text(coffeePrices[1] + "$", width / 4.3, height - height / 3.7);
  // text("X " + coffeeCount[1], width / 3.4, height - height / 3.7);
  // text(coffeePrices[2] + "$", width / 4.3, height - height / 5);
  // text("X " + coffeeCount[2], width / 3.4, height - height / 5);
  // text(coffeePrices[3] + "$", width / 4.3, height - height / 7.6);
  // text("X " + coffeeCount[3], width / 3.4, height - height / 7.6);
  // text(coffeePrices[4] + "$", width / 4.3, height - height / 16);
  // text("X " + coffeeCount[4], width / 3.4, height - height / 16);
  // // happy Juice
  // fill(255, 200, 0);
  // rect(width / 2.7, height - height / 3.3, width / 25, height / 30);
  // rect(width / 2.3, height - height / 3.3, width / 25, height / 30);
  // rect(width / 2.7, height - height / 4.2, width / 25, height / 30);
  // rect(width / 2.3, height - height / 4.2, width / 25, height / 30);
  // rect(width / 2.7, height - height / 6, width / 25, height / 30);
  // rect(width / 2.3, height - height / 6, width / 25, height / 30);
  // rect(width / 2.7, height - height / 10, width / 25, height / 30);
  // rect(width / 2.3, height - height / 10, width / 25, height / 30);
  // rect(width / 2.7, height - height / 30, width / 25, height / 30);
  // rect(width / 2.3, height - height / 30, width / 25, height / 30);
  // fill(0);
  // text("Buy", width / 2.7, height - height / 3.3);
  // text("Use", width / 2.3, height - height / 3.3);
  // text("Buy", width / 2.7, height - height / 4.2);
  // text("Use", width / 2.3, height - height / 4.2);
  // text("Buy", width / 2.7, height - height / 6);
  // text("Use", width / 2.3, height - height / 6);
  // text("Buy", width / 2.7, height - height / 10);
  // text("Use", width / 2.3, height - height / 10);
  // text("Buy", width / 2.7, height - height / 30);
  // text("Use", width / 2.3, height - height / 30);
  // text(happyJuicePrices[0] + "$", width / 2.7, height - height / 3);
  // text("X " + happyJuiceCount[0], width / 2.3, height - height / 3);
  // text(happyJuicePrices[1] + "$", width / 2.7, height - height / 3.7);
  // text("X " + happyJuiceCount[1], width / 2.3, height - height / 3.7);
  // text(happyJuicePrices[2] + "$", width / 2.7, height - height / 5);
  // text("X " + happyJuiceCount[2], width / 2.3, height - height / 5);
  // text(happyJuicePrices[3] + "$", width / 2.7, height - height / 7.6);
  // text("X " + happyJuiceCount[3], width / 2.3, height - height / 7.6);
  // text(happyJuicePrices[4] + "$", width / 2.7, height - height / 16);
  // text("X " + happyJuiceCount[4], width / 2.3, height - height / 16);
  // // luck boost
  // fill(255, 200, 0);
  // rect(width / 1.8, height - height / 3.3, width / 25, height / 30);
  // rect(width / 1.6, height - height / 3.3, width / 25, height / 30);
  // rect(width / 1.8, height - height / 4.2, width / 25, height / 30);
  // rect(width / 1.6, height - height / 4.2, width / 25, height / 30);
  // rect(width / 1.8, height - height / 6, width / 25, height / 30);
  // rect(width / 1.6, height - height / 6, width / 25, height / 30);
  // rect(width / 1.8, height - height / 10, width / 25, height / 30);
  // rect(width / 1.6, height - height / 10, width / 25, height / 30);
  // rect(width / 1.8, height - height / 30, width / 25, height / 30);
  // rect(width / 1.6, height - height / 30, width / 25, height / 30);
  // fill(0);
  // text("Buy", width / 1.8, height - height / 3.3);
  // text("Use", width / 1.6, height - height / 3.3);
  // text("Buy", width / 1.8, height - height / 4.2);
  // text("Use", width / 1.6, height - height / 4.2);
  // text("Buy", width / 1.8, height - height / 6);
  // text("Use", width / 1.6, height - height / 6);
  // text("Buy", width / 1.8, height - height / 10);
  // text("Use", width / 1.6, height - height / 10);
  // text("Buy", width / 1.8, height - height / 30);
  // text("Use", width / 1.6, height - height / 30);
  // text(happyJuicePrices[0] + "$", width / 1.8, height - height / 3);
  // text("X " + happyJuiceCount[0], width / 1.6, height - height / 3);
  // text(happyJuicePrices[1] + "$", width / 1.8, height - height / 3.7);
  // text("X " + happyJuiceCount[1], width / 1.6, height - height / 3.7);
  // text(happyJuicePrices[2] + "$", width / 1.8, height - height / 5);
  // text("X " + happyJuiceCount[2], width / 1.6, height - height / 5);
  // text(happyJuicePrices[3] + "$", width / 1.8, height - height / 7.6);
  // text("X " + happyJuiceCount[3], width / 1.6, height - height / 7.6);
  // text(happyJuicePrices[4] + "$", width / 1.8, height - height / 16);
  // text("X " + happyJuiceCount[4], width / 1.6, height - height / 16);
  // // Lootbox
  // fill(255, 200, 0);
  // rect(width - width / 4, height - height / 3.3, width / 25, height / 30);
  // rect(width - width / 5.5, height - height / 3.3, width / 25, height / 30);
  // rect(width - width / 4, height - height / 4.2, width / 25, height / 30);
  // rect(width - width / 5.5, height - height / 4.2, width / 25, height / 30);
  // rect(width - width / 4, height - height / 6, width / 25, height / 30);
  // rect(width - width / 5.5, height - height / 6, width / 25, height / 30);
  // rect(width - width / 4, height - height / 10, width / 25, height / 30);
  // rect(width - width / 5.5, height - height / 10, width / 25, height / 30);
  // rect(width - width / 4, height - height / 30, width / 25, height / 30);
  // rect(width - width / 5.5, height - height / 30, width / 25, height / 30);
  // fill(0);
  // text("Buy", width - width / 4, height - height / 3.3);
  // text("Use", width - width / 5.5, height - height / 3.3);
  // text("Buy", width - width / 4, height - height / 4.2);
  // text("Use", width - width / 5.5, height - height / 4.2);
  // text("Buy", width - width / 4, height - height / 6);
  // text("Use", width - width / 5.5, height - height / 6);
  // text("Buy", width - width / 4, height - height / 10);
  // text("Use", width - width / 5.5, height - height / 10);
  // text("Buy", width - width / 4, height - height / 30);
  // text("Use", width - width / 5.5, height - height / 30);
  // text(luckBoostPrices[0] + "$", width - width / 4, height - height / 3);
  // text("X " + luckBoostCount[0], width - width / 5.5, height - height / 3);
  // text(luckBoostPrices[1] + "$", width - width / 4, height - height / 3.7);
  // text("X " + luckBoostCount[1], width - width / 5.5, height - height / 3.7);
  // text(luckBoostPrices[2] + "$", width - width / 4, height - height / 5);
  // text("X " + luckBoostCount[2], width - width / 5.5, height - height / 5);
  // text(luckBoostPrices[3] + "$", width - width / 4, height - height / 7.6);
  // text("X " + luckBoostCount[3], width - width / 5.5, height - height / 7.6);
  // text(luckBoostPrices[4] + "$", width - width / 4, height - height / 16);
  // text("X " + luckBoostCount[4], width - width / 5.5, height - height / 16);
  // // Lottery
  // fill(255, 200, 0);
  // rect(width - width / 10, height - height / 3.3, width / 25, height / 30);
  // rect(width - width / 30, height - height / 3.3, width / 25, height / 30);
  // rect(width - width / 10, height - height / 4.2, width / 25, height / 30);
  // rect(width - width / 30, height - height / 4.2, width / 25, height / 30);
  // rect(width - width / 10, height - height / 6, width / 25, height / 30);
  // rect(width - width / 30, height - height / 6, width / 25, height / 30);
  // rect(width - width / 10, height - height / 10, width / 25, height / 30);
  // rect(width - width / 30, height - height / 10, width / 25, height / 30);
  // rect(width - width / 10, height - height / 30, width / 25, height / 30);
  // rect(width - width / 30, height - height / 30, width / 25, height / 30);
  // fill(0);
  // text("Buy", width - width / 10, height - height / 3.3);
  // text("Use", width - width / 30, height - height / 3.3);
  // text("Buy", width - width / 10, height - height / 4.2);
  // text("Use", width - width / 30, height - height / 4.2);
  // text("Buy", width - width / 10, height - height / 6);
  // text("Use", width - width / 30, height - height / 6);
  // text("Buy", width - width / 10, height - height / 10);
  // text("Use", width - width / 30, height - height / 10);
  // text("Buy", width - width / 10, height - height / 30);
  // text("Use", width - width / 30, height - height / 30);
  // text(lotteryPrices[0] + "$", width - width / 10, height - height / 3);
  // text("X " + lotteryCount[0], width - width / 30, height - height / 3);
  // text(lotteryPrices[1] + "$", width - width / 10, height - height / 3.7);
  // text("X " + lotteryCount[1], width - width / 30, height - height / 3.7);
  // text(lotteryPrices[2] + "$", width - width / 10, height - height / 5);
  // text("X " + lotteryCount[2], width - width / 30, height - height / 5);
  // text(lotteryPrices[3] + "$", width - width / 10, height - height / 7.6);
  // text("X " + lotteryCount[3], width - width / 30, height - height / 7.6);
  // text(lotteryPrices[4] + "$", width - width / 10, height - height / 16);
  // text("X " + lotteryCount[4], width - width / 30, height - height / 16);
  // rect(width / 9, height - height / 3.3, width / 25, height / 30);
  // rect(width / 6, height - height / 3.3, width / 25, height / 30);
  // rect(width / 9, height - height / 4.2, width / 25, height / 30);
  // rect(width / 6, height - height / 4.2, width / 25, height / 30);
  // rect(width / 9, height - height / 6, width / 25, height / 30);
  // rect(width / 6, height - height / 6, width / 25, height / 30);
  // rect(width / 9, height - height / 10, width / 25, height / 30);
  // rect(width / 6, height - height / 10, width / 25, height / 30);
  // rect(width / 9, height - height / 30, width / 25, height / 30);
  // rect(width / 6, height - height / 30, width / 25, height / 30);
  // create the 3 other employees
  // let employeeOne = new Employee("Mr. A");
  // employeesList.push(employeeOne);
  // let employeeTwo = new Employee("Mrs. B");
  // employeesList.push(employeeTwo);
  // let employeeThree = new Employee("Ms. C");
  // employeesList.push(employeeThree);
  // console.log(employeesList);
}
