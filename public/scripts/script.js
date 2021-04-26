window.onload = () => {
  const starttime = document.getElementById("starttime");
  const endtime = document.getElementById("endtime");

  starttime.defaultValue = "2021-02-08T00:00:00";

  const curr = new Date();
  const minutes =
    curr.getMinutes() < 10 ? "0" + curr.getMinutes() : curr.getMinutes();
  const dt = `${curr.getFullYear()}-0${
    curr.getMonth() + 1
  }-${curr.getDate()}T${curr.getHours()}:${minutes}`;
  endtime.defaultValue = dt;

  const displayChart = () => {
    const s = new Date(starttime.value);
    const f = new Date(endtime.value);

    const getDataPointsFromCSV = (csv, index) => {
      const dataPoints = (csvLines = points = []);
      csvLines = csv.split(/[\r?\n|\r|\n]+/);

      for (let i = 0; i < csvLines.length; i++)
        if (csvLines[i].length > 0) {
          points = csvLines[i].split(",");
          const d = new Date(points[0]);
          if (f >= d && d >= s) {
            dataPoints.push({
              x: new Date(points[0]),
              y: parseFloat(points[index]),
            });
          }
        }
      return dataPoints;
    };

    $.get("../data/gym_numbers.csv", (data) => {
      const chart = new CanvasJS.Chart("chartContainer", {
        title: {
          text: "Gym numbers",
        },
        data: [
          {
            type: "line",
            dataPoints: getDataPointsFromCSV(data, 1),
            name: "Claremont",
            showInLegend: true,
          },
          {
            type: "line",
            dataPoints: getDataPointsFromCSV(data, 2),
            name: "Innaloo",
            showInLegend: true,
          },
          {
            type: "line",
            dataPoints: getDataPointsFromCSV(data, 5),
            name: "Northbridge",
            showInLegend: true,
          },
          {
            type: "line",
            dataPoints: getDataPointsFromCSV(data, 7),
            name: "Scarbs",
            showInLegend: true,
          },
          {
            type: "line",
            dataPoints: getDataPointsFromCSV(data, 8),
            name: "Shenton",
            showInLegend: true,
          },
        ],
      });

      chart.render();
    });
  };

  starttime.onchange = () => {
    displayChart();
  };

  endtime.onchange = () => {
    displayChart();
  };

  displayChart();
};
