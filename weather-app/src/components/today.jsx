import React from "react";
import "./today.css";
import sn from "./wallpapers/snow.svg";
import sl from "./wallpapers/sleet.svg";
import h from "./wallpapers/hail.svg";
import t from "./wallpapers/thunderstorm.svg";
import hr from "./wallpapers/heavyrain.svg";
import lr from "./wallpapers/lightrain.svg";
import s from "./wallpapers/showers.svg";
import hc from "./wallpapers/heavycloud.svg";
import lc from "./wallpapers/lightcloud.svg";
import c from "./wallpapers/clear.svg";

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
        const event = new Date(date*1000);
        return event.toLocaleTimeString();
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
                <div style={{marginBottom: '20px'}} className="right-panel panel">
                    <div className='search'>
                        <ul id="growing-search-freebie">
                            <li>
                                <div className="growing-search">
                                    <div className="input">
                                        <input onChange={props.onChange} type="text" name="search" />
                                    </div><div className="submit">
                                        <button onClick={props.onClick} type="submit" name="go_search">
                                            <span className="fa fa-search"></span>
                                        </button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4>{props.state.data.weather_state_name}</h4>{" "}
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
                        {props.state.date[0]} {props.state.data.applicable_date}
                        <br />
                    </div>
                    <div className="city">{props.state.title}</div>
                    <div className="temp">{Math.floor(props.state.the_temp[0])}&deg;</div>
                </div>
                <img style={{
                    width: "130px"
                }} src={backgroundImage[backgroundImageIndex.indexOf(props.state.data.weather_state_abbr)]} alt="" />

                
            </div>
        </div>
    );
}
