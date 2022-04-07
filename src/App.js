import React, {Component} from 'react';
import {Route,Routes} from 'react-router';
import Header from './Components/Header/Header';
import './App.css'
import CategoryPage from '../src/Components/CategoryPage/categoryPage'
import ProductPage from './ProductPage/productPage';
import Cart from './Components/CartPage/cart';

/*<Route path='/cart' component={CartPage} />
        <Route exact path='/products/:productID' component={ProductPage}/> */

class App extends Component {
 render(){
   return (
    <>
      <Header/>
      <Routes>
      <Route path="/" element={ <CategoryPage />}/>
      <Route path="/:categoryName" element={ <CategoryPage />}/>
      <Route path="/products/:productId" element={<ProductPage/>} />
      <Route path="/cart" element={<Cart/>} />
      </Routes>
     </>
   )
 }
}

export default App;
