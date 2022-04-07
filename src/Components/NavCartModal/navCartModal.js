import React,{Component} from 'react';
import { createPortal } from 'react-dom';
import { Query } from 'react-apollo';
import { nanoid } from 'nanoid';
import './navCartModal.css';
import TotalCounter from '../TotalCounter/totalCounter'
import Counter from '../Counter/counter'
/**total counter/counter */
import {getProductAttributes} from '../../GraphQL/queries'
import productList from '../CategoryPage/ProductList/productList';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';


class NavCartModal extends Component {
    state={
        total:0
    };

    componentDidMount(){
        window.addEventListener('keydown',this.handleCloseModal)
    }

    componentWillUnmount(){
        window.removeEventListener('keydown', this.handleCloseModal)
    }

    handleCloseModal=(e)=>{
        if(e.key==='Escape' || e.target===e.currentTarget){
            this.props.onCloseModal()
        }
    }


render(){
    const {products,currencies,onCloseModal}=this.props;
    const productName=products.map((product)=>{
        return product.id
    });

    return createPortal(
        <div className='cart-overlay' onClick={this.closeModal}>
            <div className='modal-overlay' style={{overflowY:products.length>3&&'scroll'}}>
                <p className='cart-title'>
                    My Bag,{" "}
                    <span className='total-items'>{products.length} items</span>
                </p>
                {products.map((item,index)=>{
                    return(
                        <Query key={nanoid()} query={getProductAttributes(item.name)}>
                            {({loading,error,data})=>{
                                if(loading) return <p>Loading...</p>;
                                if(error) return <p>Error</p>;
                                const {product}=data;
                               

                                const productName =products.map(a=>a.name)

                                if(productName.includes(item.name)) {}
                                
                                return(
                                    product&& (

                                        <div className='mini-card'>
                                            <div className='left-side'>
                                            <p className='item-brand'>
                                                    {product.brand}
                                                </p>
                                                <p className='item-name'>
                                                    {product.name}
                                                </p>
                                                <p className='item-price'>
                                                {product.prices.map((cur) =>
                                                    cur.currency.symbol === currencies &&
                                                            `${cur.currency.symbol} ${Math.round(cur.amount * item.value * 100) /100 }`)}
                                                    
                                                </p>
                                                <div className='cart-attributes'>
                                                        {item.attributes.map((attr)=>(
                                                           <p key={attr} className='item-attributes' style={{backgroundColor:attr, fontSize: attr.length>5 && 0, width: attr.length>4 && 48, height: attr.length>4 && 35 , padding: attr.length>4 && 4, boxSizing:attr.length>4 && 'border-box',}}>
                                                                {attr}
                                                            </p>
                                                            
                                                        ))}
                                                </div>

                                            </div>
                                              <div className='right-side'>
                                                    <Counter  item={item} id={item.id} value={item.value}/>
                                                    <img className='cart-image' src={product.gallery[0]} alt={product.name} />
                                              </div>

                                        </div> 
                                    )
                                );
                            }}
                        </Query>
                    );
                })}
                <div className='cart-options'>
                    <TotalCounter/>
                    <div className='modal-buttons'>
                        <Link to={{pathname:"/cart"}}>
                            <button className='button-link' onClick={onCloseModal}>
                                View Bag
                            </button>
                        </Link>
                        <button className='check-out'>CHECK OUT</button>
                    </div>

                </div>
            </div>

        </div>,
        document.getElementById('cartModal')
    );
}



}

const mapStateToProps = (state) => ({
    currencies: state.products.currencies,
  });
  
  export default connect(mapStateToProps)(NavCartModal);