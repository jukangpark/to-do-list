import { Routes, Route, Link } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Join from "./pages/Join";

interface IProps {
  userObj: object | null; // userObj default 값이 null 이기 때문이다.
  isLoggedIn: boolean;
}

const Router = ({ userObj, isLoggedIn }: IProps) => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </>
  );
};

export default Router;
