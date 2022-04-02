var transport_mode;
var stations = ['Mumbai','Bangalore','Chennai','Delhi'];
var availability_from,availability_to;

availablities={ 
    "train":
    {
        "Mumbai":{
            'Mumbai': null,
            'Bangalore': [['02811','12:15 AM','10:27 AM',2],['02858','08:15 PM','06:32 AM',1],['02101','06:00 AM','05:18 AM',1],['06209','10:05 PM','11:10 PM',4]],
            'Chennai': [['02811','12:15 AM','10:27 AM',2],['02858','08:15 PM','06:32 AM',1],['02101','06:00 AM','05:18 AM',1],['06209','10:05 PM','11:10 PM',4]],
            'Delhi': [['02811','12:15 AM','10:27 AM',2],['02858','08:15 PM','06:32 AM',1],['02101','06:00 AM','05:18 AM',1],['06209','10:05 PM','11:10 PM',4]]
        },
        "Bangalore":{
            'Mumbai': [['02811','12:15 AM','10:27 AM',2],['02858','08:15 PM','06:32 AM',1],['02101','06:00 AM','05:18 AM',1],['06209','10:05 PM','11:10 PM',4]],
            'Bangalore': null,
            'Chennai': [['02811','12:15 AM','10:27 AM',2],['02858','08:15 PM','06:32 AM',1],['02101','06:00 AM','05:18 AM',1],['06209','10:05 PM','11:10 PM',4]],
            'Delhi': [['02811','12:15 AM','10:27 AM',2],['02858','08:15 PM','06:32 AM',1],['02101','06:00 AM','05:18 AM',1],['06209','10:05 PM','11:10 PM',4]]
        },
        "Chennai":{
            'Bangalore': [['02811','12:15 AM','10:27 AM',2],['02858','08:15 PM','06:32 AM',1],['02101','06:00 AM','05:18 AM',1],['06209','10:05 PM','11:10 PM',4]],
            'Mumbai': [['02811','12:15 AM','10:27 AM',2],['02858','08:15 PM','06:32 AM',1],['02101','06:00 AM','05:18 AM',1],['06209','10:05 PM','11:10 PM',4]],
            'Chennai': null,
            'Delhi': [['02811','12:15 AM','10:27 AM',2],['02858','08:15 PM','06:32 AM',1],['02101','06:00 AM','05:18 AM',1],['06209','10:05 PM','11:10 PM',4]],
        },
        "Delhi":{
            'Bangalore': [['02811','12:15 AM','10:27 AM',2],['02858','08:15 PM','06:32 AM',1],['02101','06:00 AM','05:18 AM',1],['06209','10:05 PM','11:10 PM',4]],
            'Chennai': [['02811','12:15 AM','10:27 AM',2],['02858','08:15 PM','06:32 AM',1],['02101','06:00 AM','05:18 AM',1],['06209','10:05 PM','11:10 PM',4]],
            'Mumbai': [['02811','12:15 AM','10:27 AM',2],['02858','08:15 PM','06:32 AM',1],['02101','06:00 AM','05:18 AM',1],['06209','10:05 PM','11:10 PM',4]],
            'Delhi': null
        }
    },
    "bus":
    {
        "Mumbai":{
            'Mumbai': null,
            'Bangalore': [['02811','12:15 AM','10:27 AM',2],['02858','08:15 PM','06:32 AM',1],['02101','06:00 AM','05:18 AM',1],['06209','10:05 PM','11:10 PM',4]],
            'Chennai': [['02811','12:15 AM','10:27 AM',2],['02858','08:15 PM','06:32 AM',1],['02101','06:00 AM','05:18 AM',1],['06209','10:05 PM','11:10 PM',4]],
            'Delhi': [['02811','12:15 AM','10:27 AM',2],['02858','08:15 PM','06:32 AM',1],['02101','06:00 AM','05:18 AM',1],['06209','10:05 PM','11:10 PM',4]]
        },
        "Bangalore":{
            'Mumbai': [['02811','12:15 AM','10:27 AM',2],['02858','08:15 PM','06:32 AM',1],['02101','06:00 AM','05:18 AM',1],['06209','10:05 PM','11:10 PM',4]],
            'Bangalore': null,
            'Chennai': [['02811','12:15 AM','10:27 AM',2],['02858','08:15 PM','06:32 AM',1],['02101','06:00 AM','05:18 AM',1],['06209','10:05 PM','11:10 PM',4]],
            'Delhi': [['02811','12:15 AM','10:27 AM',2],['02858','08:15 PM','06:32 AM',1],['02101','06:00 AM','05:18 AM',1],['06209','10:05 PM','11:10 PM',4]]
        },
        "Chennai":{
            'Bangalore': [['02811','12:15 AM','10:27 AM',2],['02858','08:15 PM','06:32 AM',1],['02101','06:00 AM','05:18 AM',1],['06209','10:05 PM','11:10 PM',4]],
            'Mumbai': [['02811','12:15 AM','10:27 AM',2],['02858','08:15 PM','06:32 AM',1],['02101','06:00 AM','05:18 AM',1],['06209','10:05 PM','11:10 PM',4]],
            'Chennai': null,
            'Delhi': [['02811','12:15 AM','10:27 AM',2],['02858','08:15 PM','06:32 AM',1],['02101','06:00 AM','05:18 AM',1],['06209','10:05 PM','11:10 PM',4]],
        },
        "Delhi":{
            'Bangalore': [['02811','12:15 AM','10:27 AM',2],['02858','08:15 PM','06:32 AM',1],['02101','06:00 AM','05:18 AM',1],['06209','10:05 PM','11:10 PM',4]],
            'Chennai': [['02811','12:15 AM','10:27 AM',2],['02858','08:15 PM','06:32 AM',1],['02101','06:00 AM','05:18 AM',1],['06209','10:05 PM','11:10 PM',4]],
            'Mumbai': [['02811','12:15 AM','10:27 AM',2],['02858','08:15 PM','06:32 AM',1],['02101','06:00 AM','05:18 AM',1],['06209','10:05 PM','11:10 PM',4]],
            'Delhi': null
        }
    },
    "metro":
    {
        "Mumbai":{
            'Mumbai': null,
            'Bangalore': [['02811','12:15 AM','10:27 AM',2],['02858','08:15 PM','06:32 AM',1],['02101','06:00 AM','05:18 AM',1],['06209','10:05 PM','11:10 PM',4]],
            'Chennai': [['02811','12:15 AM','10:27 AM',2],['02858','08:15 PM','06:32 AM',1],['02101','06:00 AM','05:18 AM',1],['06209','10:05 PM','11:10 PM',4]],
            'Delhi': [['02811','12:15 AM','10:27 AM',2],['02858','08:15 PM','06:32 AM',1],['02101','06:00 AM','05:18 AM',1],['06209','10:05 PM','11:10 PM',4]]
        },
        "Bangalore":{
            'Mumbai': [['02811','12:15 AM','10:27 AM',2],['02858','08:15 PM','06:32 AM',1],['02101','06:00 AM','05:18 AM',1],['06209','10:05 PM','11:10 PM',4]],
            'Bangalore': null,
            'Chennai': [['02811','12:15 AM','10:27 AM',2],['02858','08:15 PM','06:32 AM',1],['02101','06:00 AM','05:18 AM',1],['06209','10:05 PM','11:10 PM',4]],
            'Delhi': [['02811','12:15 AM','10:27 AM',2],['02858','08:15 PM','06:32 AM',1],['02101','06:00 AM','05:18 AM',1],['06209','10:05 PM','11:10 PM',4]]
        },
        "Chennai":{
            'Bangalore': [['02811','12:15 AM','10:27 AM',2],['02858','08:15 PM','06:32 AM',1],['02101','06:00 AM','05:18 AM',1],['06209','10:05 PM','11:10 PM',4]],
            'Mumbai': [['02811','12:15 AM','10:27 AM',2],['02858','08:15 PM','06:32 AM',1],['02101','06:00 AM','05:18 AM',1],['06209','10:05 PM','11:10 PM',4]],
            'Chennai': null,
            'Delhi': [['02811','12:15 AM','10:27 AM',2],['02858','08:15 PM','06:32 AM',1],['02101','06:00 AM','05:18 AM',1],['06209','10:05 PM','11:10 PM',4]],
        },
        "Delhi":{
            'Bangalore': [['02811','12:15 AM','10:27 AM',2],['02858','08:15 PM','06:32 AM',1],['02101','06:00 AM','05:18 AM',1],['06209','10:05 PM','11:10 PM',4]],
            'Chennai': [['02811','12:15 AM','10:27 AM',2],['02858','08:15 PM','06:32 AM',1],['02101','06:00 AM','05:18 AM',1],['06209','10:05 PM','11:10 PM',4]],
            'Mumbai': [['02811','12:15 AM','10:27 AM',2],['02858','08:15 PM','06:32 AM',1],['02101','06:00 AM','05:18 AM',1],['06209','10:05 PM','11:10 PM',4]],
            'Delhi': null
        }
    }
}


