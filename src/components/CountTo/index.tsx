import gsap from "gsap";
import {
  createRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import styled from "styled-components";

export interface ICountToProps {
  duration?: number;
  /**
   * value: undefined时候为非受控模式
   */
  value?: number;
  defaultValue?: number;
  decimals?: number;
}

export interface ICountToAction {
  setValue: (value: number) => void;
  getValue: () => number;
}

export const useCountTo = () => {
  const countToAction = createRef<ICountToAction>();
  return {
    countToAction,
  };
};

export const CountTo = forwardRef<ICountToAction, ICountToProps>(
  ({ duration = 1, value, defaultValue = 0, decimals = 0 }, ref) => {
    const initialValue = value === undefined ? defaultValue : value;
    const [renderNumber, setRenderNumber] = useState(initialValue);

    const targetValueRef = useRef(initialValue);
    const _setValue = (value: number) => {
      if (targetValueRef.current === value) {
        return;
      }
      gsap.to(targetValueRef, {
        current: value,
        duration: duration,
        ease: "ease-out",
        onUpdate: () => {
          const valueFormatDecimal = Number(
            targetValueRef.current.toFixed(decimals)
          );
          setRenderNumber(valueFormatDecimal);
        },
      });
    };

    const _getValue = () => {
      return targetValueRef.current;
    };

    useImperativeHandle(ref, () => {
      return {
        setValue: _setValue,
        getValue: _getValue,
      };
    });

    useEffect(() => {
      _setValue(value || 0);
    }, [_setValue, value]);

    return <CountToWrapper>{renderNumber}</CountToWrapper>;
  }
);

const CountToWrapper = styled.div``;
