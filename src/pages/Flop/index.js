import React from 'react';
import './index.less'
function getElementLeft(element){
  var actualLeft = element.offsetLeft;
  var current = element.offsetParent;
  while (current !==null){
    actualLeft += (current.offsetLeft+current.clientLeft);
    current = current.offsetParent;
  }
  return actualLeft;
}

function getElementTop(element){
  var actualTop = element.offsetTop;
  var current = element.offsetParent;
  while (current !== null){
    actualTop += (current.offsetTop+current.clientTop);
    current = current.offsetParent;
  }
  return actualTop;
}
class Flop extends React.Component{
  constructor (props){
    super(props)
    this.state={
      activeIndex:null,  //翻转的index
    }
    this.cards=[]
    this.centerIndex=4 //正中间的box index
    this.STATUS={
      PACK_UP:0,     //收起
      OPEN_UP:1,     //打开
    }
    this.status=this.STATUS.OPEN_UP

  }
  componentDidMount () {
    this.init()
   }
  bindCardDom=(index,ref)=>{
    if(!ref||this.cards[index]){
      return
    }
    this.cards[index]={dom:ref}
  }
  init(){
    this.cards.map((card,i)=>{
      card.origin={}
      card.origin.x=getElementLeft(card.dom)
      card.origin.y=getElementTop(card.dom)
    })
    let center=this.cards[this.centerIndex].origin
    this.cards.map((card,i)=>{
      card.translate={}
      card.translate.x=center.x-card.origin.x
      card.translate.y=center.y-card.origin.y
    })
  }
  reset(){
    this.steps=0
  }
  //洗牌
  shuffle=()=>{
    this.cards.map((card,i)=>{
      setTimeout((index)=>{
        let el=card.dom
        el.style.transform=`translate(${card.translate.x}px,${card.translate.y}px)`
        if(index===this.cards.length-1){
          this.status=this.STATUS.PACK_UP
        }
      },100*i,i)
    })

  }
  //发牌
  licensing=()=>{
    this.cards.map((card,i)=>{
      setTimeout((index)=>{
        let el=card.dom
        el.style.transform=''
        if(index===this.cards.length-1){
          this.status=this.STATUS.OPEN_UP
        }
      },150*i,i)
    })
  }
  handleStart=()=>{
    console.log(this.status)
    switch (this.status) {
      case this.STATUS.OPEN_UP:
        return this.shuffle()
      case this.STATUS.PACK_UP:
        return this.licensing()
      default:
        return
    }
  }
  handUpTurn=(index)=>{
    this.setState({
      activeIndex:index
    })
    console.log(index)
  }

  render(){
    const {activeIndex}=this.state
    return (
      <div className="container">
        <div className="flop-box">
          {new Array(9).fill(true).map((_,index)=>{
            if(index!==4){
              return (
                <div
                  key={index}
                  ref={this.bindCardDom.bind(this,index)}
                  onClick={this.handUpTurn.bind(this,index)}
                  className={`box-item flop-card ${index===activeIndex?'active':''}`}>
                  <div className="card-face card-front">front</div>
                  <div className="card-face card-back">back</div>
                </div>
              )
            }else{
              return (
                <div
                  onClick={this.handleStart}
                  ref={this.bindCardDom.bind(this,index)}
                  key={index}
                  className="box-item flop-button">
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
