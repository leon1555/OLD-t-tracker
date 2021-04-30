// Generates an array of the user's selection of injection sites.

document.getElementById('savebutton').addEventListener('click', save_sites);

function save_sites(){
    let injection_sites = [];
    if(lefthip.checked == true){
        injection_sites.push("left hip");
    }
    if(righthip.checked == true){
        injection_sites.push("right hip");
    }
    if(leftthigh.checked == true){
        injection_sites.push("left thigh");
    }
    if(rightthigh.checked == true){
        injection_sites.push("right thigh");
    }
    if(leftarm.checked == true){
        injection_sites.push("left arm");
    }
    if(rightarm.checked == true){
        injection_sites.push("right arm");
    }
    console.log(injection_sites);
    localStorage.setItem('injection_sites', JSON.stringify(injection_sites));
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