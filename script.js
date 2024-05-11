
const temperatureField =document.querySelector(".temp");
const locationField =document.querySelector(".location");
const dateField =document.querySelector(".time");
const weatherField =document.querySelector(".condition p");
const searchField =document.querySelector(".search_area");
const form =document.querySelector('form');
const weatherIcon = document.querySelector(".condition img");

form.addEventListener('submit',searchForLocation)

let target ='Haldia'

const fetchResults = async(targetLocation)=>{
    let url = `http://api.weatherapi.com/v1/current.json?key=4ef7d39ae739472381d193837241005&q=${targetLocation}&aqi=no`
    const res = await fetch(url)
    const data = await res.json()
    console.log(data)

    let locationName=data.location.name
    let time=data.location.localtime
    let temp=data.current.temp_c
    let condition=data.current.condition.text
    let image=data.current.condition.icon

    updateDetails(temp,locationName,time,condition,image)
    
}

function updateDetails(temp,locationName,time,condition,image){

    console.log(image)
    let splitDate= time.split(' ')[0]
    let splitTime= time.split(' ')[1]
    let currentDay=getDayName(new Date(splitDate).getDay())
    
    temperatureField.innerText = `${temp}°C`
    locationField.innerText = locationName
    dateField.innerText = `${splitDate} - ${currentDay} ${splitTime}`
    weatherField.innerText = condition
    searchImages(locationName);
    weatherIcon.src=`${image}`
}

function searchForLocation(e){
    e.preventDefault()
    target = searchField.value
    fetchResults(target)
}


function getDayName(number){
    switch (number){
        case 0:
            return 'Sunday'
        case 1:
            return 'Monday'
        case 2:
            return 'Tuesday'
        case 3:
            return 'Wednesday'
        case 4:
            return 'Thursday'
        case 5:
            return 'Friday'
        case 6:
            return 'Saturday'
    }

}


// AIzaSyAAGoRdJhlFpqasw8wCBHbTCOMD5ooDPRE  API KEY
// e061e00455ec9426b search engine id

// Function to search for images based on weather condition
async function searchImages(locationName) {
    const apiKey = 'AIzaSyAAGoRdJhlFpqasw8wCBHbTCOMD5ooDPRE'; // Replace with your API key
    const cx = 'e061e00455ec9426b'; // Replace with your Custom Search Engine ID
    const query = `${locationName}`; // Modify the query as needed

    const url = `https://www.googleapis.com/customsearch/v1?q=${query}&cx=${cx}&searchType=image&key=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        // Extract image URLs from search results
        const imageResults = data.items.map(item => item.link);

        // Choose a suitable image based on criteria such as contrast with text content
        const chosenImage = chooseImage(imageResults);

        // Update background image of the web page
        const body = document.body;
        body.style.transition = "background-image 3s ease"; // Smooth transition for background image
        body.style.backgroundImage = `url('${chosenImage}')`;

    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

// Function to choose a suitable image based on criteria such as contrast with text content
function chooseImage(imageResults) {
    // Implement your logic to choose the most suitable image
    // For example, you could compare image properties such as brightness, colors, etc.
    // Here, we'll simply pick the first image from the search results
    return imageResults[0];
}

// window.onload = function() {
//     const body = document.body;
//     body.style.transition = "background-image 1s ease"; // Smooth transition for background image
//     body.style.backgroundImage = "url('background2.jpg')"; // Change background image
// };

