import styled from "styled-components";
import SingleObserver from "./SingleObserver";

export interface IScaleProps {
  width: number;
  height: number;
  onResize?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  maxScale?: number;
  minScale?: number;
}

const ScaleContainer = (props: IScaleProps) => {
  const { children } = props;
  return <SingleObserver {...props}>{children}</SingleObserver>;
};

export default ScaleContainer;
