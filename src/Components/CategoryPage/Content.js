import React, {Component} from 'react';
import ProductAttributes from '../../ProductPage/Attributes/productAttributes';
import {Query} from 'react-apollo';
import {getProduct} from '../../GraphQL/queries'
import '../CategoryPage/CategoryList/popup.css'


class Content extends Component {
  render() {
    const {productId}=this.props;


 
    return (
        < >
        <Query query={getProduct(productId)}>
                  {({loading,error,data})=>{
                    if(loading) return <p>Loading..</p>;
                    if(error) return <p>Error</p>;
                    const {product}=data

                    return(
                       product&& product.attributes ?(
                          <>
                          <p className='popup-product'>{product.name}</p>
                         { <ProductAttributes updateName={this.props.updateName} updateId={this.props.updateId} updateState={this.props.updateState} activeAtr={this.props.setActiveAttribute} product={product}  /> }
                          </>
                      ): (<p className='no-options'>No options to select. Just add to cart</p>
                      )
                    )
                  }}

                </Query>
           

      </>
    );
  }
}

export default Content;







