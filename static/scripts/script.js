var transport_mode;
var train_stations = ['Mumbai','Bangalore','Chennai','Delhi'];
var metro_stations = ['Churchgate','Dadar','Andheri','Borivali'];
var bus_stations = ['Mumbai','Pune','Nashik','Nagpur'];
var availability_from,availability_to;
var fare_from, fare_to, check_from, check_to;

availablities={ 
    "train":
    {
        "Mumbai":{
            'Mumbai': null,
            'Bangalore': [['11301','08:10 AM','7:50 AM',1],['11013','11:35 PM','09:05 AM',2],['82654','03:55 PM','05:45 PM',1],['16613','05:50 PM','01:00 PM',4]],
            'Chennai': [['95327','06:25 PM','04:20 PM',2],['22159','12:45 PM','10:50 AM',2],['12163','10:55 AM','10:15 AM',3],['22157','06:45 PM','04:20 PM',4]],
            'Delhi': [['22221','04:00 PM','09:55 AM',1],['12137','07:35 PM','09:25 PM',2],['12471','11:00 AM','05:30 AM',2],['12903','06:45 PM','01:50 PM',4]]
        },
        "Bangalore":{
            'Mumbai': [['11014','4:00 PM','01:45 PM',2],['11302','08:40 PM','07:42 PM',3],['16587','11:30 AM','12:17 PM',1],['16508','10:45 PM','09:27 PM',4]],
            'Bangalore': null,
            'Chennai': [['12568','10:40 PM','04:15 AM',2],['12028','06:00 AM','11:00 AM',2],['12008','04:15 PM','09:30 PM',1],['16002','11:50 PM','06:45 AM',3]],
            'Delhi': [['22691','08:00 PM','05:30 AM',1],['12627','07:20 PM','09:00 AM',4],['12649','12:45 PM','08:12 AM',1],['12213','11:40 PM','07:35 AM',2]]
        },
        "Chennai":{
            'Bangalore': [['02577','11:20 AM','06:30 PM',1],['02607','03:30 PM','09:35 AM',4],['02657','11:00 PM','04:40 AM',1],['04133','11:55 AM','06:30 PM',1]],
            'Mumbai': [['12164','03:50 PM','04:00 PM',1],['11074','06:45 AM','06:00 AM',3],['22919','08:30 PM','09:15 PM',2],['06051','08:10 PM','09:15 PM',1]],
            'Chennai': null,
            'Delhi': [['02615','06:50 PM','06:35 AM',2],['02269','06:40 AM','10:40 AM',1],['02433','06:05 AM','10:30 AM',1],['06101','05:00 PM','07:03 AM',4]],
        },
        "Delhi":{
            'Bangalore': [['06528','08:20 PM','12:50 PM',4],['02692','07:50 PM','05:20 AM',2],['02630','08:30 AM','06:10 AM',1],['06524','08:45 PM','06:20 AM',3]],
            'Chennai': [['02616','04:10 PM','04:30 AM',3],['06102','12:40 PM','03:05 AM',2],['02434','03:35 PM','08:45 PM',2],['02270','03:55 PM','08:45 PM',4]],
            'Mumbai': [['09020','06:55 PM','10:05 PM',3],['09018','11:55 PM','10:00 PM',1],['04418','09:35 PM','05:47 PM',3],['02952','05:00 PM','08:40 AM',1]],
            'Delhi': null
        }
    },
    "bus":
    {
        "Mumbai":{
            'Mumbai': null,
            'Pune': [['Parel','12:15 AM','Ordinary'],['Dadar','08:00 AM','AC'],['Mumbai Central','11:30 AM','Semi Luxury'],['Parel','03:00 PM','Semi Luxury']],
            'Nashik': [['Parel','12:15 AM','Ordinary'],['Borivali','09:30 AM','AC'],['Mumbai Central','03:30 PM','Semi Luxury'],['Mumbai Central','11:15 PM','Semi Luxury']],
            'Nagpur': [['Mumbai Central','01:00 AM','Ordinary'],['Parel','07:30 AM','Ordinary']]
        },
        "Pune":{
            'Mumbai': [['Borgaon','05:00 AM','Ordinary'],['Swargate','09:00 AM','Semi Luxury'],['Narayangaon','02:00 AM','Ordinary'],['Swargate','10:00 PM','AC']],
            'Pune': null,
            'Nashik': [['Shivaji Nagar','12:30 AM','AC'],['Saswad','07:30 AM','Ordinary'],['Shivaji Nagar','04:15 PM','Ordianry'],['Shivaji Nagar','11:30 PM','AC']],
            'Nagpur': [['Swargate','05:00 AM','Ordinary'],['Swargate','09:00 AM','Ordinary'],['Shivaji Nagar','04:00 PM','Semi Luxury'],['Shivaji Nagar','06:00 PM','AC']]
        },
        "Nashik":{
            'Mumbai': [['Tasgaon','06:30 AM','Ordinary'],['Shirdi','07:00 AM','Semi Luxury'],['Patan','09:00 AM','Semi Luxury'],['Kopargaon','08:30 PM','AC']],
            'Pune': [['Mela Stand','12:30 AM','AC'],['Nashik CBS','06:30 AM','Ordinary'],['Nashik CBS','12:15 PM','Ordianry'],['Mela Stand','04:30 PM','AC']],
            'Nashik': null,
            'Nagpur': [['Nashick CBS','07:00 PM','Ordinary']]
        },
        "Nagpur":{
            'Mumbai': [['Gherdi','07:15 AM','Ordinary'],['Radhangari','08:00 AM','Ordinary'],['Devli','11:15 AM','Ordinary'],['Vijaydurg','03:00 PM','Semi Luxury']],
            'Pune': [['Sangola','07:00 AM','Ordinary'],['Nagpur','01:00 PM','Semi Luxury'],['Nagpur','04:00 PM','Semi Luxury'],['Sangola','05:00 PM','Ordinary']],
            'Nashik': [['Nagpur','07:00 PM','Ordinary']],
            'Nagpur': null
        }
    },
    "metro":
    {
        "Churchgate":{
            'Churchgate': null,
            'Dadar': [['Slow','04:27 PM','1/2'],['Slow','04:33 PM','1/2'],['Slow','04:36 PM','1/2'],['Fast','04:42 PM','3/4'],['Fast','04:55 PM','3/4']],
            'Andheri': [['Slow','04:39 PM','1/2'],['Fast','04:42 PM','3/4'],['Slow','04:45 PM','1/2'],['Slow','04:52 PM','1/2'],['Fast','04:55 PM','3/4']],
            'Borivali': [['Slow','04:33 PM','1/2'],['Slow','04:36 PM','1/2'],['Fast','04:42 PM','3/4']]
        },
        "Dadar":{
            'Churchgate': [['Slow','04:34 PM','2'],['Slow','04:40 PM','2'],['Slow','04:43 PM','2'],['Fast','04:44 PM','4']],
            'Dadar': null,
            'Andheri': [['Fast','04:34 PM','3'],['Slow','04:38 PM','1'],['Slow','04:42 PM','1'],['Fast','04:47 PM','1/2']],
            'Borivali': [['Slow','04:38 PM','1'],['Slow','04:42 PM','1'],['Fast','04:47 PM','1/2'],['Slow','04:48 PM','1'],['Fast','04:52 PM','5']],
        },
        "Andheri":{
            'Churchgate': [['Slow','04:40 PM','5'],['Slow','04:43 PM','2'],['Slow','04:49 PM','5'],['Slow','04:52 PM','5'],['Slow','04:55 PM','5']],
            'Dadar': [['Slow','04:40 PM','5'],['Slow','04:43 PM','2'],['Slow','04:49 PM','5'],['Slow','04:52 PM','5'],['Slow','04:55 PM','5']],
            'Andheri': null,
            'Borivali': [['Slow','04:41 PM','3'],['Slow','04:41 PM','3'],['Slow','04:44 PM','3'],['Slow','04:47 PM','3'],['Fast','04:48 PM','6']],
        },
        "Borivali":{
            'Churchgate': [['Slow','04:42 PM','1'],['Fast','04:43 PM','5'],['Slow','04:50 PM','1'],['Slow','04:53 PM','4']],
            'Dadar': [['Slow','04:42 PM','1'],['Fast','04:43 PM','5'],['Slow','04:50 PM','1'],['Slow','04:53 PM','4']],
            'Andheri': [['Fast','04:43 PM','5'],['Slow','04:47 PM','5'],['Slow','04:50 PM','1'],['Slow','04:53 PM','4'],['Fast','05:05 PM','7']],
            'Borivali': null
        }
    }
}

