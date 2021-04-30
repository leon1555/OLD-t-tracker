import{monthName, dayName, abbrDayName} from './common_functions.js';

// Populates the "User Profile" field with data from the most recently entered injection regime (in local storage)
let username = localStorage.getItem("username");
document.getElementById("insert_username").innerHTML = `${username}'s overview`;

// Retrieves any previous information about medication entered in Local Storage
let regime = JSON.parse(localStorage.getItem("medications"));
let cycle_length;
let start_date;
let next_site_auto;
if(regime != null){
    let current_regime = regime[regime.length - 1];
    let current_brand = current_regime.brand;
    let current_dosage = current_regime.dose;
    start_date = current_regime.start_date;
    next_site_auto = current_regime.next_injection_site;
    cycle_length = current_regime.cycle_length;
    // let current_qty_shots = current_regime.doses_per_vial; (maybe a future add-on)
  
    // Outputs any previous info from Local Storage about medication brand and dose
    document.getElementById("medication_output").innerHTML = `medication:<br><span class="purple">${current_brand}</span>`;
    document.getElementById("dosage_output").innerHTML = `dose:<br><span class="purple">${current_dosage}</span>`;
    // document.getElementById("shots_vial_output").innerHTML = `${current_qty_shots}`;
}

// Retrieves any info entered about injection sites in Local Storage 
let injection_sites = JSON.parse(localStorage.getItem("injection_sites"));

// If user has already logged an injection, the date and specific injection site get retrieved
let latest_injection_date_json = localStorage.getItem("latest_injection_date");
let latest_injection_date_parsed = JSON.parse(latest_injection_date_json);
if(latest_injection_date_parsed != null){
    let latest_injection_date = (new Date(latest_injection_date_parsed)).toDateString();

    let latest_injection_site = localStorage.getItem("latest_injection_site");

    // Outputs last injection date and site (from a logged injection)
    document.getElementById("last_injection_output").innerHTML = `last injection:<br><span class="purple">${latest_injection_date}, ${latest_injection_site}</span>`;

    // Calculates next injection date. Uses the last injection date as reference and adds the user-entered period between injections.
    let nextdate = new Date(latest_injection_date_parsed);
    nextdate.setDate(nextdate.getDate() + cycle_length);
    let nextdate_abbr = nextdate.toDateString();

    // Determines next injection site from an array of the user's preferred injection sites. Determines the position of the last injection site in the array and returns the immediately following injection site in the array. If the last injection site does not appear in the array, or if it's the last item in the array, then the first injection site in the array is returned. 
    let next_site;

    if(injection_sites.includes(latest_injection_site) == true) {
        let latest_index = injection_sites.indexOf(latest_injection_site);
        if(latest_index < (injection_sites.length - 1)){
            next_site = injection_sites[latest_index + 1];
        } else {
            next_site = injection_sites[0];
        }
    } else {
        next_site = injection_sites[0];
    }

    // Outputs next injection date and site
    document.getElementById("next_injection_output").innerHTML = `next injection:<br><span class="purple">${nextdate_abbr}, ${next_site}</span>`;
} else {
    // This handles the scenario in which the user has not yet logged an injection, but has set up an injection regime. The next injection date is taken from the start date entered in the regime.
    // NOTE! At the moment, this returns the previous day, due to a mishandling of the time zone.
    document.getElementById("last_injection_output").innerHTML = "no injections yet!";
    let initial_date = new Date(start_date);
    console.log(initial_date);
    let initial_day_num = initial_date.getUTCDay();
    // function abbrDayName(dayNum){
    //     let weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    //     return weekdays[dayNum];
    // }
    let initial_day = abbrDayName(initial_day_num);

    let initial_num = initial_date.getUTCDate();
    
    let initial_month_num = initial_date.getUTCMonth();
    let initial_month = monthName(initial_month_num);
    
    let initial_year = initial_date.getUTCFullYear();

    // Outputs first injection site in injection site array, if the user has already selected their preferred injection sites.
    if(injection_sites != null){
        document.getElementById("next_injection_output").innerHTML = `next injection:<br><span class="purple">${initial_day} ${initial_num} ${initial_month} ${initial_year}, ${injection_sites[0]}</span>`;
    } 
    else {
        if(start_date != undefined){
            document.getElementById("next_injection_output").innerHTML = `next injection:<br><span class="purple">${initial_day} ${initial_num} ${initial_month} ${initial_year}</span>`;
        }
    }
}

// Get today's date and display it in the graphical header
let today = new Date();
let today_day_num = today.getDay();
let today_date = today.getDate();
let today_month_num = today.getMonth();
let today_year = today.getFullYear();
// function dayName(dayNum){
//     let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//     return weekdays[dayNum];
// }
let today_day = dayName(today_day_num);

// function monthName(monthNum){
//     let months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
//     return months[monthNum];
// }

let today_month = monthName(today_month_num);

document.querySelector("#date_day").innerHTML = today_day;
document.querySelector("#date_num").innerHTML = today_date;
document.querySelector("#date_month").innerHTML = today_month;
document.querySelector("#date_year").innerHTML = today_year;