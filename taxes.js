// Tax rates (%) at each Income bracket
const taxRates = [0.10,0.12,0.22,0.24,0.32,0.35,0.37]
// The maximum incomes at each Income bracket
const maxIncomes = [10275,41775,89075,170050,215950,539900]

let mainElement = document.getElementById("main")
//let userInput = document.getElementById("userInput").value
let button = document.getElementById("submitBtn")

let incomeType = document.getElementById("incomeType")

// Add event listener to select tag
incomeType.addEventListener('change',changeIncomeType)

// Add event listener to button
button.addEventListener('click',getData)

function changeIncomeType(){
    let message = document.getElementById("userMessage")
    if(incomeType.value === "annual"){
        message.innerHTML = "Enter Annual Salary"
    }
    else{
        message.innerHTML = "Enter Hourly Rate"
    }
}

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

// Function to create the div that displays the data
function createDataDiv(){
    // Remove the div if it exists and create a new one
    if(document.getElementById("data")){
        document.getElementById("data").remove()
    }
    let dataDiv = document.createElement("div")
    dataDiv.id = "data"
    mainElement.appendChild(dataDiv)
}

// Function to display the data to the HTML dom
function displayDataToHTML(grossIncome,hourlyRate,taxOwed){
    let displayDiv = document.getElementById("data")

    let pTagGross = document.createElement("p")
    displayDiv.appendChild(pTagGross)
    pTagGross.innerHTML = `Gross Annual Income: $${grossIncome.toFixed(2)}`
    
    let pTagHourly = document.createElement("p")
    displayDiv.appendChild(pTagHourly)
    pTagHourly.innerHTML = `Hourly Rate: $${hourlyRate.toFixed(2)}`
    
    let pTagTax = document.createElement("p")
    displayDiv.appendChild(pTagTax)
    pTagTax.innerHTML = `Taxes owed: $${taxOwed.toFixed(2)}`
    
    let pTagNet = document.createElement("p")
    displayDiv.appendChild(pTagNet)
    pTagNet.innerHTML = `Net Annual Income: $${(grossIncome - taxOwed).toFixed(2)}`
    
    let pTagNetMonthly = document.createElement("p")
    displayDiv.appendChild(pTagNetMonthly)
    pTagNetMonthly.innerHTML = `Net Monthly Income: $${((grossIncome - taxOwed) / 12).toFixed(2)}`
}

// Function to get the data the user entered in the input box
function getData(){
    let userInput = document.getElementById("userInput").value
    // Find out whether the user is entering a annual salary or hourly rate
    let annual = 0
    let hourly = 0
    if(incomeType.value === "hourly"){
        hourly = Number(userInput)
        annual = hourly * 2080
    }
    else{
        annual = Number(userInput)
        hourly = annual / 2080
    }
    //let userIncome = Number(userInput)
    //let hourlyRate = userIncome / 2080 // 2080 hrs = (40hrs/1wk) * (52wk/12mth) * 12mth...52wk = 1yr and 12mth = 1yr -> conversion from wks to mth = 52wk/12mth
    // hourlyRate assumes that the user works 40 hrs work weeks, and worked every week
    let taxesOwed = calculateTaxes(annual,maxIncomes)
    createDataDiv()
    displayDataToHTML(annual,hourly,taxesOwed)
    
}