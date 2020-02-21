class Register {
    constructor(PENNY, NICKEL, DIME, QUARTER, ONE, FIVE, TEN, TWENTY, ONEHUNDRED) {
        this[0.01] = {PENNY};
        this[0.05] = {NICKEL};
        this[0.1] = {DIME};
        this[0.25] = {QUARTER};
        this[1] = {ONE};
        this[5] = {FIVE};
        this[10] = {TEN};
        this[20] = {TWENTY};
        this[100] = {"ONE HUNDRED": ONEHUNDRED};
    }
    get total() {
        return Object.values(this).map(obj => Object.values(obj)).flat().reduce((t, c) => t + c);
    }

    getChange(t) {
        let v = t === 100 ? "ONE HUNDRED": t === 20 ?  "TWENTY": t === 10 ? "TEN" : t === 5 ? "FIVE":
        t === 1 ? "ONE": t === .25 ? "QUARTER": t === .1 ? "DIME": t === .05 ? "NICKEL": t === .01 ? "PENNY": null;
        return this[t][v];
    }

    setChange(t, a) {
        let v = t === 100 ? "ONE HUNDRED": t === 20 ?  "TWENTY": t === 10 ? "TEN" : t === 5 ? "FIVE":
        t === 1 ? "ONE": t === .25 ? "QUARTER": t === .1 ? "DIME": t === .05 ? "NICKEL": t === .01 ? "PENNY": null;
        if (this[t][v] - a >= 0) {
           this[t][v] =  this[t][v] - a;
        } else {
            throw "Not enough change";
        }
    }  
}



function checkCashRegister(price, cash, cid) {
    let changeDue = cash - price;
    let register = new Register(...[...cid.map(arr => arr[1])])    
    if (changeDue > register.total) {
        return {status: "INSUFFICIENT_FUNDS", change: []};
    }
    let change = breakUp(changeDue);
    

    return getChange(register, change);
}

function breakUp(change) {
    change = change.toString();
    let dollars = change.slice(0,change.indexOf("."));
    let cents = change.slice(change.indexOf("."));
    
    return {dollars: breakDownDollars(dollars), cents: breakDownCents(cents)};
}

function breakDownDollars(value) {
    let arr = value.split("").reverse();
    arr = arr.map((n, i) => parseInt(`${n}${"0".repeat(i)}`)).reverse();
    let hundreds = makePlaces(arr[0], 100);
    let tens = makePlaces(arr[1], 10);
    let ones = makePlaces(arr[2], 1);
    let temp = {};
    temp.total = value;
    if (hundreds.length >= 1) {
        temp.hundreds = hundreds;
    } if (tens.length >= 1) {
        temp.tens = tens;
    } if (ones.length >= 1) {
        temp.ones = ones;
    }
    return temp;
}

function breakDownCents(value) {
    let arr = value.split("").slice(1).map((n, i) => parseFloat(`.${"0".repeat(i)}${n}`));
    let tenths = makePlaces(arr[0], .10);
    let hundreths = makePlaces(arr[1], .01);
    let temp = {};
    temp.total = value;
    if (tenths.length >= 1) {
        temp.tenths = tenths;
    } if (hundreths.lenth >= 1) {
        temp.hundreths = hundreths;
    }
    return temp;
}

function makePlaces(num, type) {
    let temp = [];
    for (let i = 0; i < num; i += type) {
        temp.push(type);
    }
    return temp;
}

function getChange(register, change) {
    let changeDue = {};
    let {dollars, cents} = change;
    if (dollars.total > 0) {
        let total = dollars.total;
        delete dollars.total;
        let keys = Object.keys(dollars);
        keys.forEach(key => {
            // Do something
        });
    } if (cents.total > 0) {
        let total = cents.total;
        let quarters = register.getChange(0.25);
        let dimes = register.getChange(.10);
        let nickles = register.getChange(.05);
        let pennies = register.getChange(.01)
        delete cents.total;
        let keys = Object.keys(cents);
        keys.forEach(key => {
            let arr = cents[key];
            [...arr].forEach(num => {
                let temp = arr.pop();
                if (total >= 50 && quarters >= total) {
                    
                }
            });
        })
    }
}


// console.log(breakDownCents(".49"));

console.log(checkCashRegister(19.50, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));

//   console.clear();
