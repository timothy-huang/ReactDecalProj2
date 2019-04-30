
import React, {Component} from 'react';
import Slider from '@material-ui/lab/Slider';

import "../styles/LeftContainer.css";
// import { createMuiTheme } from '@material-ui/core/styles';
// import getMuiTheme from 'material-ui/styles/getMuiTheme'
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import green from '@material-ui/core/colors/green';
// import red from '@material-ui/core/colors/red';




class LeftContainer extends Component {
  state = {
    Danceability: 0.5,
    Duration: 1000,
    Energy: 0.5,
    Loudness: -30,
    Speechiness: 0.33,
    Tempo: 20,
    Valence: 0.5
  };

  handleChange = name => (e, value) => {
      this.setState({
        [name]: value
      });
  };


  // fetch: recommandation - seed from the search  
  // handleSummit


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
        <div className="title"> Filters </div>
        <div className="label"> Danceability </div>
        <Slider
          min={0}
          max={1}
          value={Danceability}
          onChange={this.handleChange("Danceability")} />

        <div className="label"> Duration </div>
        <Slider
          min={0}
          max={2000}
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
          min={-60}
          max={60}
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
          max={50}
          value={Tempo}
          onChange={this.handleChange("Tempo")} />

        <div className="label"> Valence </div>
        <Slider
          min={0}
          max={1}
          value={Valence}
          onChange={this.handleChange("Valence")} />

        </div>


        </div>
      </div>
    );
  }
};



export default LeftContainer;
