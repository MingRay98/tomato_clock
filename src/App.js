import React from 'react';
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

  isMobile = () => {
    try{ 
      document.createEvent("TouchEvent"); return true; 
    }catch(e){ 
      return false;
    }
  }

  getStyles = () => {
    const {clockState} = this.state;
    if(this.isMobile()){
      return (
        <div className = 'clockBlock' style = {{height: clockState ? '100%':'50%'}}>
          <Clock clockState = {clockState}/>
        </div>
      );
    }
    return (
      <div className = 'clockBlock' style = {{width: clockState ? '100%':'50%'}}>
        <Clock clockState = {clockState}/>
      </div>
    );
  }

  getOfButtonStyles = () => {
    if(this.isMobile()){
      return (
      <div>
        <div className="circleButton" onClick = {this.clock}/>
        <div className="circleButton2" onClick = {this.toDoThing}/>
      </div>
      );
    }
    return (
        <div>
          <div className="menuButtons" onClick = {this.clock}>
            <img src={listImg} className="menuButtonImg" alt="logo" />
          </div>
          <div className="menuButtons" onClick = {this.toDoThing}>
            <img src={analysisImg} className="menuButtonImg" alt="logo" />
          </div>
        </div>
    );
  }

  render() {
    const {clockState} = this.state;
    return (
      <div className="App">
        <div className="menu">
          {this.getOfButtonStyles()}
        </div>
        <div className="content">
          {!clockState &&
            <div className = 'toDoThingBlock'>
              <Analysis/>
            </div>
          }
          {this.getStyles()}
        </div>
      </div>
    );
  }
}
export default App;

