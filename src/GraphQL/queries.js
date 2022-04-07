import gql from 'graphql-tag';

//Get All products
const getAllProducts = () => gql`
query {
  category {
    name
    products {
      id
      name
      inStock
      attributes {
      
        name
        items {
          id
          value
          displayValue
        }
      }
      gallery
      prices {
        currency{
          symbol
          label
        }
        amount
      }
    }
  }
}
`;

//Get All categories 
const getProductCategories = () => gql`
  query {
    categories {
      name
      products {
        id
        name
        inStock
        attributes {
      
          name
          items {
            id
            value
            displayValue
          }
        }
        gallery
        prices {
          currency{
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;

// For displaying in NavBar
const getProductCategoriesName = () => gql`
  query {
    category {
      name
    }
    categories {
      name
    }
  }
`;


// Getting product attributes 
const getProductAttributes = (itemName) => gql`
                query {
                  product(id: "${itemName}") {            
                    name            
                    gallery
                    prices {
                      amount
                      currency{
                          label
                          symbol
                      }
                    }
                    brand
                  }
                }
              `;

// Get a single product based on the id.
const getProduct = (productId) => gql`
query {
  product(id: "${productId}") {
    name
    id
    inStock
    gallery
    description
    category
    attributes {
      
      name
      items {
        id
        value
        displayValue
      }
    }
    prices {
      amount
      currency{
          label
          symbol
      }
    }
    brand
  }
}
`;

//Get currencies
const getCurrencies = () => gql`
              query {
                currencies{
                    label
                    symbol
                }
              }
            `;

//Get prices
const getPrices = () => gql`
            query {
              category {
                name
                products {
                  name
                  id
                  prices {
                    currency{
                        label
                        symbol
                    }
                    amount
                  }
                }
              }
            }
          `;


          export{getAllProducts,getProductCategories,getProductCategoriesName,
            getProductAttributes,getProduct,getCurrencies,getPrices
             }
