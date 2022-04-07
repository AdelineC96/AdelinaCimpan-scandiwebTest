import React, {Component} from 'react';
import './NavBar.css'
import logo from '../Images/logo.svg'
import {getProductCategoriesName} from '../../GraphQL/queries'
import {NavLink, withRouter} from 'react-router-dom';
import {Query} from 'react-apollo';
import CurrencyBtn from '../NavBar/CurrencyBtn/currencyBtn'
import CartBtn from './CartBtn/cartBtn';


class NavBar extends Component {
   
    render(){
        const { location } = this.props;
        return(
            <Query query={getProductCategoriesName()}>
                {({loading,error,data})=>{
                    if(loading) return <p>Loading...</p>;
                    if (error) return <p>Error:</p>;
                    const{categories}=data;
                    return(
                        <div className='container'>
                            <ul className='list'>
                                {categories.map(c=>{
                                    return(
                                        <li key={c.name} className='itemNav' >
                                            <NavLink  to={{pathname:`/${c.name}`}} className={({ isActive }) => (isActive ? 'selected' : 'navLink')} >
                                            {c.name.toUpperCase()}
                                            </NavLink>
                                        </li>
                                    )
                                })}
                            </ul>
                            <NavLink to={{pathname:'/all'}} className='navLink'>
                            <button  className='homebutton'>
                                <img className='logo-image' src={logo} alt="logo" />
                            </button>
                            </NavLink>
                            <ul className='navbuttons'>
                                <li >
                                <CurrencyBtn/>
                                </li>
                                <li>
                                    <CartBtn/>
                                </li>
                                
                            </ul>
                        
                        </div>


                    )}}

            </Query>

        )
    }

}


export default NavBar;