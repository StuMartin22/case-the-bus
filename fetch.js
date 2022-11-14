// Declaring variables for API fetch URLs to not have to type out the whole address
const agencyAPI = `https://svc.metrotransit.org/nextripv2/agencies`
const routeAPI = `https://svc.metrotransit.org/nextripv2/routes`

// dropDown and dropDown2 are selecting HTML elements by ID. dropDown being box 1 and dropDown2 box 2
const dropDown = document.getElementById('inputGroupSelect01')
const dropDown2 = document.getElementById('inputGroupSelect02')


// Declaring variables
let agencyList
let transitRoutes = []
let filteredRoutes = []
let agentID = null


// TODO: Remove console logs

dropDown.addEventListener('change', selectAgency)

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
            }
        })
    };

function selectAgency(e){
    // Setting agentID equal to the target value where user selects agency
    agentID = e.target.value
    // Calls toggleBox2 function
    toggleBox2();
    // Calls filterRoutesByAgency function and passes agentID var into it
    filterRoutesByAgency(agentID)
}

function toggleBox2() {
    // Declares var x as selecting HTML element selectBox2
    var x = document.getElementById("selectBox2");
    // If agentID var set by selectAgency value is null
    if (agentID !== "null") {
    // SelectBox2 CSS styling will be set to visible
      x.style.visibility = "visible";
    // If not null
    } else {
    // Set to hidden
      x.style.visibility = "hidden";
    }
  }

// 0 1 2 3 4 5 6 10 11 15 -- transit agency ID numbers

function getRoutes() {
    // Requests route data from API and returns response in JSON
    fetch(routeAPI)
            .then((response) => response.json())
            // Puts response into object called data, then maps over the entries and pushes them into transitRoutes array
            .then((data) => {data.map(entry => transitRoutes.push(entry))
            })};

function filterRoutesByAgency(agentID){
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
        }}

// Call functions
getAgenciesList();
getRoutes();