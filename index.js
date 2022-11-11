const transitAgencies = []
const transitRoutes = []
const agencyAPI = `https://svc.metrotransit.org/nextripv2/agencies`
const routeAPI = `https://svc.metrotransit.org/nextripv2/routes`

function getAgencies() {
    fetch(agencyAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (i = 0; i < data.length; i++) {
                console.log(data[i].agency_name)
            }})
};

getAgencies();

