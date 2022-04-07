import React, {Component} from 'react';
import './categoryPage.css';
import ProductList from './ProductList/productList';
import { withParams } from '../../hocs'




class CategoryPage extends Component{
    render(){
        return(
            <section className='container'>
                <ProductList pageCategory={this.props.params.categoryName}/>
            </section>
        )
    }


}

export default withParams((CategoryPage));