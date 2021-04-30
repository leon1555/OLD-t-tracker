// Activates the deactivated text field for the "custom" option for the injection cycle. Allows user to enter a custom number of days.
// let customRadioButton = document.getElementById('custom');
// customRadioButton.addEventListener('change', custom_input);
document.getElementById('custom').addEventListener('click', custom_input);
function custom_input(){
    document.getElementById("custom_field").disabled = false;
}

// Stores medication info to local storage
document.getElementById("savebutton").addEventListener('click', save_med);

function save_med(){
    // Labels user's inputs for medication details
    let brand = document.querySelector("#brand").value;
    let volume = document.querySelector("#volume").value;
    let concentration_mg = document.querySelector("#concentration_mg").value;
    let concentration_ml = document.querySelector("#concentration_ml").value;
    let dosage = document.querySelector("#dosage").value;

    // Calculates the concentration of testosterone in the serum
    let concentration = (concentration_mg / concentration_ml).toFixed(2);

    // Calculates the amount of testosterone per dose
    let tPerDose = (concentration * dosage).toFixed(2);
    
    // Calculates the amount of shots per vial
    let qty_shots = (volume / dosage).toFixed(2);

    // Logs user's projected date for their first injection
    let startdate_local = new Date(document.getElementById("startdate").value);
    console.log(startdate_local);
    let startdate_utc = startdate_local.toISOString();
    console.log(startdate_utc);

    
    // Determines the injection cycle length
    let cycle_length_string = document.querySelector('input[name="period"]:checked').value;
    if(cycle_length_string == "weekly"){
        cycle_length = 7;
    }
    if(cycle_length_string == "fortnight"){
        cycle_length = 14;
    }
    if(cycle_length_string == "monthly"){
        cycle_length = 28;
    }
    if(cycle_length_string == "custom"){
        cycle_length = parseInt(document.getElementById("custom_field").value);
    }
  
    // Sets up a new array for medication details, if no medications have previously been entered. Otherwise, appends a new object for the new medication details at the end of an array of medications.
    let medications;
    if(localStorage.getItem('medications') === null) {
        medications = [];
      } else {
        medications = JSON.parse(localStorage.getItem('medications'));
      }

    let new_med = {
            'brand': brand,
            'volume': `${volume}mL`,
            'concentration': `${concentration}mg/mL`,
            't_per_dose': `${tPerDose}mg`,
            'dose': `${dosage}cc`,
            'doses_per_vial': qty_shots,
            'start_date': startdate_utc,
            'doses_remaining': (qty_shots - 1),
            'cycle_length': cycle_length
        };

    medications.push(new_med);
    
    // Enters medication details in local storage
    localStorage.setItem('medications', JSON.stringify(medications));
}

// Get today's date and display it in the graphical header
let today = new Date();
let today_day_num = today.getDay();
let today_date = today.getDate();
let today_month_num = today.getMonth();
let today_year = today.getFullYear();
function dayName(dayNum){
    let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return weekdays[dayNum];
}
let today_day = dayName(today_day_num);

function monthName(monthNum){
    let months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    return months[monthNum];
}

let today_month = monthName(today_month_num);

document.querySelector("#date_day").innerHTML = today_day;
document.querySelector("#date_num").innerHTML = today_date;
document.querySelector("#date_month").innerHTML = today_month;
document.querySelector("#date_year").innerHTML = today_year;