var transport_mode;
var stations = ['Mumbai','Bangalore','Chennai','Delhi'];
var availability_from,availability_to;

function clicked_div(id) {
    sessionStorage.setItem("transport_mode",JSON.stringify(id));
    window.location.href = "search";
}

function check_availability() {
    var from = document.getElementById('station-from').value;
    var to = document.getElementById('station-to').value;
    sessionStorage.setItem("availability_from",JSON.stringify(from));
    sessionStorage.setItem("availability_to",JSON.stringify(to));
    window.location.href = "availability";
}

function get_mode() {
    transport_mode = JSON.parse(sessionStorage.getItem("transport_mode"));
    if(transport_mode == 'train')
    {
        document.getElementById('transport_mode').innerHTML ="TRAIN SCHEDULE AND FARE";
    }
    else if(transport_mode == 'bus')
    {
        document.getElementById('transport_mode').innerHTML ="BUS SCHEDULE AND FARE";
    }
    else if(transport_mode=='metro')
    {
        document.getElementById('transport_mode').innerHTML ="METRO SCHEDULE AND FARE";
    }
}

function get_options() {
    for(let i=0;i<stations.length;i++)
    {
        document.getElementById('station-from').innerHTML += "<option value=" +stations[i]+">"+stations[i]+"</option>";
        document.getElementById('station-to').innerHTML += "<option value=" +stations[i]+">"+stations[i]+"</option>";
    }
}

function set_options() {
    availability_from = JSON.parse(sessionStorage.getItem("availability_from"));
    availability_to = JSON.parse(sessionStorage.getItem("availability_to"));
    console.log('from:'+availability_from);
    console.log('to:'+availability_to);

    document.getElementById('station-from').innerHTML += "<option value=" +availability_from+" disabled selected >"+availability_from+" </option>";
    document.getElementById('station-to').innerHTML += "<option value=" +availability_to+" disabled selected >"+availability_to+"</option>";
}

