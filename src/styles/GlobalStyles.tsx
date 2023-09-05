import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        color: white;
    }
    html {
        background: rgb(106,221,190);
        background: linear-gradient(130deg, rgba(106,221,190,1) 0%, rgba(83,140,247,1) 81%, rgba(52,95,233,1) 100%);
        height: 100%;
    }
    a {
        vertical-align: baseline;
        text-decoration: none;
        color: inherit;
    }
    img {
        border: 0;
        max-width: 100%;
        vertical-align: middle;
    }
    input {
        vertical-align: middle;
        border: none;
    }
    button, input[type=button] {    
        background: none;
        border: none;
        cursor: pointer;
    }
    ol, ul {
        list-style: none;
    }
    .a11y-hidden {
        clip: rect(1px, 1px, 1px, 1px);
        clip-path: inset(50%);
        width: 1px;
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
    }
    :root {
        --color-white20: rgba(255, 255, 255, 0.2);
        --color-white30: rgba(255, 255, 255, 0.3);
        --color-white70: rgba(255, 255, 255, 0.7);
        --color-blue: #5CACE2;
    }
`;

export default GlobalStyle;
