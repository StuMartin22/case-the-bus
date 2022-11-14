// Declaring variables for API fetch URLs to not have to type out the whole address
const agencyAPI = `https://svc.metrotransit.org/nextripv2/agencies`
const routeAPI = `https://svc.metrotransit.org/nextripv2/routes`

// dropDown[i] are selecting HTML elements by ID.
const dropDown = document.getElementById('inputGroupSelect01')
const dropDown2 = document.getElementById('inputGroupSelect02')
const dropDown3 = document.getElementById('inputGroupSelect03')
const dropDown4 = document.getElementById('inputGroupSelect04')
const departureTimeCard = document.getElementById('departureCardBody')
const noTransitCard = document.getElementById('noTransitCardBody')

// Declaring global variables
let agencyList
let transitRoutes = []
let filteredRoutes = []
let agentID = null
let routeID = null
let directionChoice = []

// TODO: Remove console logs
// Center card for final option
// clean up code and format page
// finish / clean up notes
// if no response from selection have it return "no options found"

dropDown.addEventListener('change', selectAgency)
dropDown2.addEventListener('change', selectDirection)
dropDown3.addEventListener('change', selectStop)
dropDown4.addEventListener('change',getPlaceDepartureInfo)

// runs first
function getAgenciesList() {
    // Requests agency data from API and returns response in JSON
    fetch(agencyAPI)
        .then(function (response) {
            return response.json();
        })
        // Takes response and puts it in an object called data, sets agencyList array equal to data obj
        .then((data) => {agencyList = data
        // Loop through agencyList items
        for (let i = 0; i < agencyList.length; i++) {
            // Declare option and set it equal to creating HTML element 'option'
            let option = document.createElement('option')
            // Setting the text of option var to be equal to agencyList item's agency_name
            option.textContent = agencyList[i].agency_name
            // Sets value attribute to option, value iterates with for loop
            option.setAttribute('value',i)
            // appends created option to dropDown element
            dropDown.appendChild(option)
            // Sets a class attribute to option named "agencies"
            option.setAttribute('class','agencies')
            }
            console.log(agencyList)
        })
    };

//runs first
function getRoutes() {
    // Requests route data from API and returns response in JSON
    fetch(routeAPI)
            .then((response) => response.json())
            // Puts response into object called data, then maps over the entries and pushes them into transitRoutes array
            .then((data) => {data.map(entry => transitRoutes.push(entry))
            })
};

//runs second
function selectAgency(e){
    // Setting agentID equal to the target value where user selects agency
    agentID = e.target.value
    // Calls toggleBox2 function
    toggleBox2();
    // Calls filterRoutesByAgency function and passes agentID var into it
    filterRoutesByAgency(agentID)
};

//runs third
function toggleBox2() {
    // Declares var x as selecting HTML element selectBox2
    var x = document.getElementById("selectBox2");
    // If agentID var set by selectAgency value is null
    if (agentID !== null) {
    // SelectBox2 CSS styling will be set to visible
      x.style.visibility = "visible";
    // If not null
    } else {
    // Set to hidden
      x.style.visibility = "hidden";
    }
};

//runs third
function filterRoutesByAgency(agentID){
    document.querySelectorAll('.routeOptions').forEach(cl => cl.remove());
    filteredRoutes = []
    // Sets filteredRoutes array equal to filtered results from transitRoutes where agency_id is eq to agentID var set in selectAgency function
    filteredRoutes = transitRoutes.filter(event => event.agency_id == agentID)
    // Loops through filteredRoutes array
    for (let i = 0; i < filteredRoutes.length; i++) {
        // Declares option var and sets it equal to creating HTML element 'option'
        let option = document.createElement('option')
        // Changes text content of option to be equal to each item in transitRoutes array's route_label
        option.textContent = transitRoutes[i].route_label
        // Sets a value attribute to each option where value = the route_id 
        option.setAttribute('value',transitRoutes[i].route_id)
        // appends the created option var to the dropDown2 element
        dropDown2.appendChild(option)
        option.setAttribute('class','routeOptions')
        }        
        console.log(filteredRoutes)
};

//runs fourth
function selectDirection(e){
    directionChoice = []
    document.querySelectorAll('.directions').forEach(cl => cl.remove());
    routeID = e.target.value
    console.log(routeID)
    const directionAPI = `https://svc.metrotransit.org/nextripv2/directions/${routeID}`
    fetch (directionAPI)
    .then((response) => response.json())
    .then ((data) => {directionChoice = data
    directionLoop(directionChoice);
    console.log(directionChoice)
    toggleBox3();
    })
};

