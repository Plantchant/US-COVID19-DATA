import 'sorttable.js';
import 'index.js';

var request = new XMLHttpRequest();
var fetchData;

request.open('GET', 'https://api.apify.com/v2/acts/rcRx9HudInNmsDbxY/runs/last/dataset/items?token=pZYb9WaePXfisRpno7uW5WZdM');

request.setRequestHeader('Content-Type', 'application/json');

request.onreadystatechange = function() {
  if (this.readyState === 4) {
    var parsed = JSON.parse(this.responseText);
    fetchData = parsed[0].regionData;
  }
};

request.send(JSON.stringify({}));

function checkVariable() {

  if (fetchData) {
    $(document).ready(function() {
      var tr;
      for (var i = 0; i < fetchData.length; i++) {
        if (fetchData[i].state != "USA Total") {
				  tr = $('<tr/>');
          tr.append("<td>" + fetchData[i].state + "</td>");
          if (fetchData[i].prop == 0) {
            tr.append("<td>" + "Not Reported" + "</td>");
          } else {
            tr.append("<td>" + (fetchData[i].prop * 1000).toFixed(6) + "</td>");
          }
          if (fetchData[i].newCases == 0) {
            tr.append("<td>" + "Not Reported" + "</td>");
          } else {
            tr.append("<td>" + fetchData[i].newCases + "</td>");
          }
          tr.append("<td>" + fetchData[i].population + "</td>");
          $('tbody').append(tr);
        }
      }
    });
  }
}

function sortVariable() {

  if (document.getElementsByTagName("tr").length > 50) {
    var myTH = document.getElementsByTagName("th")[1];
    sorttable.innerSortFunction.apply(myTH);
    sorttable.innerSortFunction.apply(myTH);
    console.log('done');
  }
}

setTimeout(checkVariable, 1000);
setTimeout(sortVariable, 2500);

checkVariable();
sortVariable();
