import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IScaleProps } from ".";
import useObserve from "./useObserve";

const SingleObserver = (props: IScaleProps) => {
  const { children, width, height, disabled } = props;
  const domRef = useRef(null); // HTMLDivElement

  const [scale, setScale] = useState(1);
  const [translateArr, setTranslateArr] = useState([0, 0]);

  const internalResize = useCallback((target: HTMLDivElement) => {
    if (!target) return;
    const { width: currentWidth, height: currentHeight } =
      target.getBoundingClientRect();
    // const fixedWidth = Math.floor(currentWidth);
    // const fixedHeight = Math.floor(currentHeight);
    const w = currentWidth / width;
    const h = currentHeight / height;

    const s = Math.min(w, h);
    setScale(s);

    const leftNum = (currentWidth - width * h) / 2;
    const topNum = (currentHeight - height * w) / 2;
    setTranslateArr([leftNum <= 0 ? 0 : leftNum, topNum <= 0 ? 0 : topNum]);
  }, []);
  useObserve({
    currenDom: domRef.current,
    onInternalResize: internalResize,
    disabled: disabled,
  });

  return (
    <Wrapper ref={domRef}>
      <ScaleStyle
        width={width}
        height={height}
        scale={scale}
        left={translateArr[0] || 0}
        top={translateArr[1] || 0}
      >
        {children}
      </ScaleStyle>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  /* display: flex;
  justify-content: center;
  align-items: center; */
`;

const ScaleStyle = styled.div<{
  width: number;
  height: number;
  scale: number;
  left: number;
  top: number;
}>`
  position: absolute;
  height: ${(props) => props.height + "px"};
  width: ${(props) => props.width + "px"};
  left: ${(props) => props.left + "px"};
  top: ${(props) => props.top + "px"};
  transform: scale(${(props) => props.scale});
  transform-origin: top left;
`;

export default SingleObserver;
