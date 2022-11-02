import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
    query GetCategories {
        categories {
            name,
            products {
            id,
            name,
            inStock,
            gallery,
            category,
            attributes{
                name,
                type,
                items {
                value
                }
            },
            prices {
                currency {
                label,
                symbol
                }
                amount
            },
            brand
            }
        }
    }
`;


export const GET_CATEGORY = gql`
query GetCategory($input: CategoryInput!) {
    category(input: $input) {
        name,
        products {
          id,
          name,
          inStock,
          gallery,
          prices {
            currency {
              label,
              symbol
            }
            amount
          },
        }
    }
  }
`;

export const GET_CURRENCIES = gql`
query GetCurrencies {
  currencies {
    label,
    symbol
  }
}`;

export const GET_PRODUCT = gql`
query GetProduct($id: String!) {
  product(id: $id){
    id,
    name,
    brand, 
    description,
    gallery,
    attributes {
      id,
      name,
      type,
      items {
        displayValue,
        value,
        id
      }
    }
    prices {
      currency {
        symbol,
        label
      },
      amount
    }
  }
}`;