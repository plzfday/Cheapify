import * as constants from "../constants/productConstants";

export const searchReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.SEARCH_REQUEST:
            return { loading: true };
        case constants.SEARCH_SUCCESS:
            return {
                loading: false,
            };
        case constants.SEARCH_FAIL:
            return { loading: false, error: action.payload };
        case constants.SEARCH_RESET:
            return {};
        default:
            return state;
    }
};

export const productReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.PRODUCT_REQUEST:
            return { loading: true };
        case constants.PRODUCT_SUCCESS:
            return {
                loading: false,
            };
        case constants.PRODUCT_FAIL:
            return { loading: false, error: action.payload };
        case constants.PRODUCT_RESET:
            return {};
        default:
            return state;
    }
};
