// Retrieves preferred injection sites, medication brand, and dose from Local Storage
let injection_sites = JSON.parse(localStorage.getItem("injection_sites"));
let medications_all = JSON.parse(localStorage.getItem("medications"));
let medication;
let current_brand;
let current_dose;
if(medications_all != null){
    medication = medications_all[medications_all.length - 1];
    current_brand = medication.brand;
    current_dose = medication.dose;
}


// Takes in details (date and site) of an injection logged by the user. Stores this data in Local Storage.
function main(){
    injection_index = 0;
    // Populates dropdown menu with injection sites that the user has already set up
    if(injection_sites != null){
        while(injection_index < (injection_sites.length)){
            let injection_site = injection_sites[injection_index];
            document.getElementById("sites").innerHTML += `<option value="${injection_site}">${injection_site}</option>`
            injection_index += 1;
        }
    // In case the user hasn't set up any injection sites, this generates a default dropdown menu with all possible sites
    } else {
        document.getElementById("sites").innerHTML = `<option value="left hip">left hip</option>
        <option value="right hip">right hip</option><option value="left thigh">left thigh</option><option value="right thigh">right thigh</option><option value="left arm">left arm</option><option value="right arm">right arm</option><option value="eyebrow">eyebrow</option>`
    }
    document.getElementById("med_id").innerHTML = `current med:<br><span class="purple">${current_brand}</span>`;
    document.getElementById("dose_id").innerHTML = `current dosage:<br><span class="purple">${current_dose}</span>`;

    document.getElementById("log_injection").addEventListener("click", collect_data);
    function collect_data(){
        let latest_injection_date = new Date(document.getElementById("injection_date").value);
        latest_injection_date.setDate(latest_injection_date.getDate() + 1);
        localStorage.setItem('latest_injection_date', JSON.stringify(latest_injection_date));
        let latest_injection_site = document.getElementById("sites").value;
        console.log(latest_injection_date);
        localStorage.setItem('latest_injection_site', latest_injection_site);       
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
}
window.addEventListener('load', main);

