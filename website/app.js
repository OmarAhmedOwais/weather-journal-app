/* Global Variables */
let zip = document.querySelector("#zip");
let generate = document.querySelector("#generate");
let entryHolder = document.querySelector("#entryHolder");
let feelings = document.querySelector("#feelings");
let main = document.querySelector('main');

// Personal API Key for OpenWeatherMap API
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
//94040

const apiKey = ",us&appid=721e619d4aeee7c3a28a87c81f601cc1&units=imperial";
//&appid=721e619d4aeee7c3a28a87c81f601cc1&units=imperial
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() + "." + d.getMonth() + 1 + "." + d.getFullYear();


// Event listener to add function to existing HTML DOM element
generate.addEventListener("click", generateClicked);
/* Function called by event listener */
async function generateClicked() {
  // check input have only number
  if (zip.value && !isNaN(zip.value)) {
    await getDataFromApi().then((data)=>{
    // post data to the server
      postData('/addItem', { date: newDate, temp: data.main.temp, content: feelings.value})
    }).then(()=>{
      UpdateUI();
    })
  }
  // zip is empty
  else if (!zip.value){
    let msg = `<div class="msg">This Field Must Not Be Empty</div>`;
    main.insertAdjacentHTML('afterbegin',msg)
    // remove message after 2 second
    setTimeout(() => {
      document.querySelector('.msg').remove();
    }, 2000);
  }
  // empty field
  else{
    let msg = `<div class="msg">'${zip.value}' Not valid Zip Code</div>`;
    main.insertAdjacentHTML('afterbegin', msg)
    // remove message after 2 second
    setTimeout(() => {
      document.querySelector('.msg').remove();
    }, 2000);
  }
}

/* Function to GET Web API Data*/
let getDataFromApi = async () => {
  return await fetch(apiUrl + zip.value + apiKey)
    .then((data) => {
      return data.json();
    })
    .catch((error) => console.error(error));
};

/* Function to POST data */
// Async POST
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to GET Project Data */
let getDataFromserver = async () => {
  return await fetch('/all')
    .then((data) => {
      let x=data.json();
      //console.log(data);
      console.log(x);
      return data.json();
    })
    .catch((error) => console.log(error));
};

async function UpdateUI(){
  const retrieveData = async () =>{
    const request = await fetch('/all');
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData)
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData.temp)+ 'degrees';
    document.getElementById('content').innerHTML = allData.content;
    document.getElementById('date').innerHTML =allData.date;
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
   }
}