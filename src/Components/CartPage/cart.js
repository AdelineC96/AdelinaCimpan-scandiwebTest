import React, {Component} from 'react';
import { Query } from 'react-apollo';
import './cart.css';
import {getProductAttributes} from '../../GraphQL/queries'
import Counter from '../Counter/counter';
import TotalCounter from '../TotalCounter/totalCounter';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { connect } from 'react-redux';


class Cart extends Component {



    render(){
        const {products,currencies}=this.props;
        return(
            <div className='cart-container'>
                <h2 className='cartpage-name'>
                    CART
                </h2>
                {products.length? (
                    <ul>
                        {products.map((item)=>{
                            return(
                                <li key={item.id} id={item.id} className="cart-item" >
                                    <Query query={getProductAttributes(item.name)}>
                                        {({loading,error,data})=>{
                                            if (loading) return <p>Loading...</p>;
                                            if (error) return <p>Error</p>;
                                            const {product}=data;
                                            return(
                                                product &&(
                                                    <div className='cart-card'>
                                                        <div className='cart-leftside'>
                                                            <p className='cart-item-brand'>
                                                                {product.brand}
                                                            </p>
                                                            <p className='cart-item-name'>
                                                                {product.name}
                                                            </p>
                                                            <p className='cart-item-price'>
                                                                {product.prices.map((prc)=>prc.currency.symbol===currencies &&
                                                                `${prc.currency.symbol} ${Math.round(prc.amount*item.value*100)/100}`)}
                                                            </p>
                                                            <div className='cart-attributes'>
                                                                {item.attributes.map((attr,index)=>(
                                                                    <p key={index} style={{backgroundColor:attr}} className={attr.includes("#") ? 'cart-color-attribute' : 'cart-item-attribute'}>
                                                                        {attr}
                                                                    </p>    
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className='cart-rightside'>
                                                            <Counter id={item.id} value={item.value} item={item}/>
                                                            <Carousel className='cart-carousel' showThumbs={false}
                                                            showIndicators={false} centerMode={true} width={'141px'}
                                                            emulateTouch={true} centerSlidePercentage={100} swipeable={true}
                                                            infiniteLoop={true} useKeyboardArrows={true} showStatus={false}
                                                            >
                                                                {product.gallery.map((img,index)=>{
                                                                    return(
                                                                        <img key={index} className='cart-img-item' src={img} alt={product.name} />
                                                                    );
                                                                })}
                                                            </Carousel>
                                
                                                        </div>
                                                    </div>
                                                )
                                            );
                                        }}
                                    </Query>
                                </li>
                            );
                        })}
                        <TotalCounter/>
                    </ul>
                ): (<p className='empty-cart'>No products in the cart.</p>)}

            </div>

        )
    }
}


const mapStateToProps = (state) => ({
    products: state.products.items,
    currencies: state.products.currencies,
  });
  
  export default connect(mapStateToProps)(Cart);
  