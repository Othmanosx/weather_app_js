import React, { useEffect } from "react";
import Chart from "chart.js";
import "chartjs-plugin-colorschemes";

export default function LineChart(props) {
  useEffect(() => {
    if (props.air_pressure.length > 0) {
      document.querySelector(".LineChart").innerHTML = "";
      const ctx = document.createElement("canvas");
      // ctx.style.backgroundColor = '#FDF5E6';
      // ctx.height = 250;

      new Chart(ctx, {
        type: "line",
        data: {
          labels: props.date,
          datasets: [
            {
              label: "Air pressure",
              data: props.air_pressure,
              borderWidth: 2,
              fill: false,
            },
            {
              label: "Dew Point",
              data: props.visibility,
              borderWidth: 2,
              fill: false,
            },
            {
              label: "Clouds",
              data: props.predictability,
              borderWidth: 2,
              fill: false,
            },
          ],
        },
        options: {
          aspectRatio: 16 / 11.9,
          responsive: true,
          responsiveAnimationDuration: 2000,
          plugins: {
            colorschemes: {
              scheme: "brewer.Accent4",
            },
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: false,
                },
              },
            ],
          },
        },
      });

      document.getElementsByClassName("LineChart")[0].appendChild(ctx);
    }
  }, [props.predictability, props.visibility, props.air_pressure, props.date]);
  return (
    <div className="LineChart">
      <canvas id="LineChart"></canvas>
    </div>
  );
}
