import Router from "./Router";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect, useState } from "react";
import { darkTheme, lightTheme } from "./theme";
import { useRecoilState, useRecoilValue } from "recoil";
import { isDarkState, isLoggedInState } from "./atoms";
import { useCookies } from "react-cookie";

const GlobalStyle = createGlobalStyle`

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor}
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
button {
  border-radius: 0;
  border: none;
  background-color: transparent;
  padding: 0;
  cursor: pointer;
  color: ${(props) => props.theme.textColor};
  
  

}
`;

interface IUserObj {
  id: string;
}

const App = () => {
  const isDark = useRecoilValue(isDarkState);
  const [userObj, setUserObj] = useState<IUserObj | null>(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState<boolean>(isLoggedInState);

  useEffect(() => {
    const user = cookies.user;

    if (Boolean(user)) {
      setIsLoggedIn(true);
    } // cookies ??? user ????????? ???????????? ???????????? ???????????? false ??????.
  }, [isLoggedIn]);

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <HelmetProvider>
          <Helmet>
            <title>To Do List App v0.1</title>
          </Helmet>
        </HelmetProvider>
        <GlobalStyle />
        <Router userObj={userObj} />
      </ThemeProvider>
    </>
  );
};

export default App;
