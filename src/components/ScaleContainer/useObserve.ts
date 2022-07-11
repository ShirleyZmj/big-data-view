import { useEffect } from "react";
import { observe, ResizeListener, unobserve } from "./observerUtil";

interface IProps {
  currenDom: HTMLDivElement | null;
  disabled?: boolean;
  onInternalResize: ResizeListener;
}

const useObserve = (props: IProps) => {
  const { currenDom, disabled, onInternalResize } = props;
  useEffect(() => {
    if (currenDom && !disabled) {
      observe(currenDom, onInternalResize);
    }
    return () => {
      unobserve(currenDom, onInternalResize);
    };
  }, [currenDom, disabled, onInternalResize]);
};

export default useObserve;
