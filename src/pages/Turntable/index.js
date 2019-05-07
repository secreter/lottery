import React,{Fragment} from 'react';
import './index.less'

class Turntable extends React.Component {
  constructor (props) {
    super(props)
    this.STATUS={
      STOP:0,
      ROTATTING:1
    }
    this.state = {
      status:this.STATUS.STOP
    }

    this.TOTAL=10

    this.radius=375/2
    this.degree=360/this.TOTAL
    this.halfDegree=this.degree/2
    this.skewDeg=90-this.degree
    this.textRadius=0.5*this.radius //文字的上边到圆心的距离
    this.textBlockHeight=24 //文字块高度
    this.sectors=new Array(this.TOTAL).fill(Object.create({}))
  }
  getTurntableItemStyle=(index)=>{
    return {
      //居然和顺序有关
      transform: `translate(100%,100%) rotate(${-(this.halfDegree+90)+this.degree*index}deg) skew(${this.skewDeg}deg)`
    }
  }
  getTurntableItemTextStyle=(index)=>{
    let y=this.textRadius
    let x=(this.textRadius-this.textBlockHeight)*Math.tan(this.halfDegree*Math.PI/180)
    return {
      width:2*x+'px',
      //居然和顺序有关
      transform: `skew(${-this.skewDeg}deg) rotate(${(this.halfDegree+90)}deg) translate(${-x}px,${-y}px)`
    }
  }
  componentDidMount () {
    this.init()
  }

  init(){

  }
  bindDom=(index,ref)=>{
    if(!ref||this.sectors[index]){
      return
    }
    this.sectors[index]={dom:ref}
  }
  start=()=>{
    this.setState({
      status:this.STATUS.ROTATTING
    })
  }
  render(){
    const {status}=this.state
    return (
      <div>
        <div
          onClick={this.start}
          className={`turntable ${status===this.STATUS.ROTATTING?'active':''}`}>
          {
            this.sectors.map((sector,index)=>{

              let style={
                //居然和顺序有关
                // transfororm: `translate(50%,50%) rotate(${this.degree*index}deg) skew(${this.skewDeg}deg)`
              }
              let styleInner={
                // transform:`translate(50%,50%) rotate(${this.degree*0}deg) skew(-0deg)`
              }
              let imgBoxStyle={
                // transform:`skew(-${this.skewDeg}deg) rotate(${this.degree/2+90}deg) translate(-${Math.tan(this.degree/2*Math.PI/180)*70}px,-100px)`
              }
              return (
                <Fragment key={index}>
                  <div
                    style={this.getTurntableItemStyle(index)}
                    className="turntable-item">
                      <div className="turntable-item-text" style={this.getTurntableItemTextStyle(index)}>
                        好
                      </div>
                  </div>
                </Fragment>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default Turntable