function go_home() {
    window.location.href = "home";
}

function clicked_div(id) {
    sessionStorage.setItem("transport_mode",JSON.stringify(id));
    window.location.href = "search";
}

function check_availability() {
    var from = document.getElementById('station-from').value;
    var to = document.getElementById('station-to').value;

    if(from=='' || to=='')
    {
        alert('Please select source and destination!');
        return;
    }

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

function get_mode_availability() {
    transport_mode = JSON.parse(sessionStorage.getItem("transport_mode"));
    if(transport_mode == 'train')
    {
        document.getElementById('transport_mode').innerHTML ="TRAIN AVAILABILITY";
    }
    else if(transport_mode == 'bus')
    {
        document.getElementById('transport_mode').innerHTML ="BUS AVAILABILITY";
    }
    else if(transport_mode=='metro')
    {
        document.getElementById('transport_mode').innerHTML ="METRO AVAILABILITY";
    }
}

function get_mode_fares() {
    transport_mode = JSON.parse(sessionStorage.getItem("transport_mode"));
    if(transport_mode == 'train')
    {
        document.getElementById('transport_mode').innerHTML ="TRAIN ROUTE FARES";
    }
    else if(transport_mode == 'bus')
    {
        document.getElementById('transport_mode').innerHTML ="BUS ROUTE FARES";
    }
    else if(transport_mode=='metro')
    {
        document.getElementById('transport_mode').innerHTML ="METRO ROUTE FARES";
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

    document.getElementById('station-from').innerHTML += "<option value=" +availability_from+" disabled selected hidden>"+availability_from+" </option>";
    document.getElementById('station-to').innerHTML += "<option value=" +availability_to+" disabled selected hidden>"+availability_to+"</option>";

    list = availablities[transport_mode][availability_from][availability_to];
    if(list==null)
    {
        document.getElementById("results").innerHTML = "Source and Destination stations cannot be same!";
        return;
    }

    for(let i=0;i<list.length;i++)
    {
        document.getElementById('content').innerHTML+=`
        <table id="availability-table">
        <tr>
            <th>${transport_mode.toUpperCase()} No.</th>
            <th>Deprature Time</th>
            <th>Arrival Time</th>
            <th>Platform No.</th>
        </tr>
        <tr>
            <td>${list[i][0]}</td>
            <td>${list[i][1]}</td>
            <td>${list[i][2]}</td>
            <td>${list[i][3]}</td>
        </tr>
        </table> <br> <br>
        `
    }  
    
    document.getElementById('content').innerHTML+=`<div id="home" onclick="go_home();" style="
        background-color: #abc2c7;
        width: 45%;
        margin: 10px;
        text-align: center;
        line-height: 75px;
        font-size: 35px;
        display: inline-block;
        padding: 5px;
        "> Home </div>`;
}


var fare_from, fare_to, check_from, check_to;

function check_fromto() {
    var from = document.getElementById('station-from').value;
    var to = document.getElementById('station-to').value;
    // console.log(from)
    sessionStorage.setItem("fare_from", JSON.stringify(from));
    sessionStorage.setItem("fare_to", JSON.stringify(to));
    if(from !=to)
    {
        window.location.href = "fares";
    }
    else alert('Source and Destination must be different!')
}

function load_fares()
{   
    transport_mode = JSON.parse(sessionStorage.getItem("transport_mode"));
    check_from = JSON.parse(sessionStorage.getItem("fare_from"));
    check_to = JSON.parse(sessionStorage.getItem("fare_to"));
    console.log(check_from)
    console.log(check_to)

    document.getElementById('station-from-fares').innerHTML+=`
    <option value="${check_from}" selected disabled hidden>${check_from}</option>
    `
    document.getElementById('station-to-fares').innerHTML+=`
    <option value="${check_to}" selected disabled hidden>${check_to}</option>
    `
    fares={
        "train":
        {
            "Mumbai":{
                'Bangalore': [10,100,500],
                'Chennai': [20,100,500],
                'Delhi': [10,100,500]
            },
            "Bangalore":{
                'Mumbai': [10,100,500],
                'Chennai': [10,100,500],
                'Delhi': [10,100,500]
            },
            "Chennai":{
                'Bangalore': [10,100,500],
                'Mumbai': [10,100,500],
                'Delhi': [10,100,500]
            },
            "Delhi":{
                'Bangalore': [10,100,500],
                'Chennai': [10,100,500],
                'Mumbai': [10,100,500]
            }
        },
        "bus":
        {
            "Mumbai":{
                'Bangalore': [10,100,500],
                'Chennai': [20,100,500],
                'Delhi': [10,100,500]
            },
            "Bangalore":{
                'Mumbai': [10,100,500],
                'Chennai': [10,100,500],
                'Delhi': [10,100,500]
            },
            "Chennai":{
                'Bangalore': [10,100,500],
                'Mumbai': [10,100,500],
                'Delhi': [10,100,500]
            },
            "Delhi":{
                'Bangalore': [10,100,500],
                'Chennai': [10,100,500],
                'Mumbai': [10,100,500]
            }
        },
        "metro":
        {
            "Mumbai":{
                'Bangalore': [10,100,500],
                'Chennai': [20,100,500],
                'Delhi': [10,100,500]
            },
            "Bangalore":{
                'Mumbai': [10,100,500],
                'Chennai': [10,100,500],
                'Delhi': [10,100,500]
            },
            "Chennai":{
                'Bangalore': [10,100,500],
                'Mumbai': [10,100,500],
                'Delhi': [10,100,500]
            },
            "Delhi":{
                'Bangalore': [10,100,500],
                'Chennai': [10,100,500],
                'Mumbai': [10,100,500]
            }
        }
    }
    price=fares[transport_mode][check_from][check_to];
    document.getElementById('content').innerHTML+=`
    <br>
    <div class='message'>
    Following Table shows the fares in INR for 1st, 2nd and AC classes
    </div>
    <br><br>
    <table id="fare-table">
    <tr>
        <th>II Class</th>
        <th>I Class</th>
        <th>AC</th>
    </tr>
    <tr>
        <td>${price[0]}</td>
        <td>${price[1]}</td>
        <td>${price[2]}</td>
    </tr>   
    </table>
    `

    document.getElementById('content').innerHTML+=`<div id="home" onclick="go_home();" style="
        background-color: #abc2c7;
        width: 45%;
        margin: 60px;
        text-align: center;
        line-height: 75px;
        font-size: 35px;
        display: inline-block;
        padding: 5px;
        "> Home </div>`;
}