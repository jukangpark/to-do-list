import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isLoggedInState } from "./atoms";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Join from "./pages/Join";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

interface IProps {
  userObj: object | null; // userObj default 값이 null 이기 때문이다.
}

const Router = ({ userObj }: IProps) => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

  // const isLoggedIn = localStorage.getItem("isLoggedIn");
  // const navigate = useNavigate();

  return (
    <>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Routes>
        {isLoggedIn ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<Login />} />
        )}

        {isLoggedIn ? (
          <Route path="/profile" element={<Profile />} />
        ) : (
          <>
            <Route path="/join" element={<Join />} />
            <Route path="/login" element={<Login />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default Router;
