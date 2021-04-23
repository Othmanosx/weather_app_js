import React from "react"
import Search from "./search"
import "./today.css"
import sn from "./wallpapers/snow.svg"
import sl from "./wallpapers/sleet.svg"
import h from "./wallpapers/hail.svg"
import t from "./wallpapers/thunderstorm.svg"
import hr from "./wallpapers/heavyrain.svg"
import lr from "./wallpapers/lightrain.svg"
import s from "./wallpapers/showers.svg"
import hc from "./wallpapers/heavycloud.svg"
import lc from "./wallpapers/lightcloud.svg"
import c from "./wallpapers/clear.svg"

export default function today(props) {
  let imgurl = ""
  const backgroundImage = [
    {
      name: "snow",
      url: sn,
    },
    {
      name: "sleet",
      url: sl,
    },
    {
      name: "hail",
      url: h,
    },
    {
      name: "thunderstorm",
      url: t,
    },
    {
      name: "heavy rain",
      url: hr,
    },
    {
      name: "light rain",
      url: lr,
    },
    {
      name: "shower rain",
      url: s,
    },
    {
      name: "rain",
      url: lr,
    },
    {
      name: "broken clouds",
      url: hc,
    },
    {
      name: "few clouds",
      url: lc,
    },
    {
      name: "overcast clouds",
      url: hc,
    },
    {
      name: "scattered clouds",
      url: lc,
    },
    {
      name: "clear",
      url: c,
    },
  ]
  if (props.state.data.weather) {
    backgroundImage.map((item) =>
      props.state.data.weather[0].description.includes(item.name)
        ? (imgurl = item.url)
        : null
    )
  }

  function convertTime(date) {
    const event = new Date(date * 1000)
    return event.toLocaleTimeString()
  }
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        <div style={{ marginBottom: "20px" }} className="right-panel panel">
          <Search onClick={props.onClick} />
          <div>
            <h4>
              {props.state.data.weather
                ? props.state.data.weather[0].description
                : null}
            </h4>{" "}
          </div>

          <div>
            Sun rise {convertTime(props.state.sun_rise)}{" "}
            <i className="fas fa-sun"></i>
          </div>
          <div>
            Sun set {convertTime(props.state.sun_set)}{" "}
            <i className="fas fa-moon"></i>
          </div>
        </div>

        <div className="left-panel panel">
          <div className="date">
            {props.state.date[0]}
            <br />
          </div>
          <div className="city">{props.state.title}</div>
          <div className="temp">{Math.floor(props.state.the_temp[0])}&deg;</div>
        </div>
        <img
          style={{
            width: "130px",
            height: "intrinsic",
          }}
          src={imgurl}
          alt=""
        />
      </div>
    </div>
  )
}
