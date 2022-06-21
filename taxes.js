// Tax rates (%) at each Income bracket
const taxRates = [0.10,0.12,0.22,0.24,0.32,0.35,0.37]
// The maximum incomes at each Income bracket
const maxIncomes = [10275,41775,89075,170050,215950,539900]

//let userInput = document.getElementById("userInput").value
let button = document.getElementById("submitBtn")

// Add event listener to button
button.addEventListener('click',getData)

// Function to  calculate the total Taxes owed
function calculateTaxes(annualIncome,maxIncomeArr){
    // create a while loop that stops whenever the current maxIncome[i] > userInput income
    // for every loop iteration add the total amount of taxes to be paid
    // At the end add the final amount of taxes to added
    if(annualIncome < maxIncomeArr[0]){
        return annualIncome * taxRates[0]
    }
    let i = 0
    let totalTaxes = 0
    while((annualIncome > maxIncomeArr[i]) && i < maxIncomeArr.length){
        if(i == 0){
            totalTaxes += maxIncomeArr[i] * taxRates[i]
        }
        else{
            totalTaxes += (maxIncomeArr[i] - maxIncomeArr[i-1]) * taxRates[i]
        }
        i++
    }
    if(i == 0){
        totalTaxes += annualIncome * taxRates[i]
    }
    else{
        totalTaxes += (annualIncome - maxIncomeArr[i-1]) * taxRates[i]
    }
    return totalTaxes
}
// Function to get the data the user entered in the input box
function getData(){
    let userInput = document.getElementById("userInput").value
    
    let userIncome = Number(userInput)
    let taxesOwed = calculateTaxes(userIncome,maxIncomes)
    
    alert(`Gross Income: ${userIncome}\nTaxes owed: ${taxesOwed}\nNet Income: ${userIncome-taxesOwed}`)
}