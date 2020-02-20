function checkCashRegister(price, cash, cid) {
  let register = buildRegisterObject(cid);
  let change = (cash - price).toFixed(2);
  let { cents, dollars } = breakUp(change);
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
  dollars.forEach(dollar => {
    if (dollar % 100 === 0) {
      // Do something
      console.log(dollar / 100, dollar);
    } else if (dollar % 20 === 0) {
      // Do something
      console.log(dollar / 20, dollar);
    } else if (dollar % 10 === 0) {
      // Do something
      console.log(dollar / 10, dollar);
    } else {
      // Do something
      console.log(dollar / 1, dollar);
    }
  });
}

breakUpDollars([100, 80, 4]);

// console.log(
//   checkCashRegister(19.55, 200, [
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
