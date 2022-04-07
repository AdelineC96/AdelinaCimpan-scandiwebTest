import {createReducer, combineReducers} from '@reduxjs/toolkit';
import {addProduct,removeProduct,changeCurrency} from './reduxActions'


const initialState={
    products:{
        items:[],
        currencies:'$',
        totalAmount:0,
        totalCount:0
    },
};
const productReducer=createReducer( initialState.products.items,(builder)=>{
    builder.addCase(addProduct,(state,{payload})=>{
            const existingIndex=state.findIndex(
                (item)=>item.id===payload.id
            );
          
            if(existingIndex>=0 ){
                state[existingIndex]={
                    ...state[existingIndex],
                    value:state[existingIndex].value+1,
                }
            } else{
                let tempProductItem={...payload};
                state.push(tempProductItem)
            }



    }).addCase(removeProduct,(state,{payload})=>{
       const itemIndex=state.findIndex((item)=>item.id===payload.id)
       console.log(state[itemIndex].value)
        if(state[itemIndex].value>1){
            state[itemIndex].value -=1;
        } else if (state[itemIndex].value===1){
            const nextCartItems=state.filter(
                (item) => item.id !== payload.id)
        
            state=nextCartItems
            return state;
        }


    })   
}
);

const currencyReducer= createReducer(initialState.products.currencies,(builder)=>{
    builder.addCase(changeCurrency,($, {payload})=>{
        return payload
    });
});

const mainReducer= combineReducers({
    items: productReducer,
    currencies:currencyReducer
});

export default mainReducer;