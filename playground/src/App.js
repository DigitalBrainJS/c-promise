import React from "react";
import TestComponent from "./TestComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { url: props.url, _url: props.url, timeout: 5000 };
        this.onClick = this.onClick.bind(this);
        this.onFetchClick = this.onFetchClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleTimeoutChange = this.handleTimeoutChange.bind(this);
    }

    onFetchClick() {
        this.setState(({ _url }) => ({ url: _url }));
    }

    onClick() {
        this.setState({ timestamp: Date.now() });
    }

    handleChange(event) {
        console.log(event.target.value);
        this.setState({ _url: event.target.value });
    }

    handleTimeoutChange(event) {
        this.setState({ timeout: event.target.value * 1 });
    }

    render() {
        return (
          <div key={this.state.timestamp} id="app">
              <input
                className="field-url"
                type="text"
                value={this.state._url}
                onChange={this.handleChange}
              />
              <button
                className="btn btn-info btn-change"
                onClick={this.onFetchClick}
                disabled={this.state.url === this.state._url}
              >
                  Change URL to Fetch
              </button>
              <div>
                  <input
                    id="timeout-input"
                    type="range"
                    min="5"
                    max="10000"
                    value={this.state.timeout}
                    onChange={this.handleTimeoutChange}
                    step="1"
                  />
                  <label htmlFor="timeout-input">
                      Timeout [{this.state.timeout}]ms
                  </label>
              </div>
              <TestComponent
                url={this.state.url}
                timeout={this.state.timeout}
              ></TestComponent>
              <button className="btn btn-danger" onClick={this.onClick}>
                  Remount component
              </button>
          </div>
        );
    }
}
