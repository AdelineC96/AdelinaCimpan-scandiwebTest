import React, {Component} from 'react';
import './cartBtn.css';
import cart from '../../Images/cart.svg'
import {connect} from 'react-redux';
import NavCartModal from '../../NavCartModal/navCartModal';


class CartBtn extends Component{
        state={showlist:false}




    cartClick=()=>{
        this.setState((prev) => {
            return { showlist: !prev.showlist };
          });
        };

        onModalClose=()=>{
            this.setState({
                showlist:false
            });
        };
    




        render(){
            const {showlist}=this.state;
            const {products}=this.props;
            const mapProducts=products.map(a=>a.value)
            const initialValue = 0;
            const reduceProducts= mapProducts.reduce(
            (previousValue, currentValue,initialValue) => previousValue + currentValue,
            initialValue
        
          );
           
            if(showlist){
                document.body.style.overflowY="hidden";
            } else{
                document.body.style.overflowY="scroll"
            }
            return(
                <div>
                    <button  type="button" className='cartButton' onClick={this.cartClick}>
                        <img src={cart} className="cartIcon" />
                       {reduceProducts>0 &&(
                            <span className='products-preview'>{reduceProducts}</span>
                        )}
                
                    </button>
                    {showlist && <NavCartModal  products={this.props.products} onCloseModal={this.onModalClose}/>}
                    
                </div>

            )
        }


}

const mapStateToProps = (state) => ({
    products: state.products.items,
  });
  
export default connect(mapStateToProps)(CartBtn);