const transitAgencies = []
const transitRoutes = []
const agencyAPI = `https://svc.metrotransit.org/nextripv2/agencies`

function getAgencies() {
    fetch(agencyAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
        });
};

console.log('test')

getAgencies();