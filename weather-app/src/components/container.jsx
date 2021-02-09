import React, { Component } from 'react'
import Chart from './chart'
import Info from './info'
import SearchBar from './searchBar'
import Today from './today'

export default class container extends Component {
    render() {
        return (
            <div>
                container
                <SearchBar />
                <Info />
                <Chart />
                <Today />
            </div>
        )
    }
}
