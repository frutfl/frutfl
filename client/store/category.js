/**
 * ACTION TYPES
 */
const UPDATE_CATEGORY = 'UPDATE_CATEGORY';

/**
 * INITIAL STATE
 */
const defaultCategory = 'ALL';

/**
 * ACTION CREATORS
 */
export const updateCategory = category => ({type: UPDATE_CATEGORY, category});

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function (state = defaultCategory, action){
    switch (action.type) {
    case UPDATE_CATEGORY:
        return action.category;
    default:
        return state;
    }
}
