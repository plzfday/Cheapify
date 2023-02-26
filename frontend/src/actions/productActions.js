import * as constants from "../constants/productConstants";
import axios from "axios";
window.axios = axios;
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.withCredentials = true;

export const getSearchResults = (keyword, category) => async (dispatch) => {
    try {
        dispatch({ type: constants.SEARCH_REQUEST });
        const { data } = await axios.get(
            `${process.env.REACT_APP_PROXY_URL}/search?keyword=${keyword}&category=${category}`
        );
        dispatch({ type: constants.SEARCH_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: constants.SEARCH_FAIL,
            payload:
                error.response && error.response.data.errors
                    ? error.response.data.errors
                    : error.message,
        });
    }
};
