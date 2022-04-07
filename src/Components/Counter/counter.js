import { nanoid } from 'nanoid';
import React,{Component} from 'react';
import { connect } from 'react-redux';
import { addProduct,removeProduct } from '../../reduxActions';
import './counter.css';


class Counter extends Component{
    
    
  
    increment=(e)=>{
        const {addToCart}=this.props;
        addToCart({
            id:this.props.item.id,
            name:this.props.item.name,
            attributes:this.props.item.attributes,
            value:this.props.item.value

        });

       
    };

    decrement=()=>{
           this.props.removeProduct(this.props.item)
    }


    render(){
        return(
            <div className='counter'>
                <button id={this.props.id} className='button' onClick={this.increment}>
                    +
                </button>
                <span className='value'>
                    {this.props.value}
                </span>
                <button className='button' onClick={this.decrement}>
                    -
                </button>

            </div>
        );
    }
}

const mapDispatchToProps=(dispatch)=>({
    removeProduct:(id)=>dispatch(removeProduct(id)),
    addToCart: (product) => dispatch(addProduct(product)),
})

export default connect(null, mapDispatchToProps)(Counter)