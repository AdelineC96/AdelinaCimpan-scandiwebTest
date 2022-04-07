import React, { Component } from 'react'
import { withParams } from '../hocs'
import {Query} from 'react-apollo';
import { nanoid } from 'nanoid';
import { addProduct } from '../reduxActions';
import './productPage.css'
import {connect} from 'react-redux';
import {getProduct} from '../GraphQL/queries'
import ProductAttributes from './Attributes/productAttributes';
import Modal from "react-modal";
import parse from "html-react-parser";



 class ProductPage extends Component {

    state = {
        productId: "",
        selectImage: null,
        ShowMore: false,
        selectedAtribute: [],
        attributes:[],
        id:'',
        name:''
    
      };
      
      
    
      componentDidMount() {
        const  params  = this.props.params.productId;
        this.setState({ productId:params});
        const{getTotals}=this.props;



 
      }

      selectImg=(e)=>{
          const image=e.target.src;
          return this.setState({
              selectImage:image,
          });
      };


      setActiveAttribute = (atr) => {
      const filtered = atr.filter((a) => a !== "");
      this.setState({ selectedAtribute: [...filtered] });

    };

      addProductToCart=(e)=>{
          e.preventDefault();
         

          const{selectedAtribute,attributes}=this.state;
          const {addToCart}=this.props;

          if(selectedAtribute.length<attributes.length){
            alert('Please select your choices')
          }
        
          if(selectedAtribute.length===attributes.length){
            alert('Added to cart')

              addToCart({
                  id:nanoid(),
                  name:this.state.name,
                  attributes:[...selectedAtribute],
                  value:1

              });
              window.location.reload(false);
              this.setState({selectedAtribute:[]})
              this.setState({attributes:[]})

          }


      };

      showMore=()=>{
          this.setState((prev)=>{
              return {...prev, ShowMore: !prev.ShowMore}
          })
      }

      updateState=(state)=>{
          this.setState({attributes:state}, ()=>console.log(this.state.attributes))

      }

      updateId=(state)=>{
        this.setState({id:state},()=>console.log(this.state.id))
      }

      updateName=(state)=>{
        this.setState({name:state},()=>console.log(this.state.name))
      }
    
    


        render(){
            const { productId, selectImage, ShowMore } = this.state;
          
            return(
                <Query query={getProduct(productId)}>
                  
                    {({loading,error,data})=>{
                        if(loading) return <p>Loading...</p>;
                        if(error) return <p>Error `${error.message}`</p>;
                        const {product}=data;
                       
                        return(
                            product&&(
                                <>
                                    <div className='pictures'  > 
                                         <ul  className='pictures-list'>
                                         {product&& 
                                            product.gallery.map(img=>{
                                                return(
                                                    <li onClick={this.selectImg} className='picture-item' key={img}>
                                                        <img className='select-picture' src={img} alt='img'/>
                                                    </li>
                                                   
                                                )
                                            })}
                                        </ul>
                                        <img className='selected-picture' src={!selectImage ? product.gallery[0]: selectImage}
                                            alt='img'
                                        />
                                        <div>
                                            <h3 className='product-brand'>{product.brand}</h3>
                                            <h3 className='product-name'>{product.name}</h3>
                                            <ProductAttributes updateName={this.updateName} updateId={this.updateId} updateState={this.updateState} activeAtr={this.setActiveAttribute} product={product} />
                                            <p className='price-para'>PRICE:</p>
                                            <p className='product-price'>
                                                {product.prices.map(
                                                    prc=>prc.currency.symbol===this.props.currency &&
                                                    `${prc.currency.symbol} ${prc.amount}`
                                                )}
                                            </p>
                                            <button type='button'
                                                onClick={this.addProductToCart}
                                                disabled={!product.inStock&&true}
                                                className="submitBtn">
                                                    {!product.inStock ?'OUT OF STOCK' : 'ADD TO CART'}
                                            </button>
                                                {product.description &&(
                                                    <div className='product-description'>
                                                        {parse(product.description)}
                                                    </div>
                                                )}
                                        </div>
                            
                                    </div>
                                    
                                </>
                            )
                        )
                    }}

                </Query>
            )
        }   
};

const mapStateToProps = (state) => ({
    currency: state.products.currencies,
  });
  const mapDispatchToProps = (dispatch) => ({
    addToCart: (product) => dispatch(addProduct(product)),
  });
  
  
export default connect(mapStateToProps,mapDispatchToProps)(withParams((ProductPage)));
