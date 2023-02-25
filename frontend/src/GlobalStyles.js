import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}
    body {
        font-family:"Pretendard Variable";
        min-height: 100vh;
    }
`;

export default GlobalStyles;
