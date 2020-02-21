function checkCashRegister(price, cash, cid) {
  cid = createRegister(cid);
  let change = cash - price;

  return getChange(change, cid);
}

function createRegister(arr) {
  let temp = {};
  arr.forEach(a => {
    temp[a[0]] = a[1];
  });
  return temp;
}


function getChange(change, cid) {
  let temp = {};
  if (change >= 100) {
    temp["ONE HUNDRED"] = 0;
    while (change >= 100 && cid["ONE HUNDRED"] >= 100) {
      temp["ONE HUNDRED"] += 100;
      change -= 100;
      cid["ONE HUNDRED"] -= 100;
    }
  }
  if (change >= 20) {
    temp["TWENTY"] = 0;
    while (change >= 20 && cid["TWENTY"] >= 20) {
      temp["TWENTY"] += 20;
      change -= 20;
      cid["TWENTY"] -= 20;
    }
  }
  if (change >= 10) {
    temp["TEN"] = 0;
    while (change >= 10 && cid["TEN"] >= 10) {
      temp["TEN"] += 10;
      change -= 10;
      cid["TEN"] -= 10;
    }
  }
  if (change >= 5) {
    temp["FIVE"] = 0;
    while (change >= 5 && cid["FIVE"] >= 5) {
      temp["FIVE"] += 5;
      change -= 5;
      cid["FIVE"] -= 5;
    }
  }
  if (change >= 1) {
    temp["ONE"] = 0;
    while (change >= 1 && cid["ONE"] >= 1) {
      temp["ONE"] += 1;
      change -= 1;
      cid["ONE"] -= 1;
    }
  }
  if (change >= .25) {
    temp["QUARTER"] = 0;
    while (change >= .25 && cid["QUARTER"] >= .25) {
      temp["QUARTER"] += .25;
      change -= .25;
      cid["QUARTER"] -= .25;
    }
  }
  if (change >= .10) {
    temp["DIME"] = 0;
    while (change >= .10 && cid["DIME"] >= .10) {
      temp["DIME"] += .10;
      change -= .10;
      cid["DIME"] -= .10;
    }
  }
  if (change >= .05) {
    temp["NICKEL"] = 0;
    while (change >= .05 && cid["NICKEL"] >= .05) {
      temp["NICKEL"] += .05;
      change -= .05;
      cid["NICKEL"] -= .05;
    }
  }
  if (change >= .01) {
    temp["PENNY"] = 0;
    while (change >= .01 && cid["PENNY"] >= .01) {
      temp["PENNY"] += .01;
      change -= .01;
      cid["PENNY"] -= .01;
    }
  }
  return {temp, cid};
}

console.log(
  checkCashRegister(10.33, 199, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
  ])
);
