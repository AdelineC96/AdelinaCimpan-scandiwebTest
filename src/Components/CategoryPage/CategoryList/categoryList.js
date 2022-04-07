import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import shoppingCart from '../../Images/shoppingCart.png'
import withParams from '../../../hocs';
import { changeCurrency } from '../../../reduxActions';
import './categoryList.css'
import PopUp from './popup';

/**(e)=>this.props.onCartBtnClick(e) */
class CategoryList extends Component {

    

  render() {
      const category=this.props.category;
      const product=category.products.map((prd)=>prd)
      const onCartBtnClick=this.props;
    return (
      <>
        <h2 className='title'>{category.name}</h2>
        <ul className='list'>
            {category.products.map(c=>{
                return(
                <li key={c.name} className='item'>
                        <Link className='item-link'
                                to={{pathname:`/products/${c.id}`}}>
                        <img className='item-image' src={c.gallery[0]} alt='item' />
                        {!c.inStock && <p className='out-stock'> OUT OF STOCK</p>}
                        <p className='item-name'>{c.name}</p>
                        <p className='item-price'>
                            {c.prices.map(prc=>{ 
                                return prc.currency.symbol===this.props.currencies&& `${prc.currency.symbol} ${prc.amount}`
                            })}
                        </p>
                        </Link>
                        {c.inStock && (
                            <div id={c.id} onClick={(e)=>this.props.toggleModal(e)} className='addBtn' type='submit'>
                                <img id={c.id} className="btn-svg" src={shoppingCart} alt="addToCart" />
                            </div>
                        )}
                </li>
                        
                )
                
            })}

        </ul>
        { < PopUp show={this.props.isOpen} updateName={this.props.updateName} updateId={this.props.updateId} updateState={this.props.updateState} closeModal={this.props.closeModal} onCartBtnClick={this.props.onCartBtnClick} setActiveAttribute={this.props.setActiveAttribute} productId={this.props.productId} category={product.id} product={product} /> }

      </>
    )
  }
}

const mapStateToProps=(state)=>({
    currencies:state.products.currencies,
});

const mapDispatchToProps=(dispatch)=>({
    onChangeCurrency: (currency)=> dispatch(changeCurrency(currency)),
});

export default connect(mapStateToProps,mapDispatchToProps)(CategoryList);

               