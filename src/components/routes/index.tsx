import { BrowserRouter } from "react-router-dom";
import MyRoute from "./Route";
import MyRoute2 from "./Route2";

function MyRoutes() {
  return (
    <BrowserRouter basename="">
      <MyRoute2 />
      {/* <MyRoute /> */}
    </BrowserRouter>
  );
}
export default MyRoutes;
