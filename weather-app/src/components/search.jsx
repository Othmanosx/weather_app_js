import React, { Component } from "react";

export default class search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cityName: "",
    };
  }

  onChange = (e) => {
    this.setState({ cityName: e.target.value });
  };
  onClick = (e) => {
    this.props.onClick(this.state.cityName);
    this.setState({ cityName: "" });
  };

  render() {
    return (
      <div className="search">
        <ul id="growing-search-freebie">
          <li>
            <div className="growing-search">
              <div className="input">
                <input
                  onChange={this.onChange}
                  type="text"
                  name="search"
                  value={this.state.cityName}
                />
              </div>
              <div className="submit">
                <button onClick={this.onClick} type="submit" name="go_search">
                  <span className="fa fa-search"></span>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
