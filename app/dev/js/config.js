var config = {
  // config here
  videoUrl: 'https://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4',
  textUrl: 'data.json',
  rules: [
    {
      tag: 'canvas',
      id: 'myChart',
      height: '200',
      width: '200'
    }
  ]
};
var pictor = new Pictor(config);

pictor.init();

$(document).on('pictorInit', function() {
  // project specific functions should here

  var data = {
    // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)'
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
  };
  var ctx = $("#myChart");

  var animated = false;
  var destroyed = false;
  var myDoughnutChart;

  pictor.myPlayer.on('timeupdate', function () {
    console.log(pictor.myPlayer.currentTime().toFixed(1));
    if (pictor.myPlayer.currentTime().toFixed(1) > 2 && pictor.myPlayer.currentTime().toFixed(1) < 2.5) {
      if (animated) return;
      myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
      });
      animated = true;
    }

    if (pictor.myPlayer.currentTime().toFixed(1) >= 2.5 && pictor.myPlayer.currentTime().toFixed(1) < 3) {
      if (destroyed) return;
      myDoughnutChart.destroy();
      destroyed = true;
    }

    if (pictor.myPlayer.currentTime() == 0) {
      animated = false;
      destroyed = false;
      myDoughnutChart.destroy();
    }
    
  });
});