import React, { Component } from "react";
import { Query } from "react-apollo";
import {getCurrencies} from '../../../GraphQL/queries';
import { connect } from 'react-redux';
import './currencyBtn.css';
import {changeCurrency} from '../../../reduxActions';
import down from '../../Images/down.png'


class CurrencyBtn extends Component{

        
        state={showCurrencies:false,
               }

         currencyWrapperRef = React.createRef();
      
        componentDidMount() {
                    document.addEventListener('mousedown', this.handleClickOutside);
                  }


        handleClickOutside=(ev)=>{
            if (!this.currencyWrapperRef.current?.contains(ev.target)) {
                this.setState({showCurrencies: false});

        }
    }

        onBtnClick=()=>{
            this.setState((prev)=>{
                return{showCurrencies:!prev.showCurrencies}
            });
           
            
        };

        changeCurrency=(ev)=>{
            this.props.onChangeCurrency(ev.target.id)
            this.setState({showCurrencies:false})
        }


        render(){
            const {showCurrencies,showSymbol}=this.state;

            return(
                <Query query={getCurrencies()}>
                    {({loading,error,data})=>{
                        if(loading) return <p>Loading...</p>;
                        if (error) return <p>Error</p>;
                        const{currencies}=data;
                        return(
                            <div ref={this.currencyWrapperRef }>
                                <button className="currency-button" type="button" onClick={this.onBtnClick}>
                                   {this.props.currencies}
                                   <img className="down" src={down} />
                                </button>
                                {showCurrencies&& (
                                    <div className="currency-options">
                                        {currencies.map((currency,index)=>{
                                            return(
                                                <button className="options-button" key={index} id={currency.symbol} onClick={this.changeCurrency}  >
                                                    {currency.symbol}
                                                    &#160;
                                                    {currency.label}
                                                    
                                                </button>
                                            )
                                        })}
                                    </div>
                                )
                                }
                            </div>
                        )
                    }}

                </Query>
            )

        }
}

  const mapStateToProps = (state) => ({
    currencies: state.products.currencies,
  });
  const mapDispathcToProps = (dispatch) => ({
    onChangeCurrency: (currency) => dispatch(changeCurrency(currency)),
  });
  
  export default connect(mapStateToProps, mapDispathcToProps)(CurrencyBtn);
  
