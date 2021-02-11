import React from "react";
import "./today.css";

export default function today(props) {
    function convertTime(date) {
        const event = new Date(date);
        return event.toLocaleTimeString("en-US");
    }
    return (
        <div>
            <h1>Forcast for {props.state.title}</h1>
            <div className="widget">
                <div className="left-panel panel">
                    <div className="date">
                        {props.state.date[0]} {props.state.data.applicable_date}
                        <br />
                    </div>
                    <div className="city">{props.state.title}</div>
                    <div className="temp">
                        <img
                            src="https://s5.postimg.cc/yzcm7htyb/image.png"
                            alt=""
                            width="30"
                        />
                        {Math.floor(props.state.the_temp[0])}&deg;
          </div>
                </div>
                <div className="right-panel panel">
                    {props.state.data.weather_state_name} <br></br>
          sun rise {convertTime(props.state.sun_rise)}
                    <br></br> Sun set {convertTime(props.state.sun_set)}
                </div>
            </div>
        </div>
    );
}

