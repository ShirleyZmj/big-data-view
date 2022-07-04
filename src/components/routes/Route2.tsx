import Pages from "@/pages";
import Home from "@/pages/home";
import { Navigate, Route, Routes } from "react-router-dom";
import Tip from "../Tip";

function MyRoute2() {
  return (
    <Routes>
      <Route element={<Pages />}>
        <Route path="/Home" element={<Home />} />
        <Route path="/Tip" element={<Tip />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Route>
    </Routes>
  );
}
export default MyRoute2;
