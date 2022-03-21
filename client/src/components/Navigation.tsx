import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";
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
    background-color: black;
    color: white;
  }
`;

const Navigation = () => {
  const matchHome = useMatch("/");
  console.log(Boolean(matchHome));
  return (
    <Container>
      <li>
        <Link
          to="/"
          style={{
            backgroundColor: Boolean(matchHome) ? "black" : "transparent",
            color: Boolean(matchHome) ? "white" : "black",
          }}
        >
          Home
        </Link>
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
    </Container>
  );
};

export default Navigation;
