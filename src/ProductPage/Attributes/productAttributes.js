import { current } from '@reduxjs/toolkit';
import React, { Component } from 'react'
import './productAttributes.css'

 class ProductAttributes extends Component {
     state={
         color:'',
         size:'',
         capacity:'',
         yes:'',
         no:'',
         isActive:false,
         isSubmitted:false,

     }
     myRef = React.createRef();

      componentDidMount(){
        const {attributes} = this.props.product;
        const updateState=this.props.updateState;
        const updateName=this.props.updateName;
        const updateId=this.props.updateId;
        const item= attributes.map(a=>a.name)
        const reducer= item.reduce(function(previousValue,currentValue){
          return previousValue.concat(currentValue)
        },[])
        console.log(reducer)
        console.log(this.props.product)

        updateState(reducer)
        updateName(this.props.product.id)

      }




         async componentDidUpdate(prevState){
       const{color,size,capacity,yes,no,isSubmitted}= this.state;
          /*console.log(isSubmitted)*/
        /*if(this.mounted&&this.state.isSubmitted){
          const changeAtr=  this.props.activeAtr();
          changeAtr([color,size,capacity])
          this.setState({isSubmitted:false})

        }*/

        if(isSubmitted)
        {        const changeAtr= await this.props.activeAtr;

          changeAtr([color,size,capacity,yes,no])
          this.setState({isSubmitted:false})

        }
       
        
      }

       
    
      

    

      switchAtr = (e)=> {
        console.log(e.target.value, e.target)
            
        const { name, value } = e.target;
        if (name === "Size" ) {
          this.setState({size:value})
       

        }
        if (name === "Color") {
          this.setState({color:value})

        }
        if (name === "Capacity") {
          this.setState({capacity:value})

        }

        if(value==="Yes"){
          this.setState({yes:value})
        }
        if(value==="No"){
          this.setState({no:value})
        }

        

        this.setState({isSubmitted:true})

      };

   
      render() {
       
        const { inStock, attributes } = this.props.product;

            return attributes.map(atr=>{ 
               return (
                   <div   key={atr.name} className='attributes-container' >
                        <h2 className='attributes-title'>{atr.name.toUpperCase()}:</h2>
                       <div className='attributes-list'>
                    
                             {atr.items.map((a,index)=>{
                               return(
                                  <div key={index} className="attributes-form">
                                        {console.log()}
                                         <input
                                            id={a.id+atr.name}
                                            onChange={this.switchAtr}
                                            type='radio'
                                            className='attributes-button'
                                            name={atr.name}
                                            value={a.value}
                                            disabled={!inStock}
                                        />
                                       <label className ={atr.name === "Color" ? 'colored' : 'atr'}
                                             htmlFor={a.id+atr.name}
                                             style={{backgroundColor: atr.name==='Color'&&`${a.displayValue}`}}>
                                         {a.value}
                                       
                                         </label>
                                     </div>
                                 )
                             })}
                         </div>
                     </div>
                   )
             })
        
       }
    
  
}
  


export default ProductAttributes;
