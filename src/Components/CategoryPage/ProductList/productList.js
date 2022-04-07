import React,{Component} from "react";
import {connect} from 'react-redux';
import { Query } from "react-apollo";
import{getProductCategories,getAllProducts} from'../../../GraphQL/queries'
import { nanoid } from 'nanoid'
import { addProduct } from "../../../reduxActions";
import CategoryList from '../CategoryList/categoryList'
import withParams from "../../../hocs";
import Modal from 'react-modal';

class ProductList extends Component{

    state={
        selectedAtribute:[],
        attributes:[],
        isOpen:false,
        productId:'',
        id:'',
        name:'',
    }


    changeCategory=(category)=>(category? category:null);

    selectCategoryBtn=(e)=>{
        this.setState({category:e.target.textContent});
    };

    setActiveAttribute = (atr) => {
      const filtered = atr.filter((a) => a !== "");
      this.setState({ selectedAtribute: [...filtered] });

    };


      onCartBtnClick=(e)=>{
        e.preventDefault();
          const{selectedAtribute,productId,attributes}=this.state;
          const {addToCart}=this.props;
          if(selectedAtribute.length<attributes.length){
            alert('Please select your choices')

          }
        
          if(selectedAtribute.length===attributes.length){
              alert('Added to cart')
              this.setState({isOpen:false})
              
              addToCart({
                  id:nanoid(),
                  name:this.state.name,
                  attributes:[...selectedAtribute],
                  value:1
              });
              this.setState({selectedAtribute:[]})
              this.setState({attributes:[]})
              this.closeModal();

          }


    };

    updateState=(state)=>{
        this.setState({attributes:state}, ()=>console.log(this.state.attributes))

    }

    updateId=(state)=>{
        this.setState({id:state},()=>console.log(this.state.id))
      }
    

    updateName=(state)=>{
        this.setState({name:state},()=>console.log(this.state.name))

    }
  

      

      toggleModal=(e)=>{
          e.preventDefault()
        this.setState({productId:e.target.id})

        this.setState({isOpen:true})

    }

    closeModal=()=>{
        this.setState({isOpen:false})
        this.setState({productId:''})


    }


    render(){
        const {pageCategory}=this.props;
        return(
            <Query query={pageCategory==='all' || pageCategory===undefined
                ? getAllProducts()
                : getProductCategories()            
               }
            >
                {({loading,error,data})=>{
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error </p>;
                    const allCategories=this.changeCategory(data);


                    return(
                        <div>
                            {allCategories.category ? (
                                <CategoryList updateName={this.updateName}  updateId={this.updateId} updateState={this.updateState} closeModal={this.closeModal} toggleModal={this.toggleModal} productId={this.state.productId} isOpen={this.state.isOpen} setActiveAttribute={this.setActiveAttribute} onCartBtnClick={this.onCartBtnClick} key={allCategories.category.name} category={allCategories.category}/>
                            )
                            :
                            (allCategories.categories.map(
                                (cat)=>
                                `${cat.name}`===pageCategory && (
                                    <CategoryList updateName={this.updateName} updateId={this.updateId} updateState={this.updateState} closeModal={this.closeModal} toggleModal={this.toggleModal} productId={this.state.productId} isOpen={this.state.isOpen} setActiveAttribute={this.setActiveAttribute}   onCartBtnClick={this.onCartBtnClick} key={cat.name} category={cat}/>
                                )
                            ))
                            
                        }
                        </div>
                    )

                }}

            </Query>
        )
    }



}

const mapDispatchToProps = (dispatch) => ({
    addToCart: (product) => dispatch(addProduct(product)),
  });
export default connect(null, mapDispatchToProps)(ProductList);