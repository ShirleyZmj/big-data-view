import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Pages = () => {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  color: orange;
  width: 100vw;
  height: 100vh;
`;
export default Pages;