fares={
    "train":
    {
        "Mumbai":{
            'Mumbai': null,
            'Bangalore': [505,1935,3375],
            'Chennai': [550,1475,2130],
            'Delhi': [585,2260,3865]
        },
        "Bangalore":{
            'Mumbai': [505,1935,3375],
            'Bangalore': null,
            'Chennai': [235,880,1665],
            'Delhi': [840,3165,5815]
        },
        "Chennai":{
            'Bangalore': [235,880,1665],
            'Mumbai': [550,1475,2130],
            'Chennai': null,
            'Delhi': [820,3100,5285]
        },
        "Delhi":{
            'Bangalore': [840,3165,5815],
            'Chennai': [820,3100,5285],
            'Mumbai': [585,2260,3865],
            'Delhi': null
        }
    },
    "bus":
    {
        "Mumbai":{
            'Mumbai': null,
            'Pune': [400],
            'Nashik': [320],
            'Nagpur': [1300]
        },
        "Pune":{
            'Mumbai': [400],
            'Pune': null,
            'Nashik': [275],
            'Nagpur': [1380]
        },
        "Nashik":{
            'Mumbai': [320],
            'Pune': [275],
            'Nashik': null,
            'Nagpur': [850]
        },
        "Nagpur":{
            'Mumbai': [1300],
            'Pune': [1380],
            'Nashik': [850],
            'Nagpur': null
        }
    },
    "metro":
    {
        "Churchgate":{
            'Churchgate' :null,
            'Dadar': [10, 70, 130, 490],
            'Andheri': [10,105,215, 670],
            'Borivali': [15,140,215,755]
        },
        "Dadar":{
            'Dadar': null,
            'Churchgate': [10, 70, 130, 490],
            'Andheri': [10,70,130, 490],
            'Borivali': [10,105,215, 660]
        },
        "Andheri":{
            'Andheri':null,
            'Dadar': [10,70,130, 490],
            'Churchgate': [10,105,215, 670],
            'Borivali': [10,70,190, 470]
        },
        "Borivali":{
            'Borivali':null,
            'Dadar': [10,105,215, 660],
            'Andheri': [10,70,190, 470],
            'Churchgate': [15,140,215,755]
        }
    }
}


