﻿
function homeLoan(){

    var amount = document.getElementById("amount");
    var rate = document.getElementById("rate");
    var months = document.getElementById("months");

    var principal = parseFloat(amount.value);
    var interest = parseFloat(rate.value) / 100 / 12;
    var payments = parseFloat(months.value);

    // compute the monthly payment figure
    var x = Math.pow(1 + interest, payments); //Math.pow computes powers
    var monthly = (principal * x * interest) / (x - 1);

    var monthlyInterest = (monthly * payments);
    var totalInterest = ((monthly * payments) - principal);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })

    let amountRound = formatter.format(principal);
    let monthRound = formatter.format(monthly);
    let interestRound = formatter.format(monthlyInterest);
    let totalRound = formatter.format(totalInterest);

    document.getElementById("principalOut").innerHTML = `${amountRound}`;
    document.getElementById("monthlyOut").innerHTML = `${monthRound}`;
    document.getElementById("interestOut").innerHTML = `${interestRound}`;
    document.getElementById("costOut").innerHTML = `${totalRound}`;
}

document.getElementById("homeLoanButton").addEventListener("click", table)


function table() {
    var amount = document.getElementById("amount").value;
    var rate = document.getElementById("rate").value;
    var months = document.getElementById("months").value;

    var monthsCollected = [];
    monthsCollected[months] = "";
    currentMonth = 0;

    for (i = 0; i <= months; i++) {
        currentMonth++;

        if (monthsCollected[i] == undefined) {
            monthsCollected[i] = currentMonth;
        }

    }
    monthsCollected.pop();

    //table arrays
    var acountBalance = [amount];
    var monthlyPaymentsCollected = [monthly];
    var InterestBalance = [];
    var totalPayments = [];
    var principalBalance = [];

    let tableBody = document.getElementById("tabledata");
    var monthsTableOutput = "";

    for (i = 0; i < months; i++) {
        


        //interest Payment  
        var iBalance = acountBalance[i] * (rate / 1200);
        InterestBalance.push(iBalance);

        //sum interest
        var sum = InterestBalance.reduce(function (a, b) {
            return a + b;
        }, 0);

        //Total Payment

        var a = rate / 1200;
        var b = (1 + a) ** -months;
        var monthly = amount * a / (1 - b);

        totalPayments.push(monthly);

        //Principle
        var pBalance = monthly - InterestBalance[InterestBalance.length - 1];
        principalBalance.push(pBalance);

        //balance
        var balance = acountBalance[i] - principalBalance[i];
        acountBalance.push(balance);

        monthsTableOutput += "<tr>" + "<td>" + monthsCollected[i] + "</td>" + "<td>" + monthly.toFixed(2) + "<td>" + principalBalance[principalBalance.length - 1].toFixed(2) + "</td>" + "</td>" + "<td>" + InterestBalance[InterestBalance.length - 1].toFixed(2) + "</td>" + "<td>" + sum.toFixed(2) + "</td>" + "<td>" + acountBalance[acountBalance.length - 1].toFixed(2) + "</td>" + "</tr>";

        
    }
        tableBody.innerHTML = monthsTableOutput;
}

//monthsTableOutput += "<tr>" + "<td>" + monthsCollected[i] + "</td>" + "<td>" + monthly.toFixed(2) + "<td>" + principalBalance[principalBalance.length - 1].toFixed(2) + "</td>" + "</td>" + "<td>" + InterestBalance[InterestBalance.length - 1].toFixed(2) + "</td>" + "<td>" + sum.toFixed(2) + "</td>" + "<td>" + acountBalance[acountBalance.length - 1].toFixed(2) + "</td>" + "</tr>";

//`<tr><td>${monthsCollected[i]}</td><td>${monthly.toFixed(2)}</td><td>${principalBalance[principalBalance.length - 1].toFixed(2)}</td><td>${InterestBalance[InterestBalance.length - 1].toFixed(2)}</td><td>${sum.toFixed(2)}</td><td>${acountBalance[acountBalance.length - 1].toFixed(2)}</td></tr >`;