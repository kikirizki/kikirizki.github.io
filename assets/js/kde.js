let dataSource = [93, 93, 96, 100, 101, 102, 102];
let xiData = [];
let range = 20,
  startPoint = 88;
for (i = 0; i < range; i++) {
  xiData[i] = startPoint + i;
}

let dataOrigine = [];
for (i = 0; i < dataSource.length; i++) {
  dataOrigine.push([dataSource[i], 0]);
}

let dataPoint = [];
for (i = 0; i < dataSource.length; i++) {
  dataPoint.push([dataSource[i], 0]);
}

let data = [];

function GaussKDE(xi, x) {
  return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(Math.pow(xi - x, 2) / -2);
}

let N = dataSource.length;
let kernelChart = [];
let kernel = [];
let animationTime = 4000;

//Create the density estimate
for (i = 0; i < xiData.length; i++) {
  let temp = 0;
  kernel.push([]);
  kernel[i].push(new Array(dataSource.length));
  for (j = 0; j < dataSource.length; j++) {
    temp = temp + GaussKDE(xiData[i], dataSource[j]);
    kernel[i][j] = GaussKDE(xiData[i], dataSource[j]);
  }
  data.push([xiData[i], (1 / N) * temp]);
}

//Create the kernels
for (i = 0; i < dataSource.length; i++) {
  kernelChart.push([]);
  kernelChart[i].push(new Array(kernel.length));
  for (j = 0; j < kernel.length; j++) {
    kernelChart[i].push([xiData[j], (1 / N) * kernel[j][i]]);
  }
}

Highcharts.chart("prob", {
  chart: {
    type: "spline",
    animation: true
  },
  title: {
    text: ""
  },
  credits:{
    enabled:false
  },
  yAxis: {
    visible :false,
    title: { text: null },
  },
  zAxis: {
    title: { text: null },
  },
  tooltip: {
    valueDecimals: 3
  },
  plotOptions: {
    series: {
      marker: {
        enabled: false
      },
      dashStyle: "shortdot",
      color: "#ff8d1e",
      pointStart: xiData[0],
      animation: {
        duration: animationTime
      },
      
    }
  },
  legend:{ enabled:false },
  series: [
    {
      type: "scatter",
      name: "Observation",
      marker: {
        enabled: true,
        radius: 5,
        fillColor: "#ff1e1f"
      },
      data: dataPoint,
      tooltip: {
        headerFormat: "{series.name}:",
        pointFormat: "<b>{point.x}</b>"
      },
      zIndex: 9
    },
    {
      name: "KDE",
      dashStyle: "solid",
      lineWidth: 8,
      color: "#b8b8b8",
      data: data
    },
    {
      name: "k(" + dataSource[0] + ")",
      data: kernelChart[0]
    },
    {
      name: "k(" + dataSource[1] + ")",
      data: kernelChart[1]
    },
    {
      name: "k(" + dataSource[2] + ")",
      data: kernelChart[2]
    },
    {
      name: "k(" + dataSource[3] + ")",
      data: kernelChart[3]
    },
    {
      name: "k(" + dataSource[4] + ")",
      data: kernelChart[4]
    },
    {
      name: "k(" + dataSource[5] + ")",
      data: kernelChart[5]
    },
    {
      name: "k(" + dataSource[6] + ")",
      data: kernelChart[6]
    }
  ]
});
