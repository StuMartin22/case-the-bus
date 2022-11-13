// Declaring constants for API fetch URLs to not have to type out the whole address.
const agencyAPI = `https://svc.metrotransit.org/nextripv2/agencies`
const routeAPI = `https://svc.metrotransit.org/nextripv2/routes`

// NOTE HERE TODO
const dropDown = document.getElementById('inputGroupSelect01')
const dropDown2 = document.getElementById('inputGroupSelect02')


// Creating empty arrays
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
        // Takes response and puts it in an object called data
        .then((data) => {agencyList = data
        
        for (let i = 0; i < agencyList.length; i++) {
            let option = document.createElement('option')
            option.textContent = agencyList[i].agency_name
            option.setAttribute('value',i)
            dropDown.appendChild(option)
            }
        })
    };

function selectAgency(e){
    agentID = e.target.value
    console.log('agent',agentID)
    toggleBox2();
    filterRoutesByAgency(agentID)
}

function toggleBox2() {
    var x = document.getElementById("selectBox2");
    if (agentID !== "null") {
      x.style.visibility = "visible";
    } else {
      x.style.visibility = "hidden";
    }
  }

// 0 1 2 3 4 5 6 10 11 15

function getRoutes() {
    // Requests route data from API and returns response in JSON
    fetch(routeAPI)
            .then((response) => response.json())
            .then((data) => {data.map(entry => transitRoutes.push(entry))
            })};
        
function filterRoutesByAgency(agentID){
    filteredRoutes = transitRoutes.filter(event => event.agency_id == agentID)
    for (let i = 0; i < filteredRoutes.length; i++) {
        let option = document.createElement('option')
        option.textContent = transitRoutes[i].route_label
        option.setAttribute('value',transitRoutes[i].route_id)
        dropDown2.appendChild(option)
        }}

getAgenciesList();
getRoutes();