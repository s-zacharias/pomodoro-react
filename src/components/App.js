import React, { createRef } from 'react';
import Timer from './Timer';
import Controls from './Controls';
import SessionAdjust from './SessionAdjust';
import sound from '../notification.mp3';
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

  audioAlert = createRef();

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
      this.audioAlert.current.pause();
      this.audioAlert.current.currentTime = 0;
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
    this.audioAlert.current.pause();
    this.audioAlert.current.currentTime = 0;
  };

  onActiveIncrease = () => {
    this.setState({
      activeSession: this.state.activeSession + 1,
    });
    if (this.state.session === 'active') {
      this.setState({
        timeRemaining: (this.state.activeSession + 1) * 60,
      });
    }
  };

  onActiveDecrease = () => {
    this.setState({
      activeSession:
        this.state.activeSession - 1 >= 0 ? this.state.activeSession - 1 : 0,
    });
    if (this.state.session === 'active') {
      this.setState({
        timeRemaining:
          (this.state.activeSession - 1) * 60 >= 0
            ? (this.state.activeSession - 1) * 60
            : 0,
      });
    }
  };

  onBreakIncrease = () => {
    this.setState({
      breakSession: this.state.breakSession + 1,
    });
    if (this.state.session === 'break') {
      this.setState({
        timeRemaining: (this.state.breakSession + 1) * 60,
      });
    }
  };

  onBreakDecrease = () => {
    this.setState({
      breakSession:
        this.state.breakSession - 1 >= 0 ? this.state.breakSession - 1 : 0,
    });
    if (this.state.session === 'break') {
      this.setState({
        timeRemaining:
          (this.state.breakSession - 1) * 60 >= 0
            ? (this.state.breakSession - 1) * 60
            : 0,
      });
    }
  };

  decreaseTimer = () => {
    this.setState({
      timeRemaining: this.state.timeRemaining - 1,
    });
  };

  sessionToggle = () => {
    if (this.state.timeRemaining === 0) {
      console.log('Times up!');
      this.audioAlert.current.play();
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
      <div className="functional-container">
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
        <audio id="alert" preload="auto" src={sound} ref={this.audioAlert} />
      </div>
    );
  }
}

export default App;
