function checkCashRegister(price, cash, cid) {
  let { dollars, cents } = breakUp((cash - price).toString().split(""));
  cid = createRegister(cid);

  return cid;
}

function breakUp(change) {
  let dollars = change
    .splice(0, change.indexOf("."))
    .reverse()
    .map((dollar, i) => parseInt(`${dollar}${"0".repeat(i)}`))
    .filter(num => num > 0);
  let cents = change
    .slice(1)
    .map((cent, i) => parseFloat(`.${"0".repeat(i)}${cent}`))
    .filter(num => num > 0);
  return { dollars, cents };
}

function createRegister(arr) {
  let temp = {};
  arr.forEach(a => {
    temp[a[0]] = a[1];
  });
  return temp;
}

console.log(
  checkCashRegister(19.5, 200, [
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
