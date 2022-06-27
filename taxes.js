// Tax rates (%) at each Income bracket
const taxRates = [0.10,0.12,0.22,0.24,0.32,0.35,0.37]
// The maximum incomes at each Income bracket
const singleFiler = [10275,41775,89075,170050,215950,539900]
const marriedSeparate = [10275,41775,89075,170050,215950,323925]
const marriedJointly = [20550,83550,178150,340100,431900,647850]
const headOfHousehold = [14650,55900,89050,170050,215950,539900]

let mainElement = document.getElementById("main")
//let userInput = document.getElementById("userInput").value
let button = document.getElementById("submitBtn")

let incomeType = document.getElementById("incomeType")

let inputVal = document.getElementById("userInput")

// Add event listener to input tag to prevent negative inputs
inputVal.onkeydown = function(e){
    // Following code only allows the user to input the numbers on the number line, the numbers on the number pad and backspace keys
    // Prevents the user from entering negative and alphabetical inputs. But input type="number" already prevents alphabetic characters
    // code provided by:
    // https://qawithexperts.com/questions/373/prevent-negative-value-from-being-entered-in-html-input-type#:~:text=Prevent%20negative%20value%20from%20being%20entered%20in%20HTML%20input%20type%20number%20field%3F,-While%20creating%20HTML5&text=Here%20is%20the%20full%20fiddle%20example.&text=You%20can%20also%20use%20onKeyup,convert%20negative%20number%20into%20positive.
    if(!((e.keyCode > 95 && e.keyCode < 106)
      || (e.keyCode > 47 && e.keyCode < 58) 
      || e.keyCode == 8
      || e.keyCode == 190
      || e.keyCode == 110)) {
        return false;
    }
    // I added the last two statements to allow for decimal numbers (floats)
    // 190 = period on regular keyboard
    // 110 = period on num pad
}

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

// Function to display error message
function printErrorMessageToHTML(){
    let displayDiv = document.getElementById("data")
    let pTagErr = document.createElement("p")
    displayDiv.appendChild(pTagErr)
    pTagErr.innerHTML = `Please enter a valid positive number`
}

// checks whether the user entered a positive number, if they didn't it displays an error message
function inputError(uInput){
    let num = Number(uInput)
    if(num === NaN || num <= 0){
        return true
    }
    return false
}
// Function to get the data the user entered in the input box
function getData(){
    let userInput = document.getElementById("userInput").value
    if(inputError(userInput)){
        // print error message
        createDataDiv()
        printErrorMessageToHTML()
    }
    else{
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
        // 2080 hrs = (40hrs/1wk) * (52wk/12mth) * 12mth...52wk = 1yr and 12mth = 1yr -> conversion from wks to mth = 52wk/12mth
        // hourlyRate assumes that the user works 40 hrs work weeks, and worked every week
        // Send the correct income bracket to the calculate taxes function
        let taxesOwed = 0
        let filingStatus = document.getElementById("filerStatus").value
        if(filingStatus === "marriedJointly"){
            taxesOwed = calculateTaxes(annual,marriedJointly)
        }
        else if(filingStatus === "marriedSeparate"){
            taxesOwed = calculateTaxes(annual,marriedSeparate)
        }
        else if(filingStatus === "headOfHousehold"){
            taxesOwed = calculateTaxes(annual,headOfHousehold)
        }
        else{
            taxesOwed = calculateTaxes(annual,singleFiler)
        }
        createDataDiv()
        displayDataToHTML(annual,hourly,taxesOwed)
    }
}