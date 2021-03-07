const url = "https://aeroplatziteam8.vercel.app/";

function init(){
    getFlights();
    document.getElementById("btnUpdate").disabled = true;
    document.getElementById("btnDelete").disabled = true;
}

function getFlights(){
    fetch(url + "flight")
    .then(response => response.json())
    .then(data => {
        const result = data.data;
        const flights = result.length

        document.getElementById("numberFlights").textContent =  flights;
        select = document.getElementById('ddlFlight');

        for (var i = 0; i< flights; i++){
            var opt = document.createElement('option');
            opt.value = result[i].flightid;
            opt.innerHTML = "Vuelo " + result[i].flightid;
            select.appendChild(opt);
        }
    })
    .catch(error => alert("Ocurriò un error al obtener los datos."));
}


function insertFlight(){
    var event = data();
    console.log(event);

    fetch(url + "flight", 
    {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(event) // body data type must match "Content-Type" header
    })
    .then(res => res.json())
    .catch(error => {
        console.error('Error:', error)
        console.log("Ocurrió un error al insertar el registro")
    })
    .then(response => {
        console.log('Success:', response)
        alert("Insertado Correctamente")
    });;
}

function updateFlight(){
    var event = data();

    fetch(url + "flight/" +event.flightid, 
    {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(event) // body data type must match "Content-Type" header
    })
    .then(res => res.json())
    .catch(error => {
        console.error('Error:', error)
        console.log("Ocurrió un error al actualizar el registro")
    })
    .then(response => {
        console.log('Success:', response)
        alert("Actualizado Correctamente")
    });;
}

function deleteFlight(){
    var event = data();
    console.log(event);

    fetch(url + "flight/" +event.flightid, 
    {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(event) // body data type must match "Content-Type" header
    })
    .then(res => res.json())
    .catch(error => {
        console.error('Error:', error)
        console.log("Ocurrió un error al eliminar el registro")
    })
    .then(response => {
        console.log('Success:', response)
        alert("Elminado Correctamente")
    });;
}

function flightChange(){
    let flightid = document.getElementById("ddlFlight").value
    if(flightid == 0){
        document.getElementById("btnUpdate").disabled = true;
        document.getElementById("btnDelete").disabled = true;
    }
    else{
        document.getElementById("btnUpdate").disabled = false;
        document.getElementById("btnDelete").disabled = false;
    }
}

function data (){
    return data = {
        flightid: parseInt(document.getElementById("ddlFlight").value),
        routeid: parseInt(document.getElementById("ddlRoute").value),
        status: document.getElementById("txtStatus").value,
        arrivaldate: document.getElementById("txtArrival").value,
        exitdate: document.getElementById("txtExit").value,
        timeboarding: document.getElementById("txtTime").value + ":00"
    }
}

init();
