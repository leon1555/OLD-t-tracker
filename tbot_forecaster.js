// This page generates a list of future injection dates and sites based on regime data entered by the user.

// Retrieves data from Local Storage
function main(){
    let regime = JSON.parse(localStorage.getItem("medications"));
    let current_regime = regime[regime.length - 1];
    let current_brand = current_regime.brand;
    let current_dosage = current_regime.dose;
    let startdate_string = current_regime.start_date;
    let doses_per_vial = current_regime.doses_per_vial -1;
    let cycle_length = current_regime.cycle_length;

    let injection_sites = JSON.parse(localStorage.getItem("injection_sites"));
    
    const startdate = new Date(startdate_string);
    startdate.setDate(startdate.getDate() + 1);

    // Outputs the medication brand and dose
    document.querySelector("#medication_forecast").innerHTML = `<span class="label">medication</span>: <span class="purple">${current_brand}</span>`;
    document.querySelector("#dose_forecast").innerHTML = `<span class="label">dose</span>: <span class="purple">${current_dosage}</span>`;


    let injection_index = 1; // to cycle through the array of injection sites
    let cycle_multiplier = 0; // multiplies the number of days in the injection cycle by an increasing integer, until that integer exceeds the number of doses in the vial.
    // let startdate_adjusted = new Date(startdate_string);
    // startdate_adjusted.setDate(startdate.getDate() - 7); // moves the start date back a week so that the math will work

    let lastdate = new Date(startdate_string);
    lastdate.setDate((lastdate.getDate() + 1) + (doses_per_vial * cycle_length)); // determines the date on which the last dose in the vial will be administered.
    document.querySelector("#empty").innerHTML = `Your vial will be empty on <span class="purple">${lastdate.toDateString()}</span>!`;
    document.querySelector("#future_injections").innerHTML = `${startdate.toDateString()}: <span class="purple">${injection_sites[0]}</span><br>`
    // Main loop for calculating and outputting future injection dates and sites. Right now, this only works if the user has already set up an injection regime AND preferred injection sites.
    while(doses_per_vial > 0){
        if(injection_index > (injection_sites.length - 1)){ // re-starts at the beginning of the array of injection sites when needed.
            injection_index = 0;
        }
        let injection_site = injection_sites[injection_index];
        let injection_date = startdate;
        injection_date.setDate(injection_date.getDate() + (cycle_length))
        injection_output = `${injection_date.toDateString()}: <span class="purple">${injection_site}</span><br>`;
        document.querySelector("#future_injections").innerHTML += injection_output;
        injection_index += 1;
        doses_per_vial -= 1;
        cycle_multiplier += 1;
    }
}
window.addEventListener('load', main);

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
