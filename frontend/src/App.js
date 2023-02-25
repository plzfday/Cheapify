import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { themes } from "./themes";
import GlobalStyles from "./GlobalStyles";
import React from "react";

const Container = styled.div`
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    justify-content: space-between;
`;

const Title = styled.h1`
    font-family: "Pretendard Variable";
    font-style: normal;
    font-weight: 900;
    font-size: 32px;
    line-height: 38px;

    color: #000000;
`;

function App() {
    return (
        <ThemeProvider theme={themes}>
            <React.Fragment>
                <GlobalStyles />
                <Container>
                    <Router>
                        <Title>Hello World</Title>
                    </Router>
                </Container>
            </React.Fragment>
        </ThemeProvider>
    );
}

export default App;
