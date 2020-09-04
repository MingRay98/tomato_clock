import React from 'react';
import './analysis.css';

const initialState = {
    dt : new Date(),
    second: 0,
  };
class analysis extends React.Component{
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        this.timerID = setInterval(
          this.initClock,
          1000
        );
    }
    
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    initClock = () => {
        console.log('0.0');
        const {dt} = this.state;
        this.setState({second: dt.getSeconds()});
    }

  render() {
    const {second} = this.state;
    return (
      <div className = "main">
        <div className ="title">專注度練習</div>
      </div>
    );
  }
}
export default analysis;

