import React, {Component} from 'react';
import './Header.css'
import NavBar from '../NavBar/NavBar';



class Header extends Component{
    render(){
        return(
            <header className='header'>
                <NavBar/>
            </header>
        )
    }
}

export default Header;