import { useEffect } from "react";
import { useCookies, Cookies } from "react-cookie";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { isDarkState, isLoggedInState } from "../atoms";

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
    color: inherit;
    text-decoration: none;
  }
  li > a:hover {
    background-color: ${(props) => props.theme.accentColor};
  }
`;

const Navigation = ({ id, avatarUrl }: any) => {
  const [isDark, setDarkState] = useRecoilState(isDarkState);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

  const navigate = useNavigate();

  const handleClick = () => {
    setDarkState((prev) => !prev);
  };

  const handleLogout = () => {
    removeCookie("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <Container>
      <li>
        <Link to="/">Home</Link>
      </li>
      {!isLoggedIn && (
        <>
          <li>
            <Link to="/join">Join</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </>
      )}
      <li>
        <Link to="/profile">Profile</Link>
      </li>
      <li style={{ cursor: "pointer" }}>
        <div onClick={handleLogout}>Log out</div>
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
