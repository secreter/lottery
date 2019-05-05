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

    this.TOTAL=9
    this.degree=360/this.TOTAL
    this.skewDeg=90-this.degree
    this.sectors=new Array(this.TOTAL).fill(Object.create({}))
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
                transform: `translate(50%,50%) rotate(${this.degree*index}deg) skew(${this.skewDeg}deg)`
              }
              let styleInner={
                transform:`translate(50%,50%) rotate(${this.degree*0}deg) skew(-0deg)`
              }
              let imgBoxStyle={
                transform:`skew(-${this.skewDeg}deg) rotate(${this.degree/2+90}deg) translate(-${Math.tan(this.degree/2*Math.PI/180)*70}px,-100px)`
              }
              return (
                <Fragment key={index}>
                  <div

                    style={style}
                    className="turntable-item-bg">
                      <div className="img-box" style={imgBoxStyle}>
                        好
                      </div>
                  </div>
                  {/*<div className="turntable-item" style={styleInner}>*/}
                    {/*好人*/}
                  {/*</div>*/}
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
