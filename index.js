function checkCashRegister(price, cash, cid) {
  let register = buildRegisterObject(cid);
  let change = (cash - price).toFixed(2);
  let { cents, dollars } = breakUp(change);
  console.log(dollars);
  dollars = breakUpDollars(dollars);
  return dollars;
}

function buildRegisterObject(arr) {
  let register = {};
  let temp = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
  arr.forEach((a, i) => {
    register[temp[i]] = a;
  });
  return register;
}

function breakUp(num) {
  num = num.toString();
  let dollars = (num.includes(".")
    ? num.split("").slice(0, num.indexOf("."))
    : num.split("")
  )
    .reverse()
    .map((dollar, i) => parseInt(`${dollar}${"0".repeat(i)}`))
    .reverse();
  let cents = (num.includes(".")
    ? num.split("").slice(num.indexOf(".") + 1)
    : 0
  ).map((cent, i) => parseFloat(`.${"0".repeat(i)}${cent}`));
  return { dollars, cents };
}

function breakUpDollars(dollars) {
  let temp = {
    100: 0,
    20: 0,
    10: 0,
    5: 0,
    1: 0
  };
  function getTempTotal() {
    return (
      temp["100"] * 100 +
      temp["20"] * 20 +
      temp["10"] * 10 +
      temp["5"] * 5 +
      temp["1"] * 1
    );
  }
  dollars.forEach(dollar => {
    if (dollar >= 100) {
      // Do something
      temp["100"] = dollar / 100;
      dollar -= getTempTotal();
    }
    if (dollar >= 20) {
      temp["20"] = dollar / 20;
      dollar -= getTempTotal();
    }
    if (dollar >= 10) {
      // Do something
      temp["10"] = dollar / 10;
      dollar -= getTempTotal();
    }
    if (dollar >= 5) {
      temp["5"] = dollar / 5;
      dollar -= getTempTotal();
    }
    if (dollar >= 1) {
      // Do something
      temp["1"] = dollar / 1;
      dollar -= getTempTotal();
    }
  });
  return temp;
}

console.log(breakUpDollars([0, 40, 7]));

// console.log(
//   checkCashRegister(19.55, 170, [
//     ["PENNY", 1.01],
//     ["NICKEL", 2.05],
//     ["DIME", 3.1],
//     ["QUARTER", 4.25],
//     ["ONE", 90],
//     ["FIVE", 55],
//     ["TEN", 20],
//     ["TWENTY", 60],
//     ["ONE HUNDRED", 100]
//   ])
// );

// console.clear();
