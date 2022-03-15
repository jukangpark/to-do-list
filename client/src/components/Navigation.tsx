import { Link } from "react-router-dom";
import styled from "styled-components";

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
  return (
    <Container>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/join">Join</Link>
      </li>
      <li>
        <Link to="/login">Log in</Link>
      </li>
      <li>
        <Link to="/logout">Log out</Link>
      </li>
    </Container>
  );
};

export default Navigation;
