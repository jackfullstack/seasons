import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner.js";

class App extends React.Component {
  state = { lat: null, errorMessage: "" };

  componentDidMount() {
    // Use this to dataload any info that only gets done once after component initialisation
    navigator.geolocation.getCurrentPosition(
      (position) =>
        this.setState({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        }),
      (err) => this.setState({ errorMessage: err.message })
    );
    console.log("component mounted and is updating mofo!");
  }

  componentDidUpdate() {
    console.log("The component updated");
  }

  renderContent() {
    if (this.state.lat && this.state.long && !this.state.errorMessage) {
      return <SeasonDisplay lat={this.state.lat} />;
    }
    if (!this.state.lat && !this.state.long && this.state.errorMessage) {
      return <div>{this.state.errorMessage}</div>;
    }
    return (
      <div>
        <Spinner message="Please accept location request" />
      </div>
    );
  }

  //React says we have to define render!!
  render() {
    return <div>{this.renderContent()}</div>;
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
