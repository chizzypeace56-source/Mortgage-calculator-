
// Get the form and buttons
const mortgageForm = document.getElementById("mortgageForm");
const clearBtn = document.getElementById("clearBtn");

// Get the input fields
const mortgageAmount = document.getElementById("mortgageAmount");
const mortgageTerm = document.getElementById("mortgageTerm");
const interestRate = document.getElementById("interestRate");

// Get the result sections
const emptyResults = document.getElementById("emptyResults");
const completedResults = document.getElementById("completedResults");

// Get the result elements
const monthlyPayment = document.getElementById("monthlyPayment");
const totalPayment = document.getElementById("totalPayment");

// Get error messages
const amountError = document.getElementById("amountError");
const termError = document.getElementById("termError");
const rateError = document.getElementById("rateError");
const typeError = document.getElementById("typeError");


// =========================
// CALCULATE REPAYMENTS
// =========================

mortgageForm.addEventListener("submit", function (event) {

    event.preventDefault();

    // Clear previous errors
    amountError.textContent = "";
    termError.textContent = "";
    rateError.textContent = "";
    typeError.textContent = "";

    // Get input values
    const amount = Number(mortgageAmount.value);
    const term = Number(mortgageTerm.value);
    const rate = Number(interestRate.value);

    // Get selected mortgage type
    const mortgageType = document.querySelector(
        'input[name="mortgageType"]:checked'
    );

    // =========================
    // VALIDATION
    // =========================

    let hasError = false;

    if (mortgageAmount.value.trim() === "" ||
        !Number.isFinite(amount) || amount <= 0) {
        amountError.textContent = "Enter a valid mortgage amount";
        hasError = true;
    }

    if (mortgageTerm.value.trim() === "" ||
        !Number.isFinite(term) || term <= 0) {
        termError.textContent = "Enter a valid mortgage term";
        hasError = true;
    }

    if (interestRate.value.trim() === "" ||
        !Number.isFinite(rate) || rate < 0) {
        rateError.textContent = "Enter a valid interest rate";
        hasError = true;
    }

    if (!mortgageType) {
        typeError.textContent = "Please select a mortgage type";
        hasError = true;
    }

    if (hasError) {
        return;
    }

    // =========================
    // CALCULATION
    // =========================

    const numberOfPayments = term * 12;
    const monthlyInterestRate = rate / 100 / 12;

    let monthlyRepayment;
    let totalRepayment;

    // REPAYMENT MORTGAGE
    if (mortgageType.value === "repayment") {

        if (monthlyInterestRate === 0) {
            monthlyRepayment = amount / numberOfPayments;
        } else {
            monthlyRepayment =
                amount *
                (
                    monthlyInterestRate *
                    Math.pow(1 + monthlyInterestRate, numberOfPayments)
                ) /
                (
                    Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1
                );
        }

        totalRepayment = monthlyRepayment * numberOfPayments;
    }

    // INTEREST ONLY
    else {

        monthlyRepayment = amount * monthlyInterestRate;

        totalRepayment =
            amount + (monthlyRepayment * numberOfPayments);
    }

    // Calculate total interest
    const totalInterest = totalRepayment - amount;

    // =========================
    // DISPLAY RESULTS
    // =========================

    monthlyPayment.textContent =
        "£" + monthlyRepayment.toFixed(2);

    totalPayment.textContent =
        "£" + totalRepayment.toFixed(2);

    // Display total interest if the HTML element exists
    const interestResult = document.getElementById("totalInterest");

    if (interestResult) {
        interestResult.textContent =
            "£" + totalInterest.toFixed(2);
    }

    emptyResults.classList.add("hidden");
    completedResults.classList.remove("hidden");

});


// =========================
// CLEAR ALL
// =========================

clearBtn.addEventListener("click", function () {

    mortgageForm.reset();

    amountError.textContent = "";
    termError.textContent = "";
    rateError.textContent = "";
    typeError.textContent = "";

    completedResults.classList.add("hidden");
    emptyResults.classList.remove("hidden");

    const interestResult = document.getElementById("totalInterest");

    if (interestResult) {
        interestResult.textContent = "";
    }

});
