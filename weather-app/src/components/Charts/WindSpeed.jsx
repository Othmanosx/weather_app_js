import React, { useEffect } from "react";
import Chart from "chart.js";
import "chartjs-plugin-colorschemes";

export default function WindSpeed(props) {
  useEffect(() => {
    if (props.wind_speed.length > 0) {
      document.querySelector(".WindSpeed").innerHTML = "";
      const ctx = document.createElement("canvas");
      // ctx.style.backgroundColor = '#FDF5E6';
      // ctx.height = 300;

      new Chart(ctx, {
        type: "line",
        data: {
          labels: props.date,
          datasets: [
            {
              label: "Wind Speed",
              data: props.wind_speed,
              borderWidth: 2,
              //   fill: false
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

      document.getElementsByClassName("WindSpeed")[0].appendChild(ctx);
    }
  }, [props.wind_speed, props.date]);
  return (
    <div className="WindSpeed">
      <canvas id="WindSpeed"></canvas>
    </div>
  );
}
