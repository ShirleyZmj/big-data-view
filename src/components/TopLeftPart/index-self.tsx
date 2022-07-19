import api from "@/common/api";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
const ITEM_HEIGHT = 30;
const DURATION = 500;
const TopLeftPart = () => {
  const [productList, setProduct] = useState<productModel.Datum[]>([]);
  const currentTranslateRef = useRef(0);
  const pageInfoRef = useRef({
    pageSize: 10,
    current: 1,
    total: 0,
  });

  const fetchData = async () => {
    try {
      const { data } = await api.invoke<productModel.RootObject>(
        "get",
        "/v1/products/list",
        {
          pageSize: 10,
          current: 1,
        }
      );
      setProduct(data);
    } catch (e) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Wrapper height={ITEM_HEIGHT * pageInfoRef.current.pageSize}>
      {productList.map((item, index) => (
        <Item
          className={`RollCardItem RollCardItem${index}`}
          height={ITEM_HEIGHT}
          key={item.id}
        >
          {item.name}
        </Item>
      ))}
    </Wrapper>
  );
};

const Item = styled.div<{ height: number }>`
  color: orange;
  height: ${(props) => props.height + "px"};
  line-height: ${(props) => props.height + "px"};
  /* position: absolute; */
`;

const Wrapper = styled.div<{ height: number }>`
  height: ${(props) => props.height + "px"};
  position: relative;
  overflow: hidden;
`;

export default TopLeftPart;
