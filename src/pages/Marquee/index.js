import React from 'react';
import './index.less'

class Flop extends React.Component{
  constructor (props){
    super(props)
    this.state={
      activeIndex:null
    }
    this.orders=[0,1,2,5,8,7,6,3]
    this.orderIndex=0
    this.timer=null
    this.steps=0
    this.needSteps=10
  }
  reset(){
    this.steps=0
  }
  handleStart=()=>{
    this.timer=setInterval(()=>{

      this.setState({
        activeIndex:this.orders[this.orderIndex]
      })
      this.orderIndex=++this.orderIndex%8
      console.log(this.orders[this.orderIndex])
      if(this.steps++===this.needSteps){
        clearInterval(this.timer)
      }
      },500)
  }
  render(){
    const {activeIndex}=this.state
    return (
      <div className="container">
        <div className="flop-box">
          {new Array(9).fill(true).map((_,index)=>{
            if(index!==4){
              return (
                <div key={index} className={`box-item flop-card ${index===activeIndex?'active':''}`}>

                </div>
              )
            }else{
              return (
                <div onClick={this.handleStart} key={index} className="box-item flop-button">
                  开始翻牌
                </div>
              )
            }
          })}
        </div>
      </div>
    )
  }
}
export default Flop
