import React, { useEffect } from "react";
import Chart from "chart.js";
import "chartjs-plugin-colorschemes";

export default function TemChart(props) {
  useEffect(() => {
    if (props.the_temp.length > 0) {
      document.querySelector(".TemChart").innerHTML = "";
      const ctx = document.createElement("canvas");
      // ctx.style.backgroundColor = '#FDF5E6';
      // ctx.height = 300;

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: props.date,
          datasets: [
            {
              label: "Temp",
              data: props.the_temp,
              borderWidth: 2,
              fill: false,
            },
            {
              label: "Min Temp",
              data: props.min_temp,
              borderWidth: 2,
              fill: false,
            },
            {
              label: "Max Temp",
              data: props.max_temp,
              borderWidth: 2,
              fill: false,
            },
          ],
        },
        options: {
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

      document.getElementsByClassName("TemChart")[0].appendChild(ctx);
    }
  }, [props.min_temp, props.the_temp, props.max_temp, props.date]);
  return (
    <div className="TemChart">
      <canvas id="TemChart"></canvas>
    </div>
  );
}
