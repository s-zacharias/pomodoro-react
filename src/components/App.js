import React from 'react';
import Timer from './Timer';
import Controls from './Controls';
import SessionAdjust from './SessionAdjust';
import './styles.css';

class App extends React.Component {
  state = {
    activeSession: 25,
    breakSession: 5,
    session: 'active',
    countdown: 'pause',
    timeRemaining: 25 * 60,
    timerId: null,
  };

  onCountdownStartPause = () => {
    if (this.state.countdown === 'pause') {
      this.setState({
        countdown: 'start',
        timerId: setInterval(() => {
          this.decreaseTimer();
          this.sessionToggle();
        }, 1000),
      });
    } else if (this.state.countdown === 'start') {
      clearInterval(this.state.timerId);
      this.setState({
        countdown: 'pause',
        timerId: null,
      });
    }
  };

  onReset = () => {
    if (this.state.timerId) {
      clearInterval(this.state.timerId);
      this.setState({ countdown: 'pause' });
    }
    this.setState({
      activeSession: 25,
      breakSession: 5,
    });
    if (this.state.session === 'active') {
      this.setState({
        timeRemaining: 1500,
      });
    } else if (this.state.session === 'break') {
      this.setState({
        timeRemaining: 300,
      });
    }
  };

  onActiveIncrease = () => {
    this.setState({
      activeSession: this.state.activeSession + 1,
      timeRemaining: (this.state.activeSession + 1) * 60,
    });
  };

  onActiveDecrease = () => {
    this.setState({
      activeSession:
        this.state.activeSession - 1 >= 0 ? this.state.activeSession - 1 : 0,
      timeRemaining:
        (this.state.activeSession - 1) * 60 >= 0
          ? (this.state.activeSession - 1) * 60
          : 0,
    });
  };

  onBreakIncrease = () => {
    this.setState({
      breakSession: this.state.breakSession + 1,
    });
  };

  onBreakDecrease = () => {
    this.setState({
      breakSession:
        this.state.breakSession - 1 >= 0 ? this.state.breakSession - 1 : 0,
    });
  };

  decreaseTimer = () => {
    this.setState({
      timeRemaining: this.state.timeRemaining - 1,
    });
  };

  sessionToggle = () => {
    if (this.state.timeRemaining === 0) {
      console.log('Times up');
    } else if (this.state.timeRemaining === -1) {
      if (this.state.session === 'active') {
        this.setState({
          session: 'break',
          timeRemaining: this.state.breakSession * 60,
        });
      } else if (this.state.session === 'break') {
        this.setState({
          session: 'active',
          timeRemaining: this.state.activeSession * 60,
        });
      }
    }
  };

  render() {
    return (
      <div className="app-container">
        pomodoro
        <Timer
          activeSession={this.state.activeSession}
          breakSession={this.state.breakSession}
          session={this.state.session}
          timeRemaining={this.state.timeRemaining}
        />
        <Controls
          countdown={this.state.countdown}
          onCountdownStartStop={this.onCountdownStartPause}
          onReset={this.onReset}
        />
        <SessionAdjust
          activeSession={this.state.activeSession}
          breakSession={this.state.breakSession}
          onActiveIncrease={this.onActiveIncrease}
          onActiveDecrease={this.onActiveDecrease}
          onBreakIncrease={this.onBreakIncrease}
          onBreakDecrease={this.onBreakDecrease}
        />
      </div>
    );
  }
}

export default App;
