// Send and get request
function showStations() {  
  var dburl = "https://my-json-server.typicode.com/phypscher/dpdhl-api/Packstations/";

  request = new XMLHttpRequest;
  request.open('GET', dburl, true);

  request.send();
  request.addEventListener("loadend", function() {
    answer = JSON.parse(request.responseText);
    document.getElementById("output").innerHTML = request.responseText;
    showLines(answer);
  });
  
};

// Show lines of table
function showLines(arr) {
  var out = "<table> <tr> <th>ID</th> <th>XL Postfach</th><th>Street</th> <th>Street No</th> <th>ZIP Code</th><th>District</th><th>City</th><th>Distance</th><th>Remark</th></tr>";
  var i;
  for(i = 0; i < arr.length; i++) {
    out += "<tr>";
    out += "<td>" + arr[i]._packstationId + "</td>";
    out += "<td>" + arr[i].hasXLPostfach + "</td>";
    out += "<td>" + arr[i].address.street + "</td>";
    out += "<td>" + arr[i].address.streetNo + "</td>";
    out += "<td>" + arr[i].address.zip + "</td>";
    out += "<td>" + arr[i].address.district + "</td>";
    out += "<td>" + arr[i].address.city + "</td>";
    out += "<td>" + arr[i].distance + "m</td>";    
    out += "<td>" + arr[i].address.remark + "</td>";    
    out += "</tr>";
    }
  out += "</table>";
  
  document.getElementById("output").innerHTML = out;
  
  createMap(arr);
}

// Create a Google Map
function createMap(locations) {
  var map = new google.maps.Map(document.getElementById('map'), { center: {lat: parseFloat(locations[0].location.latitude), lng: parseFloat(locations[0].location.longitude)}, zoom: 15 });
  
  var marker, count;

  for (count = 0; count < locations.length; count++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[count].location.latitude, locations[count].location.longitude),
      map: map,
      title: locations[count]._packstationId
    });
  }
}

// Clean canvas
function clean() {
  document.getElementById("output").innerHTML = "";
  document.getElementById("map").innerHTML = "";
}

