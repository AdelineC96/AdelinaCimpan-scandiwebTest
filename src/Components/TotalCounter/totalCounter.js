import React, {Component} from 'react';
import { connect } from 'react-redux';
import './totalCounter.css';
import {getPrices} from '../../GraphQL/queries';
import { Query } from 'react-apollo';


class TotalCounter extends Component{

    

    totalCount=(items)=>{
        const {products,currency}=this.props;
    


       const productValue=products.map(({value})=>value)

      const prices = items.map(({ prices }) => {
            const allprices = prices.filter((price) => {
              return price.currency.symbol === currency && price;
            });
            return allprices.reduce((accumulator, price) => {
              return accumulator + price.amount;
            }, 0);
          });

        
        const total=prices.reduce((accumulator,item,index)=>{return accumulator+item*productValue[index]
        },0);
                 
                 return total;

        



    }


    render(){
        const {products,currency}=this.props;
        return(
            <Query query={getPrices()}>
            {({loading,error,data})=>{
                if (loading) return <p>Loading...</p>
                if (error) return <p>Error:</p>
                const productName=products.map((product)=>{
                    return product.name
                });

                const items=data.category.products.filter(({id})=>{
                    return productName.includes(id);
                });
                return(
                    <p className='total'>
                    <span>Total</span>
                    <span className='total-price'>
                        {Math.round(this.totalCount(items) * 100) / 100} {currency}
                    </span>
                    </p>
                )
            }}

            </Query>
        )
    }

}

const mapStateToProps=(state)=>({
    currency: state.products.currencies,
    products:state.products.items,
});

export default connect(mapStateToProps)(TotalCounter);

