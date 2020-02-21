function checkCashRegister(price, cash, cid) {
  let register = buildRegisterObject(cid);
  let change = (cash - price).toFixed(2);
  let { cents, dollars } = breakUp(change);
  dollars = breakUpDollars(dollars);
  return cents;
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
      temp["100"] = dollar / 100;
      dollar -= getTempTotal();
    }
    if (dollar >= 20) {
      temp["20"] = dollar / 20;
      dollar -= getTempTotal();
    }
    if (dollar >= 10) {
      temp["10"] = dollar / 10;
      dollar -= getTempTotal();
    }
    if (dollar >= 5) {
      temp["5"] = dollar / 5;
      dollar -= getTempTotal();
    }
    if (dollar >= 1) {
      temp["1"] = dollar / 1;
      dollar -= getTempTotal();
    }
  });
  return temp;
}

function breakUpCents(cents) {
  let temp = {
    0.25: 0,
    0.10: 0,
    0.05: 0,
    0.01: 0
  };
  function getTempTotal() {
    return (
      temp[".25"] * .25 +
      temp[".10"] * .10 +
      temp[".05"] * .05 +
      temp[".01"] * .01
    );
  }
  cents.forEach(cent => {
    if (cent >= .25) {
      temp["0.25"] = cent / .25;
      cent -= getTempTotal();
    }
    if (cent >= .1) {
      temp["0.10"] = cent / .1;
      cent -= getTempTotal();
    }
    if (cent >= .05) {
      temp["0.05"] = cent / .05;
      cent -= getTempTotal();
    }
    if (cent >= .01) {
      temp["0.01"] = cent / .01;
      cent -= getTempTotal();
    }
  });
  return cleanUpCents(temp);
}

function cleanUp(obj) {
  let keys = Object.keys(obj);
  console.log(keys)
  keys.forEach((key, i) => {
    if (obj[key] % 1 !== 0) {
      let extra = (obj[key] - Math.floor(obj[key])).toFixed(2) * parseInt(key);
      obj[key] = Math.floor(obj[key]) ;
      obj[keys[i - 1]] += extra;
    }
  });
  return obj;
}

function cleanUpCents(obj) {
  let keys = Object.keys(obj);
  console.log(keys)
  keys.forEach((key, i) => {
    if (obj[key] % 1 !== 0) {
      let extra = (obj[key] - Math.floor(obj[key])).toFixed(2) * parseFloat(key);
      obj[key] = Math.floor(obj[key]);
      if (extra > .1) {
        extra -= .10;

      }
    }
  });
  
}


// console.log(
//   checkCashRegister(14.50, 90, [
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