function go_home() {
    window.location.href = "home";
    sessionStorage.removeItem("transport_mode");
    sessionStorage.removeItem("availability_from");
    sessionStorage.removeItem("availability_to");
    sessionStorage.removeItem("fare_from");
    sessionStorage.removeItem("fare_to");
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
        document.getElementById('transport_mode').innerHTML ="EXPRESS TRAIN SCHEDULE AND FARE";
    }
    else if(transport_mode == 'bus')
    {
        document.getElementById('transport_mode').innerHTML ="MSRTC BUS SCHEDULE AND FARE";
    }
    else if(transport_mode=='metro')
    {
        document.getElementById('transport_mode').innerHTML ="LOCAL TRAIN SCHEDULE AND FARE";
    }
}

function get_mode_availability() {
    transport_mode = JSON.parse(sessionStorage.getItem("transport_mode"));
    if(transport_mode == 'train')
    {
        document.getElementById('transport_mode').innerHTML ="EXPRESS TRAIN AVAILABILITY";
    }
    else if(transport_mode == 'bus')
    {
        document.getElementById('transport_mode').innerHTML ="MSRTC BUS AVAILABILITY";
    }
    else if(transport_mode=='metro')
    {
        document.getElementById('transport_mode').innerHTML ="LOCAL TRAIN AVAILABILITY";
    }
}

function get_mode_fares() {
    transport_mode = JSON.parse(sessionStorage.getItem("transport_mode"));
    if(transport_mode == 'train')
    {
        document.getElementById('transport_mode').innerHTML ="EXPRESS TRAIN ROUTE FARES";
    }
    else if(transport_mode == 'bus')
    {
        document.getElementById('transport_mode').innerHTML ="MSRTC BUS ROUTE FARES";
    }
    else if(transport_mode=='metro')
    {
        document.getElementById('transport_mode').innerHTML ="LOCAL TRAIN ROUTE FARES";
    }
}

