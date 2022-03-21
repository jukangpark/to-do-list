import { Link, useMatch } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkState } from "../atoms";
import Join from "../pages/Join";
import Login from "../pages/Login";

const Container = styled.ul`
  margin: 0 auto;
  display: flex;
  li {
    width: 25%;
    text-align: center;
    line-height: 50px;
  }
  li > a {
    width: 100%;
    display: block;
    cursor: pointer;
  }
  li > a:hover {
    background-color: ${(props) => props.theme.accentColor};
  }
`;

const Navigation = () => {
  const [isDark, setDarkState] = useRecoilState(isDarkState);
  const matchHome = useMatch("/");
  const matchJoin = useMatch("/join");
  const matchLogin = useMatch("/login");
  const handleClick = () => {
    setDarkState((prev) => !prev);
  };

  return (
    <Container>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/join">Join</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/logout">Log out</Link>
      </li>
      <li>
        <button onClick={handleClick}>
          {isDark ? "Light theme" : "Dark theme"}
        </button>
      </li>
    </Container>
  );
};

export default Navigation;
