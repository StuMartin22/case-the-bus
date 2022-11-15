// Declaring variables for API fetch URLs to not have to type out the whole address
const agencyAPI = `https://svc.metrotransit.org/nextripv2/agencies`
const routeAPI = `https://svc.metrotransit.org/nextripv2/routes`

// Variables to select HTML elements by ID.
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

// Event listeners for on change events to run various functions when a dropdown menu is changed
dropDown.addEventListener('change', selectAgency)
dropDown2.addEventListener('change', selectDirection)
dropDown3.addEventListener('change', selectStop)
dropDown4.addEventListener('change', getPlaceDepartureInfo)

// Runs first - same time as getRoutes
function getAgenciesList() {
    // Requests agency data from API and returns response in JSON
    fetch(agencyAPI)
        .then(function (response) {
            return response.json();
        })
        // Takes response and puts it in an object called data, sets agencyList array equal to data obj
        .then((data) => {
            agencyList = data
            // Loop through agencyList items
            for (let i = 0; i < agencyList.length; i++) {
                // Declare option and set it equal to creating HTML element 'option'
                let option = document.createElement('option')
                // Setting the text of option var to be equal to agencyList item's agency_name
                option.textContent = agencyList[i].agency_name
                // Sets value attribute. Value iterates with for loop
                option.setAttribute('value', i)
                // Appends created option to dropDown element
                dropDown.appendChild(option)
                // Sets a class attribute named agencies to created option elements
                option.setAttribute('class', 'agencies')
            }
        })
};

// Runs first - at same time as getAgenciesList
function getRoutes() {
    // Requests route data from API and returns response in JSON
    fetch(routeAPI)
        .then((response) => response.json())
        // Puts response into object called data, then maps over the entries and pushes them into transitRoutes array
        .then((data) => {
            data.map(entry => transitRoutes.push(entry))
        })
};

// Runs second - on change event
function selectAgency(e) {
    // Calls toggleAllBoxes function to hide any visible dropdown boxes not being used.
    toggleAllBoxes();
    // Setting agentID equal to the target value where user selects agency
    agentID = e.target.value
    // Calls toggleBox2 function - will make visibility shown
    toggleBox2();
    // Calls filterRoutesByAgency function and passes agentID value into it
    filterRoutesByAgency(agentID)
};

// Called within selectAgency and selectDirection functions
function toggleAllBoxes() {
    // Selects elements and sets their style, visibility, to hidden to hide elements on screen
    document.getElementById("selectBox3").style.visibility = "hidden";
    document.getElementById("selectBox4").style.visibility = "hidden";
    document.getElementById("departureCardBody").style.visibility = "hidden";
    document.getElementById("noTransitCardBody").style.visibility = "hidden";
};

// Called within selectAgency
function toggleBox2() {
    // selecting HTML element selectBox2
    var x = document.getElementById("selectBox2");
    // If agentID var set by selectAgency value is NOT null
    if (agentID !== null) {
        // SelectBox2 CSS styling will be set to visible (originally set as hidden)
        x.style.visibility = "visible";
        // If null
    } else {
        // Set to hidden
        x.style.visibility = "hidden";
    }
};

// Called within selectAgency
function filterRoutesByAgency(agentID) {
    // Select all elements with routeOptions class
    document.querySelectorAll('.routeOptions').forEach(cl => cl.remove());
    // Set filteredRoutes array to empty
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
        option.setAttribute('value', transitRoutes[i].route_id)
        // Appends the created option var to the dropDown2 element
        dropDown2.appendChild(option)
        // Adds routeOptions class attribute to option
        option.setAttribute('class', 'routeOptions')
    }
};

// Runs third
function selectDirection(e) {
    // Sets array to empty
    directionChoice = []
    // Calls toggleAllBoxes function
    toggleAllBoxes();
    // Selects all elements with class attribute directions and removes those elements
    document.querySelectorAll('.directions').forEach(cl => cl.remove());
    // Sets routeID = user selected value by change event
    routeID = e.target.value
    // Declaring a new API variable with the aforementioned routeID as search parameter
    const directionAPI = `https://svc.metrotransit.org/nextripv2/directions/${routeID}`
    // Call API, format response to JSON 
    fetch(directionAPI)
        .then((response) => response.json())
        // Put response into data object, set directionChoice array eq to data obj
        .then((data) => {
            directionChoice = data
            // Call directionLoop function and pass directionChoice through it
            directionLoop(directionChoice);
            // Call toggleBox3 function
            toggleBox3();
        })
};

// Called within selectDirection function
function directionLoop(directionChoice) {
    // Iterate over items in array 
    for (i = 0; i < directionChoice.length; i++) {
        // Declaring variable to create HTML element option
        let option = document.createElement('option')
        // Setting the text of that element to user selection of dropdown
        option.textContent = directionChoice[i].direction_name
        // Adds attribute value that contains the directionID
        option.setAttribute('value', directionChoice[i].direction_id)
        // Appends option to dropDown3 menu
        dropDown3.appendChild(option)
        // Sets class attribute of directions to option
        option.setAttribute('class', 'directions')
    }
};

// Called within selectDirection function
function toggleBox3() {
    // Declares var x as selecting HTML element selectBox3
    var x = document.getElementById("selectBox3");
    // If routeID var set by selectDirection value is not null
    if (routeID !== null) {
        // SelectBox3 CSS styling will be set to visible
        x.style.visibility = "visible";
        // If null
    } else {
        // Set to hidden
        x.style.visibility = "hidden";
    }
};

