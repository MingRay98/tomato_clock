import React from 'react';
import { BrowserRouter, Route, Link} from "react-router-dom"
import analysisImg from './assets/icon-analysis.svg';
import listImg from './assets/icon-list.svg';
import Clock from './clock';
import Analysis from './analysis';
import './App.css';

const initialState = {
  clockState: true
};

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  clock = () => {
    this.setState({clockState: true});
  }

  toDoThing = () => {
    this.setState({clockState: false});
  }

  render() {
    const {clockState} = this.state;
    return (
      <div className="App">
        <div className="menu">
          <div className="menuButtons" onClick = {this.clock}>
            <img src={listImg} className="menuButtonImg" alt="logo" />
          </div>
          <div className="menuButtons" onClick = {this.toDoThing}>
            <img src={analysisImg} className="menuButtonImg" alt="logo" />
          </div>
        </div>
        <div className="content">
          {!clockState &&
            <div className = 'toDoThingBlock'>
              <Analysis/>
            </div>
          }
          <div className = 'clockBlock' style = {{width: clockState ? '100%':'50%'}}>
            <Clock clockState = {clockState}/>
          </div>
        </div>
      </div>
    );
  }
}
export default App;

