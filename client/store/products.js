import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';

/**
 * INITIAL STATE
 */
const defaultProducts = [];

/**
 * ACTION CREATORS
 */
const getAllProducts = products => ({type: GET_ALL_PRODUCTS, products});

/**
 * REDUCER
 */
export default function (state = defaultProducts, action){
    switch (action.type) {
    case GET_ALL_PRODUCTS:
        return action.products;
    default:
        return state;
    }
}

/**
 * THUNK CREATORS
 */
export const fetchAllProducts = () => dispatch => {
    axios.get('/api/products')
        .then(products => products.data)
        .then(productsData => {
            dispatch(getAllProducts(productsData));
        })
        .catch(err => console.log(err));
};
