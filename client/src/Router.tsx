import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Join from "./pages/Join";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/join" element={<Join />} />
    </Routes>
  );
};

export default Router;
