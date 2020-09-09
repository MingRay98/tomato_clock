import React from 'react';
import './analysis.css';
import chart from './assets/chart_1.png';
import chart2 from './assets/chart_2.png';
import chart3 from './assets/chart_3.png';
import chart4 from './assets/chart_4.png';

const weekData = ['2020/08/01~2020/08/08','2020/08/09~2020/08/16','2020/08/16~2020/08/23','2020/08/24~2020/08/31',]

const imageArray = [chart, chart2, chart3, chart4]

const initialState = {
    dt : new Date(),
    second: 0,
    index:2,
  };
class analysis extends React.Component{
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    handleLeft =()=> {
      const {index} = this.state;
      if(index === 3){
        const right = document.getElementById('right');
        right.style.visibility = "visible";
        this.setState({index: index-1});
      }else if(index-1 > 0 ){
        this.setState({index: index-1});
      }else{
        this.setState({index: index-1});
        const left = document.getElementById('left');
        left.style.visibility = "hidden";
      }
    }
  
    handleRight =()=> {
      const {index} = this.state;
      if(index === 0){
        const left = document.getElementById('left');
        left.style.visibility = "visible";
        this.setState({index: index+1});
      }else if(index +1 < weekData.length-1){
        this.setState({index: index+1});
      }else{
        this.setState({index: index+1});
        const right = document.getElementById('right');
        right.style.visibility = "hidden";
      }
    }

    isMobile = () => {
      try{ 
        document.createEvent("TouchEvent"); return true; 
      }catch(e){ 
        return false;
      }
    }

  render() {
    const {index} = this.state;
    return (
      <div className = "main">
        <div className ="title" style={{fontSize:this.isMobile()?'20px':'40px'}}>專注度分析</div>
        <div className ="toDoTing" style={{height:this.isMobile()?'90%':'45%'}}>
          <div className="todayBlock"> 
            今日  
            <div className="today">
              <div className="notYetBlock">
                <div className="notYet" style={{fontSize:this.isMobile()?'18vw':'8vw'}}>2</div>
                <div>已完成</div>
              </div>
              <div className="vertical-line" />
              <div className="alreadyBlock">
                <div className="already" style={{fontSize:this.isMobile()?'18vw':'8vw'}}>3</div>
                <div>待辦事項</div>
              </div>
            </div>
          </div>
          <div className="thisWeekBlock">
            本周
            <div className="thisWeek">
            <div className="notYetBlock">
                <div className="notYet" style={{fontSize:this.isMobile()?'18vw':'8vw'}}>10</div>
                <div>已完成</div>
              </div>
              <div className="vertical-line" />
              <div className="alreadyBlock">
                <div className="already" style={{fontSize:this.isMobile()?'18vw':'8vw'}}>9</div>
                <div>待辦事項</div>
              </div>
            </div>
          </div>
        </div>
        {!this.isMobile() && <div className ="table">
          <div className= "arrowBlock">
            <div className="left-arrow" id="left" onClick={this.handleLeft}></div>
            <div>{weekData[index]}</div>
            <div className="right-arrow" id="right" onClick={this.handleRight}></div>
          </div>
          <img src={imageArray[index]} className="charImg" alt="logo" />
        </div>}
      </div>
    );
  }
}
export default analysis;

