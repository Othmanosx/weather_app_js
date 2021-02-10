import React from 'react'
import './table.css'

export default function table(props) {
    return (
        <div>

            <table>
                <thead>
                    <tr>
                        <th>weather</th>
                        <th>date</th>
                        <th>low</th>
                        <th>high</th>
                        <th>average</th>
                        <th>humidity</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{props.state.date[0]}</td>
                    </tr>
                    <tr>
                        <td>{props.state.date[1]}</td>
                    </tr>
                    <tr>
                        <td>{props.state.date[2]}</td>
                    </tr>
                    <tr>
                        <td>{props.state.date[3]}</td>
                    </tr>
                    <tr>
                        <td>{props.state.date[4]}</td>
                    </tr>
                    <tr>
                        <td>{props.state.date[5]}</td>
                    </tr>

                </tbody>
            </table>
        </div>
    )
}
