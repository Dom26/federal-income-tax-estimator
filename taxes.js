const taxRates = [10,12,22,24,32,35,37]
const maxIncomes = [10275,41775,89075,170050,215950,539900]

let userInput = document.getElementById("userInput").value
let button = document.getElementById("submitBtn")

// Add event listener to button
button.addEventListener('click',getData)

// Function to get the data the user entered in the input box
function getData(){
    userInput = document.getElementById("userInput").value
    alert(userInput)
}