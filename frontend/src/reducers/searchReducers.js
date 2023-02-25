import * as constants from "../constants/searchConstants";

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
