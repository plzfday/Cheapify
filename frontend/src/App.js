import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { themes } from "./themes";
import GlobalStyles from "./GlobalStyles";
import React from "react";

import Homepage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";

const Container = styled.div`
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    justify-content: space-between;
`;

function App() {
    return (
        <ThemeProvider theme={themes}>
            <React.Fragment>
                <GlobalStyles />
                <Container>
                    <Router>
                        <Routes>
                            <Route path="/" element={<Homepage />} />
                            <Route
                                path="/products"
                                element={<ProductPage />}
                            />
                        </Routes>
                    </Router>
                </Container>
            </React.Fragment>
        </ThemeProvider>
    );
}

export default App;
