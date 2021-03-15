import React, { Component } from "react";
import TemChart from "./Charts/TemChart";
import Today from "./today";
import './loading.css'
import WindSpeed from "./Charts/WindSpeed";
import Humidity from "./Charts/Humidity";
import LineChart from "./Charts/LineChart";
import "./search.css"
import sn from "./videos/snow.mp4";
import sl from "./videos/sleet.mp4";
import h from "./videos/hail.mp4";
import t from "./videos/thunderstorm.mp4";
import hr from "./videos/heavyrain.mp4";
import lr from "./videos/lightrain.mp4";
import s from "./videos/showers.mp4";
import hc from "./videos/heavycloud.mp4";
import lc from "./videos/lightcloud.mp4";
import c from "./videos/clear.mp4";

export default class container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      backGround: [sn, sl, h, t, h, hr, lr, s, hc, lc, c],
      backGroundIndex: ['sn', 'sl', 'h', 't', 'h', 'hr', 'lr', 's', 'hc', 'lc', 'c'],
      wo: "1979455",
      isLoading: true,
      data: [],
      cityName: "Baghdad",
      min_temp: [],
      max_temp: [],
      the_temp: [],
      wind_speed: [],
      air_pressure: [],
      humidity: [],
      visibility: [],
      predictability: [],
      date: [],
      parent: {},
      title: "",
      sun_rise: "",
      sun_set: "",
      show: false,
      fetchedData: null
    };
  }


  // first render
  componentDidMount() {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=33.3406&lon=44.4009&exclude=hourly&appid=afeeafa25d3a3dae066200b885ac157b")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ isLoading: false, fetchedData: data['daily'] });
        {

          let min_temp = [];
          let max_temp = [];
          let the_temp = [];
          let wind_speed = [];
          let air_pressure = [];
          let humidity = [];
          let visibility = [];
          let predictability = [];
          let date = [];
          // Split data in individual arrays in the first render
          for (let i = 0; i < data["daily"].length; i++) {
            console.log(i);
            min_temp.push(data['daily'][i]["temp"]["min"]-273.15)
            max_temp.push(data["daily"][i]["temp"]["max"]-273.15);
            the_temp.push(data["daily"][i]["the_temp"]-273.15);
            wind_speed.push(data["daily"][i]["wind_speed"]);
            air_pressure.push(data["daily"][i]["pressure"]);
            humidity.push(data["daily"][i]["humidity"]);
            visibility.push(data["daily"][i]["dew_point"]);
            date.push(
              //  get day names by date
              
              new Date(
                data["daily"][i]["dt"]*1000
              ).toDateString()
              
            );

            predictability.push(
              data["daily"][i]["clouds"]
            );
          }

          this.setState({
            min_temp: min_temp,
            max_temp: max_temp,
            the_temp: the_temp,
            wind_speed: wind_speed,
            humidity: humidity,
            visibility: visibility,
            predictability: predictability,
            air_pressure: air_pressure,
            date: date,
            data: data["daily"][0],
            parent: data["parent"],
            title: data["title"],
            sun_rise: data["daily"][0]['sunrise'],
            sun_set: data["daily"][0]['sunset'],
          });
        }
      }).catch(e => {
        console.log(e);
        return e;
      });
    const timer = setTimeout(() => {
      this.setState({ show: true })
    }, 3000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.wo !== this.state.wo) {
      fetch("https://www.metaweather.com/api/location/" + this.state.wo)
        .then((response) => response.json())
        .then((data) => {
          this.setState({ isLoading: false });
          {
            const dayNum = new Date();

            const days = [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ];

            let min_temp = [];
            let max_temp = [];
            let the_temp = [];
            let wind_speed = [];
            let air_pressure = [];
            let humidity = [];
            let visibility = [];
            let predictability = [];
            let date = [];
            // Split data in individual arrays in another render
            for (let i = 0; i < data["consolidated_weather"].length; i++) {
              min_temp.push(data["consolidated_weather"][i]["min_temp"]);
              max_temp.push(data["consolidated_weather"][i]["max_temp"]);
              the_temp.push(data["consolidated_weather"][i]["the_temp"]);
              wind_speed.push(data["consolidated_weather"][i]["wind_speed"]);
              air_pressure.push(
                data["consolidated_weather"][i]["air_pressure"]
              );
              humidity.push(data["consolidated_weather"][i]["humidity"]);
              visibility.push(data["consolidated_weather"][i]["visibility"]);
              date.push(
                days[
                new Date(
                  data["consolidated_weather"][i]["applicable_date"]
                ).getDay()
                ]
              );

              predictability.push(
                data["consolidated_weather"][i]["predictability"]
              );
            }

            this.setState({
              min_temp: min_temp,
              max_temp: max_temp,
              the_temp: the_temp,
              wind_speed: wind_speed,
              humidity: humidity,
              visibility: visibility,
              predictability: predictability,
              air_pressure: air_pressure,
              date: date,
              data: data["consolidated_weather"][0],
              parent: data["parent"],
              title: data["title"],
              sun_rise: data["sun_rise"],
              sun_set: data["sun_set"],
            });
          }
        });
    }

  }

  render() {
    this.backgroundPhoto =
      this.state.backGround[
      this.state.backGroundIndex.indexOf(this.state.data.weather_state_abbr)
      ];
    const handelInput = (e) => {
      this.setState({ cityName: e.target.value });
    };
    const getWoeid = () => {
      fetch(
        "https://www.metaweather.com/api/location/search/?query=" +
        this.state.cityName
      )
        .then((response) => response.json())
        .then((data) => this.setState({ wo: data[0]["woeid"] })).catch(e => {
          alert("Please enter capital city names only");
          return e;
        });
    };

    if (this.state.isLoading) {
      return <><div className="icon sun-shower">
        <div className="cloud"></div>
        <div className="sun">
          <div className="rays"></div>
        </div>
        <div className="rain"></div>
      </div><h2 className='loading'>Loading...</h2>
        {this.state.show && <center><p>if loading takes too long download and enable <a href="https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf" target="_blank">this extension</a> for Chrome</p></center>}</>;

    }

    return (

      <div>
        <video key={this.state.data.weather_state_abbr} id="background-video" loop autoPlay muted>
          <source src={this.backgroundPhoto} type="video/mp4" />
          <source src={this.backgroundPhoto} type="video/ogg" />
                Your browser does not support the video tag.
        </video>
        <div className='main'>
            <div className='glass-card'>
              <Today state={this.state} onChange={handelInput} onClick={getWoeid} />
              <div>
              <TemChart
                date={this.state.date.map(day => day.slice(0,4)).slice(0,7)}
                min_temp={this.state.min_temp}
                max_temp={this.state.max_temp}
                the_temp={this.state.the_temp}
              /></div>
            </div>
            
            <div className='glass-card'>
              <Humidity date={this.state.date.map(day => day.slice(0,4)).slice(0,7)} humidity={this.state.humidity} />
            </div>
          
          <div className="glass-card">
            <WindSpeed
              date={this.state.date.map(day => day.slice(0,4)).slice(0,7)}
              wind_speed={this.state.wind_speed}
            />
            </div>
            <div className="glass-card">
            <LineChart
              date={this.state.date.map(day => day.slice(0,4)).slice(0,7)}
              air_pressure={this.state.air_pressure}
              visibility={this.state.visibility}
              predictability={this.state.predictability}
            />
          </div>
        </div>
      </div >

    );
  }
}
