import { useMemo } from "react";
import styled from "styled-components";

interface IProps {
  value: number | string | undefined;
}
const LINE_HEIGHT = 60;

const BASE_NUMS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

const FlopNumItem = (props: IProps) => {
  const { value } = props;
  const translateY = useMemo(() => {
    const index = BASE_NUMS.findIndex((v) => v === value);
    if (index < 0) {
      return LINE_HEIGHT;
    } else {
      return -1 * index * LINE_HEIGHT;
    }
  }, [value]);
  return (
    <FlopNumItemWrapper transY={translateY}>
      {BASE_NUMS.map((item, index) => (
        <NumItem className="item" key={index}>
          {item}
        </NumItem>
      ))}
    </FlopNumItemWrapper>
  );
};

const NumItem = styled.div`
  height: ${`${LINE_HEIGHT}px`};
  line-height: ${`${LINE_HEIGHT}px`};
  font-size: 18px;
`;

const FlopNumItemWrapper = styled.div<{ transY: number }>`
  transform: translateY(${(props) => props.transY + "px"});
  transition: transform 1s;
`;

const FlopNum = (props: IProps) => {
  const { value } = props;
  const valueArr = useMemo(() => {
    if (value !== undefined) {
      return String(value).split("");
    } else {
      return ["0"];
    }
  }, [value]);
  return (
    <FlopNumWrapper>
      {valueArr.map((item, index) => (
        <FlopNumItem key={index} value={item} />
      ))}
    </FlopNumWrapper>
  );
};

const FlopNumWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  height: ${`${LINE_HEIGHT}px`};
  overflow: hidden;
`;
export default FlopNum;
