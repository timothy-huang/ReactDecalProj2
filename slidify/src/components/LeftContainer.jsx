
import React, {Component} from 'react';
import Slider from '@material-ui/lab/Slider';

import "../styles/LeftContainer.css";
// import { createMuiTheme } from '@material-ui/core/styles';
// import getMuiTheme from 'material-ui/styles/getMuiTheme'
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import green from '@material-ui/core/colors/green';
// import red from '@material-ui/core/colors/red';




class LeftContainer extends Component {
  constructor(props) {
  super(props);
  this.state = {
    Danceability: 0.5,
    Duration: 500000,
    Energy: 0.5,
    Loudness: -30,
    Speechiness: 0.33,
    Tempo: 80,
    Valence: 0.5
  };
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);

}



  handleChange = name => (e, value, props) => {
      this.setState({
        [name]: value
      });
  };


  handleSubmit(e) {
    e.preventDefault();
    const { filter } = this.props;
    filter(this.state);
  }

  render() {
    const {Danceability, Duration, Energy, Loudness, Speechiness, Tempo, Valence} = this.state;
    // const muiTheme = getMuiTheme({
    //     slider: {
    //       selectionColor: '#929AA6',
    //       handleFillColor: '#1B4C59'
    //     }
    //   });

    return (

      <div>
      <div className="slider-container">

        <div className="slider">
        <div className="title-left"> Filters </div>
        <div className="label"> Danceability </div>
        <form ref="form" onSubmit={this.handleSubmit}>
        <Slider
          min={0}
          max={1}
          value={Danceability}
          onChange={this.handleChange("Danceability")} />

        <div className="label"> Duration </div>
        <Slider
          min={0}
          max={1000000}
          value={Duration}
          onChange={this.handleChange("Duration")} />

        <div className="label"> Energy </div>
        <Slider
          min={0}
          max={1}
          value={Energy}
          onChange={this.handleChange("Energy")} />

        <div className="label"> Loudness </div>
        <Slider
          min={-120}
          max={120}
          value={Loudness}
          onChange={this.handleChange("Loudness")} />

        <div className="label"> Speechiness </div>
        <Slider
          min={0}
          max={1}
          value={Speechiness}
          onChange={this.handleChange("Speechiness")} />

        <div className="label"> Tempo </div>
        <Slider
          min={0}
          max={400}
          value={Tempo}
          onChange={this.handleChange("Tempo")} />

        <div className="label"> Valence </div>
        <Slider
          min={0}
          max={1}
          value={Valence}
          onChange={this.handleChange("Valence")} />


        <button className= "submit-button" type="submit"> Apply </button>
        </form>
        </div>

        </div>
      </div>
    );
  }
};



export default LeftContainer;
