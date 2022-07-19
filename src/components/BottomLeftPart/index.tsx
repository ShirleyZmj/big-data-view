import { useState } from "react";
import styled from "styled-components";
import ScaleContainer from "../ScaleContainer";

const BottomLeftPart = () => {
  const [disabled, setDisabled] = useState(true);
  return (
    <ScaleContainer height={400} width={600} disabled={disabled}>
      <Wrapper>
        <Item
          onClick={() => {
            setDisabled(!disabled);
          }}
        >
          {disabled ? "true" : "false"}
        </Item>
        <Item>2</Item>
        <Item>3</Item>
        <Item>4</Item>
      </Wrapper>
    </ScaleContainer>
  );
};

const Item = styled.div`
  color: black;
  background-color: orange;
  border-radius: 10px;
  width: 260px;
  height: 170px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 600px;
  height: 400px;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
`;

export default BottomLeftPart;
