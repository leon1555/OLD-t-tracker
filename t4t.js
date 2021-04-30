document.getElementById('button').addEventListener('click', calculate);
document.getElementById('custom').addEventListener('click', custom_input);
function custom_input(){
    document.getElementById("custom_field").disabled = false;
}

function calculate(){
    // Label user's inputs for medication details
    let brand = document.querySelector("#brand").value;
    let volume = document.querySelector("#volume").value;
    let concentration_mg = document.querySelector("#concentration_mg").value;
    let concentration_ml = document.querySelector("#concentration_ml").value;
    let dosage = document.querySelector("#dosage").value;
    let concentration = concentration_mg / concentration_ml;
    let tPerDose = concentration * dosage;
    let qty_shots = volume / dosage;

    // User inputs for start date. Convert to manipulable date format.
    let start_year = document.querySelector("#startdateYear").value;
    let start_month = document.querySelector("#startdateMonth").value;
    let start_day = document.querySelector("#startdateDay").value;
    let startdate = new Date(start_year, (start_month - 1), start_day);
    console.log(startdate);

    // Determine injection cycle length
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
        cycle_length = document.getElementById("custom_field").value;
    }

    // Make an array from the user's selection of injection sites
    let injection_sites = [];
    let leftbutt = document.getElementById("leftbutt").value;
    console.log(leftbutt);


    output = `The concentration is: ${concentration}mg/mL. The amount of T per dose is: ${tPerDose}mg. The number of shots per in the vial is: ${qty_shots}`;
    document.querySelector("#output").innerHTML = output;

    function shotIntervals(date, days, iterations) {
        let result_array = [];
        let result = new Date(date);
        let result_unit = result.getDate() + days;
        // while(iterations > 0){
        //     result = new Date(date);
        //     result_unit = result.setDate(result.getDate() + days);
        //     result_array.push(result_unit);
        //     iterations = iterations - 1;
        // }
        console.log(result);
        console.log(result_unit);
        console.log(cycle_length);
        return result_array;

    }
shotIntervals(startdate, cycle_length, qty_shots);
}