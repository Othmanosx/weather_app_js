import React from 'react'
import './today.css'

export default function today(props) {

    return (
        <div>
            <h1>Forcast for {props.state.cityName}</h1>
            <div class="widget">

                <div class="left-panel panel">
                    <div class="date">
                        {props.state.date[0]} {props.state.data[0].applicable_date}
                        <br />

                    </div>
                    <div class="city">
                        {props.state.cityName}
                    </div>
                    <div class="temp">
                        <img src="https://s5.postimg.cc/yzcm7htyb/image.png" alt="" width="30" />
                        {Math.floor(props.state.the_temp[0])}&deg;
                </div>
                </div>
                <div class="right-panel panel">
                    {props.state.data[0].weather_state_name}
                </div>


            </div>


        </div>
    )
}
