import React, { Component } from 'react';

// COUNTDOWN TIMER EXAMPLES:
// https://www.npmjs.com/package/react-countdown-now
// https://stackoverflow.com/questions/40885923/countdown-timer-in-react
// https://medium.com/@sairamkrish/reactjs-countdown-timer-with-support-for-callbacks-browsercrash-and-optimal-rendering-performance-ba38b045c65d

class Timer extends Component {
  state = {
    timeRemaining: 0
  }

  getTimeRemaining = () => {
    const expiration = this.props.startTimestamp + (30 * 60000);
    const timeRemaining = expiration - Date.now();
    return timeRemaining > 0 ? timeRemaining : 0;
  }

  componentDidMount() {
    this.tick();
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  
  tick = () => {
    this.setState({
      timeRemaining: this.getTimeRemaining()
    });
  }

  render() {
    const { timeRemaining } = this.state;
    const timeRemainingInSeconds = timeRemaining * 1000;
    const remainingMinutes = Math.floor(timeRemainingInSeconds/60);
    const remainingSeconds = timeRemainingInSeconds % 60;

    return (
      <div>
        <h1>Time Remaining</h1>
        <p>{remainingMinutes}:{remainingSeconds}</p>
      </div>
    );
  }
}

export default Timer;