// Runs fourth
function selectStop(e) {
    // Set stopChoice array to empty
    stopChoice = []
    // Select all class attributes 'stops' and removes associated element
    document.querySelectorAll('.stops').forEach(cl => cl.remove());
    // Sets stopID = user selection
    stopID = e.target.value
    // New API fetch address with previous 2 user choices as parameters.
    const stopsAPI = `https://svc.metrotransit.org/nextripv2/stops/${routeID}/${stopID}`
    // Calls API and sends back response in JSON
    fetch(stopsAPI)
        .then((response) => response.json())
        // Puts response in object named data, sets stopChoice array = object
        .then((data) => {
            stopChoice = data
            // Calls stopsLoop function and passes stopChoice into it
            stopsLoop(stopChoice);
            // Calls toggleBox4 function
            toggleBox4();
        }
        )
};

// Called within stopChoice function
function stopsLoop(stopChoice) {
    // Loops over stopChoice array
    for (i = 0; i < stopChoice.length; i++) {
        // Defines option as creating option element
        let option = document.createElement('option')
        // Setting text to description of stopChoice array
        option.textContent = stopChoice[i].description
        // Sets value attribute to option and assigns its value as the iterative stopChoice place_code
        option.setAttribute('value', stopChoice[i].place_code)
        // Appends option element to dropDown4 element
        dropDown4.appendChild(option)
        // Adds class attribute named stops to option element
        option.setAttribute('class', 'stops')
    }
};

// Called within stopChoice function
function toggleBox4() {
    // Declares var x as selecting HTML element selectBox4
    var x = document.getElementById("selectBox4");
    // If routeID var set by selectDirection value is not null
    if (stopID !== null) {
        // SelectBox4 CSS styling will be set to visible
        x.style.visibility = "visible";
        // If null
    } else {
        // Set to hidden
        x.style.visibility = "hidden";
    }
};

// Runs fifth
function getPlaceDepartureInfo(e) {
    // Selects all elements with class attribute 'card-text'
    document.querySelectorAll('.card-text').forEach(cl => cl.remove());
    // Sets value of placeID to user selection
    placeID = e.target.value
    // New API address with previous 3 user choice results as parameters
    const placeAPI = `https://svc.metrotransit.org/nextripv2/${routeID}/${stopID}/${placeID}`
    // Calling API and getting JSON response
    fetch(placeAPI)
        .then((response) => response.json())
        // Putting response into an obj and setting placeChoice = to that object
        .then((data) => {
            placeChoice = data
            // Call pickACard function
            pickACard();
        })
};

// Called within getPlaceDepartureInfo function
function pickACard() {
    // If placeChoice array is not empty / null
    if (placeChoice !== null) {
        // toggleBox5 function will run with placeChoice info passed into it
        toggleBox5(placeChoice)
        // if array IS empty/null, calls toggleBoxTheEnd function
    } else { toggleBoxTheEnd() }
};

// Runs depending on pickACard
function toggleBox5(placeChoice) {
    // Calls departureCardAppend function and passes placeChoice info to it
    departureCardAppend(placeChoice);
    // Declares var x as selecting HTML element departureCardBody
    var x = document.getElementById("departureCardBody");
    // If routeID var set by selectDirection value is not null
    if (placeID !== null) {
        // departureCardBody CSS styling will be set to visible
        x.style.visibility = "visible";
        // If null
    } else {
        // Set to hidden
        x.style.visibility = "hidden";
    }
};

// Runs if toggleBox5 option was initiated
function departureCardAppend(placeChoice) {
    // If placeChoice array item departures value is text = Due
    if (placeChoice.departures[0].departure_text === 'Due') {
        // Create option - a paragraph element
        let option = document.createElement('p')
        // Set paragraph text content to departure text + the string 'or' + departure text
        // This will return both "due" and "x minutes" to represent 2 different departures
        option.textContent = `${placeChoice.departures[0].departure_text} OR ${placeChoice.departures[1].departure_text}`
        // Set class attribute named card-text to element 
        option.setAttribute('class', "card-text")
        // Append new element to departureTimeCard element
        departureTimeCard.appendChild(option)
        // If placeChoice array item departures value text is NOT due
    } else {
        // Create a paragraph element
        let option = document.createElement('p')
        // Set text to first available departure time
        option.textContent = placeChoice.departures[0].departure_text
        // Add a class attribute called card-text
        option.setAttribute('class', "card-text")
        // Append newly created element(s) to departureTimeCard
        departureTimeCard.appendChild(option)
    }
};

// Runs depending on pickACard
function toggleBoxTheEnd(placeChoice) {
    // Calls noTransitCardAppend function and passes placeChoice info to it
    noTransitCardAppend(placeChoice);
    // Declares var x as selecting HTML element noTransitCardBody
    var x = document.getElementById("noTransitCardBody");
    // If placeID var is not null
    if (placeID !== null) {
        // CSS styling will be set to visible
        x.style.visibility = "visible";
        // If null
    } else {
        // Set to hidden
        x.style.visibility = "hidden";
    }
};

// Runs if toggleBoxTheEnd was initiated
function noTransitCardAppend() {
    // Creates paragraph element
    let option = document.createElement('p')
    // Sets textContent to string
    option.textContent = 'There are no more transit options tonight!'
    // Adds class attribute card-text to paragraph element
    option.setAttribute('class', "card-text")
    // Appends new 'p' element to noTransitCard
    noTransitCard.appendChild(option)
};

// Call functions on load
getAgenciesList();
getRoutes();