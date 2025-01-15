
// calling element from html file

const userLocation=document.getElementById("userLocation"); //input field
// console.log(userLocation);
const converter=document.getElementById("converter");
// console.log(converter);
const weatherIcon=document.getElementById("weatherIcon");
const temperature=document.getElementById("temperature");
const feelsLike = document.getElementById("feelsLike");
const description = document.getElementById("description");
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

