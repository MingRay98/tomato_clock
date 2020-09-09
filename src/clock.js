import React from 'react';
import close from './assets/close.png';
import greenTomato from './assets/tomato--green.svg';
import redTomato from './assets/tomato--orange.svg';
import bell from './assets/icon-bell.svg';
import cancel from './assets/icon-cancel.svg';
import greenPlay from './assets/icon-play--green.svg';
import orangepause from './assets/icon-pause--orange.svg';
import mp3 from './assets/music.mp3';
import './clock.css';

const dayOfWeekArray = [
    '星期日','星期一','星期二','星期三','星期四','星期五','星期六'
]

const initialState = {
  date: new Date(),
  restState : false,
  bellState: false,
  countDownAllSeconds: 300,
  countDownSeconds: 300,
  audio: null,
  alertText: '',
};

class clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = initialState;
    }

    componentDidMount() {
      this.getNowTimeID = setInterval(this.getNowTime, 1000);
      this.countDownTimeID = setInterval(this.countDownTime, 1000);
      this.addAudio();
    }
  
    componentWillUnmount() {
      const {audio} = this.state;
      clearInterval(this.getNowTimeID);
      clearInterval(this.countDownTimeID);
      audio.pause();
    }

    getNowTime = () => {
        this.setState({
          date: new Date()
        });
    }

    addAudio = () => {
      const audio = document.createElement("audio");
      audio.src = mp3;
      this.setState({audio: audio});
    }

    countDownTime = () => {
      const {countDownSeconds, countDownAllSeconds, audio} = this.state;
      if(countDownSeconds !== 0){
        this.setState({countDownSeconds: countDownSeconds - 1});
      }else{
        audio.currentTime = 0;
        audio.play();
        clearInterval(this.countDownTimeID);
        this.setState({countDownSeconds: countDownAllSeconds, restState: true});
      }
  }

    changeState = () => {
      const {restState, audio} = this.state;
      if(restState) {
        audio.pause();
        this.countDownTimeID = setInterval(this.countDownTime, 1000);
        this.setState({restState: false});
      }else{
        audio.play();
        clearInterval(this.countDownTimeID);
        this.setState({restState: true});
      }
    }

    restart = () => {
      const {countDownAllSeconds, audio} = this.state;
      audio.play();
      clearInterval(this.countDownTimeID);
      this.setState({
        countDownSeconds: countDownAllSeconds,
        restState: true
      });
    }

    bell = () => {
      this.setState({bellState: true});
    }

    setTime = () => {
      let min = document.getElementById("min").value;
      const sec = document.getElementById("sec").value;
      if(min.length === 0 || sec.length === 0){
        this.setState({alertText:'請輸入正確格式的時間!!'});
        return;
      }
      if(sec > 60){
        this.setState({alertText:'秒數超過了~><'});
        return;
      }
      if(!this.checkNumber(min) || !this.checkNumber(sec)){
        console.log(this.checkNumber(min));
        this.setState({alertText:'請輸入正確格式的時間!!'});
        return;
      }
      const countDownSeconds = parseInt(min) * 60 + parseInt(sec);
      this.setState({bellState: false, 
        countDownSeconds: countDownSeconds, 
        countDownAllSeconds: countDownSeconds,
        alertText: ''});
    }

    checkNumber = (nubmer) => {
      const re = /^\+?[0-9][0-9]*$/;
      if (re.test(nubmer)){
        　return true;
      } else {
        return false;
      }
    }

    getMinutes = () => {
        const {date} = this.state;
        const minute = date.getMinutes();
        const minuteString = minute.toLocaleString();
        if(minuteString.length === 1)
            return '0' + minute;
        return minute;
    }

    getHours = () => {
        const {date} = this.state;
        const hour = date.getHours();
        const hourString = hour.toLocaleString();
        if(hourString.length === 1)
            return '0' + hour;
        return hour;
    }

    getcountDownText = () => {
      const {restState} = this.state;
      if(restState){
        return (
          <div className = 'rest' style={{fontSize:this.isMobile()?'12px':'1.5vw'}}>
            <div className = 'restTitle'>休息，<br/>
            </div>
            是為了下一次的路，<br/>
            聽首歌休息一下吧~^^
          </div>
        );
      }
      return (
        <div className = 'rest' style={{fontSize:this.isMobile()?'12px':'1.5vw'}}>
          <div className = 'restTitle'>Fighting!!<br/>
          </div>
          人生就是不停的戰鬥!!<br/>
          在時間內完成自己想做的事情吧~
        </div>
      );
    }

    isMobile = () => {
      try{ 
        document.createEvent("TouchEvent"); return true; 
      }catch(e){ 
        return false;
      }
    }

    closeTooltip = () => {
      this.setState({bellState: false, alertText: ''});
    }
    

    msToTime = (duration) => {
      let seconds = (duration % 60).toLocaleString();
      let minutes = (Math.floor(duration / 60)).toLocaleString();
      minutes = (minutes.length === 1) ? "0" + minutes : minutes;
      seconds = (seconds.length === 1) ? "0" + seconds : seconds;
    
      return minutes + ":" + seconds;
    }

    render() {
      const {date, restState, countDownSeconds, bellState, alertText} = this.state;
      const {clockState} = this.props;
      return (
        <div className = "main" >
          {bellState && 
          <div className = "tooltipBlock">
            <div className = "tooltip">
                <div onClick={this.closeTooltip}><img src={close} className="close"></img></div>
                <div style={{width:'100%', display:'flex', justifyItems:'center', alignItems:'center', flexDirection:'column'}}>
                  <div className = "tooltipTitle">設定時間:</div>
                  <div className = "tooltipContent" >
                    請輸入想倒數的時間:<br/>
                  <input className = "tooltipInput" id='min'></input>:
                  <input className = "tooltipInput" id='sec'></input>
                  </div>
                  <div className = "alert">{alertText}</div>
                  <button className = "tooltipButton" onClick={this.setTime}>確定</button>
                </div>
            </div>
          </div>}
          <div className = "nowTimeBlock">
            <div className = "nowTime">
              <div className = "dateTime">
                {date.getFullYear() + '/' + (Number(date.getMonth())+1) + '/' + date.getDate()}
              </div>
              <div className = "weekTime">
                {dayOfWeekArray[date.getDay()]}
              </div>
                {this.getHours() + ':' + this.getMinutes()}
            </div>
          </div>
          <div className = "countDownBlock" style={{flexDirection: clockState? "row" : "column-reverse"}}>
            <div className = "countDownTimeBlock">
              <div className = "countDownTime">
                {this.msToTime(countDownSeconds)}
              </div>
              <div className = "countDownButtons">
                <button className = "countDownButton" onClick = {this.bell}>
                  <img src={bell} className = "countDownbuttonImg" alt = "logo" />
                </button>
                <button className = "playButton" onClick = {this.changeState}>
                  <img src={restState ? greenPlay : orangepause} className = "playButtonImg" alt = "logo" />
                </button>
                <button className = "countDownButton" onClick = {this.restart} >
                  <img src={cancel} className = "countDownbuttonImg" alt = "logo" />
                </button>
              </div>
            </div>
            <div className = "countDownText">
              {this.getcountDownText()}
            </div>
          </div>
          <div className = "tomatoClock">
            <img src={restState ? greenTomato : redTomato} className = "tomatoImg" alt = "logo" />
          </div>
        </div>
      );
    }
  }
export default clock;

