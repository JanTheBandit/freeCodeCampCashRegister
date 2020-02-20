// function checkCashRegister(price, cash, cid) {
//   let change = cash - price;
//   let totalInDrawer = cid
//     .map(arr => arr[1])
//     .reduce((t, c) => t + c)
//     .toFixed(2);
//   if (totalInDrawer < change) {
//     return { status: "INSUFFICIENT_FUNDS", change: [] };
//   }
//   let register = {};
//   cid.forEach(arr => {
//     register[arr[0]] = arr[1];
//   });
//   let keys = Object.keys(register);
//   let { coins, dollars } = breakUp(change);
//   console.log(coins, dollars);
// }

// function getChange(coins, dollars) {
//   if (dollars >= 100) {

//   }
// }

// function checkCashRegister(price, cash, cid) {
//   let change = cash - price;
//   let register = {
//     0.01: {},
//     0.05: {},
//     0.1: {},
//     0.25: {},
//     1: {},
//     5: {},
//     10: {},
//     20: {},
//     100: {}
//   };
//   let keys = Object.keys(register);
//   keys.forEach((key, i) => {
//     let v = cid[i][1];

//     register[key] = v;
//   });
//   return register;
// }

function checkCashRegister(price, cash, cid) {
  let register = buildRegisterObject(cid);
  let change = (cash - price).toFixed(2);
  let { cents, dollars } = breakUp(change);
  return [change, dollars, cents];
}

function buildRegisterObject(arr) {
  let register = {};
  let temp = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
  arr.forEach((a, i) => {
    register[temp[i]] = a[1];
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
  ).map((cent, i) => `.${"0".repeat(i)}${cent}`);
  return { dollars, cents };
}

console.log(
  checkCashRegister(19.55, 200, [
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
