import React, { Component } from "react";
import Chart from "./chart";
import Info from "./info";
import Table from "./table";
import Today from "./today";

export default class container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wo: "1979455",
      isLoading: true,
      data: [{ params: {} }],
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
    };
  }
  // first render
  componentDidMount() {
    fetch("https://www.metaweather.com/api/location/1979455/")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ isLoading: false });
        {
          var dayNum = new Date();

          var days = [
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
          // Split data in individual arrays of first rendering
          for (var i = 0; i < data["consolidated_weather"].length; i++) {
            min_temp.push(data["consolidated_weather"][i]["min_temp"]);
            max_temp.push(data["consolidated_weather"][i]["max_temp"]);
            the_temp.push(data["consolidated_weather"][i]["the_temp"]);
            wind_speed.push(data["consolidated_weather"][i]["wind_speed"]);
            air_pressure.push(data["consolidated_weather"][i]["air_pressure"]);
            humidity.push(data["consolidated_weather"][i]["humidity"]);
            visibility.push(data["consolidated_weather"][i]["visibility"]);
            date.push(
              //               get days name by date
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
            data: data["consolidated_weather"],
            parent: data["parent"],
          });
        }
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.wo !== this.state.wo) {
      fetch("https://www.metaweather.com/api/location/" + this.state.wo)
        .then((response) => response.json())
        .then((data) => {
          this.setState({ isLoading: false });
          {
            var dayNum = new Date();

            var days = [
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
            // Split data in individual arrays of another  rendering
            for (var i = 0; i < data["consolidated_weather"].length; i++) {
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
              data: data["consolidated_weather"],
              parent: data["parent"],
            });
          }
        });
    }
  }

  render() {
    console.log(this.state.max_temp);
    const handelInput = (e) => {
      this.setState({ cityName: e.target.value });
      console.log(e.target.value);
    };
    const getWoeid = () => {
      fetch(
        "https://www.metaweather.com/api/location/search/?query=" +
        this.state.cityName
      )
        .then((response) => response.json())
        .then((data) => this.setState({ wo: data[0]["woeid"] }));
    };
    console.log(this.state.data);

    if (this.state.isLoading) {
      return <>loading .........</>;
    }
    return (
      <div>
        <input onChange={handelInput} type="text"></input>
        <input onClick={getWoeid} type="submit"></input>
        <Today state={this.state} />
        <Info state={this.state} />
        <Chart state={this.state} />
        <Table state={this.state} />
      </div>
    );
  }
}