//runs fifth
function directionLoop(directionChoice){
    for (i=0; i < directionChoice.length; i++){
        let option = document.createElement('option')
        option.textContent = directionChoice[i].direction_name
        option.setAttribute('value',directionChoice[i].direction_id)
        dropDown3.appendChild(option)
        option.setAttribute('class','directions')
    }
};

//runs fifth
function toggleBox3() {
    // Declares var x as selecting HTML element selectBox3
    var x = document.getElementById("selectBox3");
    // If routeID var set by selectDirection value is null
    if (routeID !== null) {
    // SelectBox3 CSS styling will be set to visible
        x.style.visibility = "visible";
    // If not null
    } else {
    // Set to hidden
        x.style.visibility = "hidden";
    }
};

//runs sixth
function selectStop(e){
    stopChoice = []
    document.querySelectorAll('.stops').forEach(cl => cl.remove());
    stopID = e.target.value
    console.log(stopID)
    const stopsAPI = `https://svc.metrotransit.org/nextripv2/stops/${routeID}/${stopID}`
    fetch (stopsAPI)
    .then((response) => response.json())
    .then ((data) => {stopChoice = data
    stopsLoop(stopChoice);
    console.log(stopChoice)
    toggleBox4();}
    )};

//runs sixth
function stopsLoop(stopChoice){
    for (i=0; i < stopChoice.length; i++){
        let option = document.createElement('option')
        option.textContent = stopChoice[i].description
        option.setAttribute('value',stopChoice[i].place_code)
        dropDown4.appendChild(option)
        option.setAttribute('class','stops')
    }
};

//runs sixth
function toggleBox4() {
    // Declares var x as selecting HTML element selectBox3
    var x = document.getElementById("selectBox4");
    // If routeID var set by selectDirection value is null
    if (stopID !== null) {
    // SelectBox3 CSS styling will be set to visible
        x.style.visibility = "visible";
    // If not null
    } else {
    // Set to hidden
        x.style.visibility = "hidden";
    }
};

//runs seventh
function getPlaceDepartureInfo(e){
    placeID = e.target.value
    console.log(placeID)
    const placeAPI = `https://svc.metrotransit.org/nextripv2/${routeID}/${stopID}/${placeID}`
    fetch (placeAPI)
        .then((response) => response.json())
        .then ((data) => {placeChoice = data
            console.log(placeChoice.departures)
            // placeChoice = null
        pickACard();})
    };
// console.log(placeChoice)
function pickACard(){
    if(placeChoice !== null){
        toggleBox5(placeChoice)
    } else {toggleBoxTheEnd()}
};

//runs depending on pickACard
function toggleBox5(placeChoice) {
    departureCardAppend(placeChoice);
    // Declares var x as selecting HTML element selectBox3
    var x = document.getElementById("departureCardBody");
        // If routeID var set by selectDirection value is null
    if (placeID !== null) {
    // SelectBox3 CSS styling will be set to visible
        x.style.visibility = "visible";
    // If not null
    } else {
        // Set to hidden
        x.style.visibility = "hidden";
    }
};

//runs depending on pickACard
function departureCardAppend(placeChoice){
    for (i=0; i < placeChoice.departures.length; i++){
        if(placeChoice.departures[i].actual === true){
            let option = document.createElement('p')
            option.textContent = placeChoice.departures[i].departure_text
            option.setAttribute('class',"card-text")
            departureTimeCard.appendChild(option)
        }
    }
};

//runs depending on pickACard
function toggleBoxTheEnd(placeChoice) {
    noTransitCardAppend(placeChoice);
    // Declares var x as selecting HTML element selectBox3
    var x = document.getElementById("noTransitCardBody");
        // If routeID var set by selectDirection value is null
    if (placeID !== null) {
    // SelectBox3 CSS styling will be set to visible
        x.style.visibility = "visible";
    // If not null
    } else {
        // Set to hidden
        x.style.visibility = "hidden";
    }
};

//runs depending on pickACard
function noTransitCardAppend(){
    let option = document.createElement('p')
    option.textContent = 'There are no more transit options tonight!'
    option.setAttribute('class',"card-text")
    noTransitCard.appendChild(option)
};

// Call functions
getAgenciesList();
getRoutes();