function get_options() {

    if(transport_mode == 'train')
    {
        for(let i=0;i<train_stations.length;i++)
        {
            document.getElementById('station-from').innerHTML += "<option value=" +train_stations[i]+">"+train_stations[i]+"</option>";
            document.getElementById('station-to').innerHTML += "<option value=" +train_stations[i]+">"+train_stations[i]+"</option>";
        }
    }
    else if(transport_mode=='bus')
    {
        for(let i=0;i<bus_stations.length;i++)
        {
            document.getElementById('station-from').innerHTML += "<option value=" +bus_stations[i]+">"+bus_stations[i]+"</option>";
            document.getElementById('station-to').innerHTML += "<option value=" +bus_stations[i]+">"+bus_stations[i]+"</option>";
        }
    }
    else if(transport_mode=='metro')
    {
        for(let i=0;i<metro_stations.length;i++)
        {
            document.getElementById('station-from').innerHTML += "<option value=" +metro_stations[i]+">"+metro_stations[i]+"</option>";
            document.getElementById('station-to').innerHTML += "<option value=" +metro_stations[i]+">"+metro_stations[i]+"</option>";
        }
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
        return;
    }


    if(transport_mode=='train')
    {
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
    }
    else if(transport_mode=='bus')
    {
        for(let i=0;i<list.length;i++)
        {
            document.getElementById('content').innerHTML+=`
            <table id="availability-table">
            <tr>
                <th>${transport_mode.toUpperCase()} station</th>
                <th>Deprature Time</th>
                <th>Type</th>
            </tr>
            <tr>
                <td>${list[i][0]}</td>
                <td>${list[i][1]}</td>
                <td>${list[i][2]}</td>
            </tr>
            </table> <br> <br>
            `
        }
    }
    else if (transport_mode=='metro')
    {
        for(let i=0;i<list.length;i++)
        {
            document.getElementById('content').innerHTML+=`
            <table id="availability-table">
            <tr>
                <th>Fast/Slow</th>
                <th>Departure Time</th>
                <th>Platform No.</th>
            </tr>
            <tr>
                <td>${list[i][0]}</td>
                <td>${list[i][1]}</td>
                <td>${list[i][2]}</td>
            </tr>
            </table> <br> <br>
            `
        }
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

function check_fromto() {
    var from = document.getElementById('station-from').value;
    var to = document.getElementById('station-to').value;
    // console.log(from)

    if(from=='' || to=='')
    {
        alert('Please select source and destination!');
        return;
    }

    sessionStorage.setItem("fare_from", JSON.stringify(from));
    sessionStorage.setItem("fare_to", JSON.stringify(to));
    window.location.href = "fares";
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

    price=fares[transport_mode][check_from][check_to];

    if(price==null)
    {
        document.getElementById("results").innerHTML = "Source and Destination stations cannot be same!";
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
        return;
    }

    if(transport_mode=='train')
    {
        document.getElementById('content').innerHTML+=`
        <br>
        <div class='message'>
        Following Table shows the fares in INR for Sleeper, 2nd AC and 1st AC classes
        </div>
        <br><br>
        <table id="fare-table">
        <tr>
            <th>Sleeper Class</th>
            <th>II-AC Class</th>
            <th>I-AC Class</th>
        </tr>
        <tr>
            <td>${price[0]}</td>
            <td>${price[1]}</td>
            <td>${price[2]}</td>
        </tr>   
        </table>
        `
    }
    else if(transport_mode=='bus')
    {
        document.getElementById('content').innerHTML+=`
        <br>
        <div class='message'>
        Following Table shows the fares in INR from the source to the destination station.
        </div>
        <br><br>
        <table id="fare-table">
        <tr>
            <th>Ticket Fare</th>
        </tr>
        <tr>
            <td>${price[0]}</td>
        </tr>   
        </table>
        `
    }
    else if(transport_mode=='metro')
    {
        document.getElementById('content').innerHTML+=`
        <br>
        <div class='message'>
        Following Table shows the fares in INR for one-way second class/first class and their monthly passes.
        </div>
        <br><br>
        <table id="fare-table">
        <tr>
            <th>One-way II Class</th>
            <th>One-way I Class</th>
            <th>Monthly II Class</th>
            <th>Monthly I Class</th>
        </tr>
        <tr>
            <td>${price[0]}</td>
            <td>${price[1]}</td>
            <td>${price[2]}</td>
            <td>${price[3]}</td>
        </tr>   
        </table>
        `
    }
    

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