
// calling element from html file

const userLocation=document.getElementById("userLocation"); //input field
// console.log(userLocation);
const converter=document.getElementById("converter");
// console.log(converter);
const weatherIcon=document.getElementById("weatherIcon");
const temperature=document.getElementById("temperature");
const feelsLike = document.getElementById("feelsLike");
const description = document.getElementById("description");
const sea_Level=document.getElementById("sea_level");
const date=document.getElementById("date");
const city=document.getElementById("city");
const HValue=document.getElementById("HValue");
const WValue=document.getElementById("WValue");
const SRValue=document.getElementById("SRValue");
const SSValue=document.getElementById("SSValue");
const CValue=document.getElementById("CValue");
const UVValue=document.getElementById("UVValue");
const PValue=document.getElementById("PValue");

// introducing weather API get from openWeather.com
// Global variables

WEATHER_API_ENDPOINT=`https://api.openweathermap.org/data/2.5/weather?appid=f3468552b34e995e5f4b888bce694975&q=`;
WEATHER_DATA_ENDPOINT=`https://api.openweathermap.org/data/3.0/onecall?exclude=minutely&units=metric&appid=f3468552b34e995e5f4b888bce694975&`;

// events to button
 function findUserLocation(){
    Forecast.innerHTML="";

    fetch(WEATHER_API_ENDPOINT+ userLocation.value) // to get user input value
       .then((response)=>{
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`); //error handling in response fetching
        }
        return response.json(); // data is converted into json format
       }) 
       .then((data)=>{
            if(data.cod!='' && data.cod!=200){
                alert(data.message); // if the entered location is not correct - shows error alert
                return;
            }
             console.log(data);

             city.innerHTML=data.name  + "," + data.sys.country;
             weatherIcon.style.background=`url("https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png")`;
             weatherIcon.style.width="120px";
             weatherIcon.style.height="120px";
             sea_Level.innerHTML="Sea Level : "+ data.main.sea_level + " hPa";



        fetch(WEATHER_DATA_ENDPOINT + `lon=${data.coord.lon}&lat=${data.coord.lat}`) //latitude and longtitude value
                .then((response)=>{
                    if (!response.ok) {
                        throw new Error(`Error: ${response.status} - ${response.statusText}`);
                    }
                    return response.json();
                })
                .then((data)=>{
                    console.log(data);
                    temperature.innerHTML=temConverter(data.current.temp);

                    // temperature.innerHTML=data.current.temp; // temperature visibility
                    feelsLike.innerHTML="Feels like : "+ data.current.feels_like; //feelslike visibility
                    description.innerHTML=`<i class="fa-brands fa-cloudversify fa-2xl" style="color: #354f7e;"></i> &nbsp;`+ data.current.weather[0].description; //weather description visibility
                    
                    const options={
                        weekday:"long",
                        month:"long",
                        day:"numeric",
                        hour:"numeric",
                        minute:"numeric",
                        hour12:"true",
                    };

                    date.innerHTML=getLongFormatDateTime(
                        data.current.dt,
                        data.timezone_offset,
                        options);

                    HValue.innerHTML=
                    Math.round(data.current.humidity)+`<span>%</span>`; //humidity value

                    WValue.innerHTML=
                    Math.round(data.current.wind_speed)+`<span>ms</span>`; // wind speed value
                    

                    const options1={
                        hour:"numeric",
                        minute:"numeric",
                        hour12:true
                  }

                    
                    SRValue.innerHTML=getLongFormatDateTime(  //sunrise value
                        data.current.sunrise,
                        data.timezone_offset,
                        options1);
                    SSValue.innerHTML=getLongFormatDateTime(  //sunset value
                        data.current.sunset,
                        data.timezone_offset,
                        options1);


                    CValue.innerHTML=data.current.clouds+`<span>%</span>`;
                    UVValue.innerHTML=data.current.uvi;
                    PValue.innerHTML=data.current.pressure+`<span>hPa</span>`;
                   
                    console.log(data.daily);  //to forecast the week daily data

                    data.daily.forEach((weather)=>{
                        let div=document.createElement("div");
                        div.className = "bg-sky-50 flex flex-col justify-center items-center rounded-md text-sky-900 p-4";
                           const options={
                            weekday:'long',
                            month:'long',
                            day:"numeric"
                           }
                        div.innerHTML=getLongFormatDateTime(weather.dt,0,options);

                        div.innerHTML+= `<img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png"/>`;
                        
                        div.innerHTML+=`<p class="forecast-desc">${weather.weather[0].description}</p>`;
 
                        div.innerHTML+=`<span><span>Min: ${temConverter(weather.temp.min)}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>Max: ${temConverter(weather.temp.max)}</span></span>`;

                        
                        Forecast.append(div);
                        
                        });



                })

                .catch((error) => {
                    
                    console.error('An error occurred:', error.message);  //catch the error when something goes wrong
                    alert('Failed to fetch weather data. Please try again later.');
                });

    });
}

function formatUnixTime(dtValue,offSet,options={}){ // to analyze the sunset and sun rise
    const date=new Date((dtValue+offSet)*1000);
    return date.toLocaleDateString([],{timeZone:"UTC",...options});
}

function getLongFormatDateTime(dtValue,offSet,options){
    return formatUnixTime(dtValue,offSet,options);
}

function temConverter(temp){  //temperature converter
    let tempValue=Math.round(temp);
    let message="";
    if(converter.value=="°C"){
        message=tempValue+"<span>"+"\xB0C</span>";
    }
    else{
        let ctof=(temperature*9)/5+32;
        message=tempValue+"<span>"+"\xB0F</span>";
    }
    return message;
}


// calender accessbility
const header = document.querySelector(".calendar h3");
const dates = document.querySelector(".dates");
const navs = document.querySelectorAll("#prev, #next");

const months = [ // array of months
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let dated = new Date();
let month = dated.getMonth();
let year = dated.getFullYear();

function renderCalendar() {
  // first day of the month
  const start = new Date(year, month, 1).getDay();
  // last date of the month
  const endDate = new Date(year, month + 1, 0).getDate();
  // last day of the month
  const end = new Date(year, month, endDate).getDay();
  // last date of the previous month
  const endDatePrev = new Date(year, month, 0).getDate();

  let datesHtml = "";

  for (let i = start; i > 0; i--) {
    datesHtml += `<li class="inactive">${endDatePrev - i + 1}</li>`;
  }

  for (let i = 1; i <= endDate; i++) {
    let className =
      i === dated.getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
        ? ' class="today"'
        : "";
    datesHtml += `<li${className}>${i}</li>`;
  }

  for (let i = end; i < 6; i++) {
    datesHtml += `<li class="inactive">${i - end + 1}</li>`;
  }

  dates.innerHTML = datesHtml;
  header.textContent = `${months[month]} ${year}`;
}

navs.forEach((nav) => {
  nav.addEventListener("click", (e) => {
    const btnId = e.target.id;

    if (btnId === "prev" && month === 0) {
      year--;
      month = 11;
    } else if (btnId === "next" && month === 11) {
      year++;
      month = 0;
    } else {
      month = btnId === "next" ? month + 1 : month - 1;
    }

    dated = new Date(year, month, new Date().getDate());
    year = dated.getFullYear();
    month = dated.getMonth();

    renderCalendar();
	 });
});

renderCalendar();