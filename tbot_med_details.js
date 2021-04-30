// Outputs medication details from Local Storage

let regime = JSON.parse(localStorage.getItem("medications"));
if(regime != null){
    let current_regime = regime[regime.length - 1];
    let current_brand = current_regime.brand;
    let current_dosage = current_regime.dose;
    let current_concentration = current_regime.concentration;
    let current_tPerDose = current_regime.t_per_dose;
    let current_qty_shots = current_regime.doses_per_vial;
  
    document.getElementById("medication_output").innerHTML = `<span class="purple">${current_brand}</span>`;
    document.getElementById("dosage_output").innerHTML = `<span class="purple">${current_dosage}</span>`;
    document.getElementById("concentration_output").innerHTML = `<span class="purple">${current_concentration}</span>`;
    document.getElementById("tPerDose_output").innerHTML = `<span class="purple">${current_tPerDose}</span>`;
    document.getElementById("shots_vial_output").innerHTML = `<span class="purple">${current_qty_shots}</span>`;
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