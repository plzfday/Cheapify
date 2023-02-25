import React, {Suspense} from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <Suspense fallback={<div>Loading...</div>}>
            <App />
        </Suspense>
    </Provider>
    // </React.StrictMode>
);
