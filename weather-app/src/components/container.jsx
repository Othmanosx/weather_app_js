import React, { Component } from "react";
import TemChart from "./Charts/TemChart";
import Today from "./today";
import Loading from './loading'
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
      backgroundImage: [
        {
            name: 'snow',
            url: sn
        },
        {
            name: 'sleet',
            url: sl
        },
        {
            name: 'hail',
            url: h
        },
        {
            name: 'thunderstorm',
            url: t
        },
        {
            name: 'heavy rain',
            url: hr
        },
        {
            name: 'light rain',
            url: lr
        },
        {
            name: 'shower rain',
            url: s
        },
        {
            name: 'broken overcast clouds',
            url: hc
        },
        {
            name: 'few scattered clouds',
            url: lc
        },
        {
            name: 'clear',
            url: c
        },
        
    ],
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
      title: "",
      sun_rise: "",
      sun_set: "",
      show: false,
      fetchedData: null,
      backgroundPhoto: lc,
      id: ''

    };
    
  }
  
   fetchData = (api, cityName)=> {
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ isLoading: false, fetchedData: data });
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
            min_temp.push(data['daily'][i]["temp"]["min"])
            max_temp.push(data["daily"][i]["temp"]["max"]);
            the_temp.push(data["current"]["temp"]);
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

          this.background(data["daily"][0].weather[0])

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
            title: cityName? cityName : data["timezone"],
            sun_rise: data["daily"][0]['sunrise'],
            sun_set: data["daily"][0]['sunset'],
          });
        }
      }).catch(e => {
        console.log(e);
        return e;
      })

    }

    background = (weather) => {
        this.state.backgroundImage.map((item)=> weather.description.includes(item.name)? this.setState({backgroundPhoto: item.url, id: weather.id}) : null) 
    }

  componentDidMount = () => {
    this.fetchData('https://api.openweathermap.org/data/2.5/onecall?lat=39.9199&lon=32.8543&exclude=minutely&appid=afeeafa25d3a3dae066200b885ac157b&units=metric');

    navigator.geolocation.getCurrentPosition((position) => {
      let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&exclude=minutely&appid=afeeafa25d3a3dae066200b885ac157b&units=metric`;
      this.fetchData(api);
    });  

  }

  render() {
    const getWoeid = (cityName) => {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=afeeafa25d3a3dae066200b885ac157b&units=metric`
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          let cityName = data.name;

          let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=minutely&appid=afeeafa25d3a3dae066200b885ac157b&units=metric`
          this.fetchData(api, cityName)

        }).catch(e => {
          console.log(e);
          alert("Please enter city names only");
          return e;
        }
        );
    };

    if (this.state.isLoading) {
      return <Loading />
    }

    return (
      <>
        <video key={this.state.id} id="background-video" loop autoPlay muted playsInline>
          <source src={this.state.backgroundPhoto} type="video/mp4" />
          <source src={this.state.backgroundPhoto} type="video/ogg" />
                Your browser does not support the video tag.
        </video>
        <div className='main'>
            <div className='glass-card'>
              <Today state={this.state} onClick={getWoeid} />
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
      </>
    );
  }
}
