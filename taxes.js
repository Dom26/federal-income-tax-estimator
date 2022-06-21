// Tax rates (%) at each Income bracket
const taxRates = [0.10,0.12,0.22,0.24,0.32,0.35,0.37]
// The maximum incomes at each Income bracket
const maxIncomes = [10275,41775,89075,170050,215950,539900]

//let userInput = document.getElementById("userInput").value
let button = document.getElementById("submitBtn")

// Add event listener to button
button.addEventListener('click',getData)

// Function to get the data the user entered in the input box
function getData(){
    let userInput = document.getElementById("userInput").value
    //alert(userInput)
    // create a while loop that stops whenever the current maxIncome[i] > userInput income
    // for every loop iteration add the total amount of taxes to be paid
    // At the end add the final amount of taxes to added
    let i = 0
    let totalTaxes = 0
    let userIncome = Number(userInput)
    while((userIncome > maxIncomes[i]) && i < maxIncomes.length){
        if(i == 0){
            totalTaxes += maxIncomes[i] * taxRates[i]
        }
        else{
            totalTaxes += (maxIncomes[i] - maxIncomes[i-1]) * taxRates[i]
        }
        i++
    }
    if(i == 0){
        totalTaxes += userIncome * taxRates[i]
    }
    else{
        totalTaxes += (userIncome - maxIncomes[i-1]) * taxRates[i]
    }
    alert(`Gross Income: ${userIncome}\nTaxes owed: ${totalTaxes}\nNet Income: ${userIncome-totalTaxes}`)
}