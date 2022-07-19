import api from "@/common/api";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
const ITEM_HEIGHT = 30;
const DURATION = 500;
const TopLeftPart = () => {
  const [productList, setProduct] = useState<productModel.Datum[]>([]);
  const retryCountRef = useRef(3);
  const pageInfoRef = useRef({
    pageSize: 10,
    current: 1,
    total: 0,
  });
  const currentTranslateRef = useRef(0);
  const [currentTranslateState, setCurrentTranslateState] = useState(0);

  const fetchData = async (current?: number) => {
    console.log("fetchData", current);
    const page = current || pageInfoRef.current.current;
    // 一次性请求两页,可能到头了
    // if (
    //   page !== 1 &&
    //   (page - 1) * pageInfoRef.current.pageSize > pageInfoRef.current.total
    // ) {
    //   // debugger
    //   return Promise.reject({});
    // }
    try {
      const { current, pageSize, data } =
        await api.invoke<productModel.RootObject>("get", "/v1/products/list", {
          pageSize: 10,
          current: page,
        });
      setProduct(data);
      retryCountRef.current = 3;
      pageInfoRef.current.pageSize = pageSize;
      pageInfoRef.current.current = current;
      setTimeout(() => {
        startRoll();
      }, DURATION);
    } catch (e) {
      console.log(e);
      if (retryCountRef.current) {
        retryCountRef.current--;
        currentTranslateRef.current = 0;
        pageInfoRef.current = {
          pageSize: 10,
          current: 1,
          total: 0,
        };
        setTimeout(() => {
          fetchData(1);
        }, 1000);
      }
    }
  };

  const startRoll = () => {
    gsap.to(".RollCardItem", {
      duration: DURATION / 500,
      delay: DURATION / 1000,
      top: (_, target) => {
        const index = Number(target.tabIndex);
        console.log(index, currentTranslateRef.current);
        const rpx = -(index - currentTranslateRef.current + 1) * ITEM_HEIGHT;
        return `${rpx}px`;
      },
    });
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  return (
    <Wrapper height={ITEM_HEIGHT * pageInfoRef.current.pageSize}>
      {productList.map((item, index) => (
        <Item
          className={`RollCardItem RollCardItem${index}`}
          height={ITEM_HEIGHT}
          index={index}
          tabIndex={index}
          key={item.id + index + item.name}
        >
          {item.name}
        </Item>
      ))}
    </Wrapper>
  );
};

const Item = styled.div<{ height: number; index: number }>`
  position: absolute;
  top: ${(props) => props.height * props.index + "px"};
  color: orange;
  height: ${(props) => props.height + "px"};
  line-height: ${(props) => props.height + "px"};
`;

const Wrapper = styled.div<{ height: number }>`
  height: ${(props) => props.height + "px"};
  position: relative;
  overflow: hidden;
`;

export default TopLeftPart;
