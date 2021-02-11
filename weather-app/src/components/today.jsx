import React from "react";
import "./today.css";
import sn from "./wallpapers/snow.jpg";
import sl from "./wallpapers/sleet.jpg";
import h from "./wallpapers/hail.jpg";
import t from "./wallpapers/thunderstorm.jpg";
import hr from "./wallpapers/heavyrain.jpg";
import lr from "./wallpapers/lightrain.jpeg";
import s from "./wallpapers/showers.jpg";
import hc from "./wallpapers/heavycloud.jpg";
import lc from "./wallpapers/lightcloud.jpg";
import c from "./wallpapers/clear.jpg";

export default function today(props) {
  const backgroundImage = [sn, sl, h, t, h, hr, lr, s, hc, lc, c];
  const backgroundImageIndex = [
    "sn",
    "sl",
    "h",
    "t",
    "h",
    "hr",
    "lr",
    "s",
    "hc",
    "lc",
    "c",
  ];
  function convertTime(date) {
    const event = new Date(date);
    return event.toLocaleTimeString("en-US");
  }
  return (
    <div>
      {/* <h1>Forcast for {props.state.title}</h1> */}
      <div
        className="widget"
        style={{
          backgroundImage: `url(${
            backgroundImage[
              backgroundImageIndex.indexOf(props.state.data.weather_state_abbr)
            ]
          })`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="left-panel panel">
          <div className="date">
            {props.state.date[0]} {props.state.data.applicable_date}
            <br />
          </div>
          <div className="city">{props.state.title}</div>
          <div className="temp">{Math.floor(props.state.the_temp[0])}&deg;</div>
        </div>
        <div className="right-panel panel">
          <p>
            <h4>{props.state.data.weather_state_name}</h4>{" "}
          </p>

          <p>
            Sun rise {convertTime(props.state.sun_rise)}{" "}
            <i class="fas fa-sun"></i>
          </p>
          <p>
            Sun set {convertTime(props.state.sun_set)}{" "}
            <i class="fas fa-moon"></i>
          </p>
        </div>
      </div>
    </div>
  );
}
