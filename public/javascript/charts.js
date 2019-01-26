var highchrt = document.getElementById('highcanvas').getContext('2d');
var openchrt = document.getElementById('opencanvas').getContext('2d');
var lowchrt = document.getElementById('lowcanvas').getContext('2d');
var closechrt = document.getElementById('closecanvas').getContext('2d');
var volumechrt = document.getElementById('volumecanvas').getContext('2d');
var capchrt = document.getElementById('capcanvas').getContext('2d');

var dates= [];
var highs= [];
var opens= [];
var lows= [];
var closes =[];
var volumes =[];
var caps =[];
<% data.dates.forEach(function(index){%>
  dates.push('<%=index.date.getDate()%>');
  highs.push('<%= index.high%>');
  opens.push('<%= index.open%>');
  lows.push('<%= index.low%>');
  closes.push('<%= index.close%>');
  volumes.push('<%= index.volume%>');
  caps.push('<%= index.marketcap%>');

  <%}) ;%>

  var HighCanvas = new Chart(highchrt,{
      type: 'line',
      data: {
      labels: dates,
      datasets: [{
          label: 'High',
          data: highs,
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
    },
      options: {
          scales: {
              yAxes: [{
                  stacked: true
              }]
          }
      }
  });



  var OpenCanvas = new Chart(openchrt,{
      type: 'line',
      data: {
      labels: dates,
      datasets: [{
          label: 'Open',
          data: opens,
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
    },
      options: {
          scales: {
              yAxes: [{
                  stacked: true
              }]
          }
      }
  });
  var LowCanvas = new Chart(lowchrt,{
      type: 'line',
      data: {
      labels: dates,
      datasets: [{
          label: 'Low',
          data: lows,
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
    },
      options: {
          scales: {
              yAxes: [{
                  stacked: true
              }]
          }
      }
  });
  var CloseCanvas = new Chart(closechrt,{
      type: 'line',
      data: {
      labels: dates,
      datasets: [{
          label: 'Close',
          data: closes,
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
    },
      options: {
          scales: {
              yAxes: [{
                  stacked: true
              }]
          }
      }
  });
  var VolumeCanvas = new Chart(volumechrt,{
      type: 'line',
      data: {
      labels: dates,
      datasets: [{
          label: 'Volume',
          data: volumes,
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
    },
      options: {
          scales: {
              yAxes: [{
                  stacked: true
              }]
          }
      }
  });
  var CapCanvas = new Chart(capchrt,{
      type: 'line',
      data: {
      labels: dates,
      datasets: [{
          label: 'Market Cap',
          data: caps,
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
    },
      options: {
          scales: {
              yAxes: [{
                  stacked: true
              }]
          }
      }
  });
        