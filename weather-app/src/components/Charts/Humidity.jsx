import React, { useEffect } from "react";
import Chart from "chart.js";
import "chartjs-plugin-colorschemes";

export default function Humidity(props) {
  useEffect(() => {
    if (props.humidity.length > 0) {
      document.querySelector(".Humidity").innerHTML = "";
      const ctx = document.createElement("canvas");
      // ctx.style.backgroundColor = '#FDF5E6';
      // ctx.height = 250;

      new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: props.date,
          datasets: [
            {
              label: "Humidity",
              data: props.humidity,
              borderWidth: 2,
              //   fill: false
            },
          ],
        },
        options: {
          aspectRatio: 16/11.9,
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

      document.getElementsByClassName("Humidity")[0].appendChild(ctx);
    }
  }, [props.humidity, props.date]);
  return (
    <div className="Humidity">
      <canvas id="Humidity"></canvas>
    </div>
  );
}
