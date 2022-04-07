import React, { Component } from 'react'
import './popup.css'
import { withParams } from '../../../hocs';
import { createPortal } from "react-dom";
import Content from '../Content';


 class PopUp extends Component {


   

  render() {
    if(!this.props.show){
      return null;
    }
    return createPortal(
      
      <div className='container'>
        <div className='modal'>
          <div className='content-pop'>
          <Content updateName={this.props.updateName} updateId={this.props.updateId} updateState={this.props.updateState} closeModal={this.props.closeModal} onCartBtnClick={this.props.onCartBtnClick} setActiveAttribute={this.props.setActiveAttribute} productId={this.props.productId} product={this.props.product}/>
          </div>
          <div className='popup-buttons'>
               <button className='pop-button' onClick={this.props.closeModal} >
                 Close
               </button>
               <button className='pop-button' onClick={this.props.onCartBtnClick}>
                 Add to cart
               </button>
               </div>
          </div>
          
         
      </div>,
    document.getElementById("modal")

    )
  }
}
export default withParams((PopUp))