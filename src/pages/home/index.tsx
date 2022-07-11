import FlopNum from "@/components/FlopNum";
import TLComponent from "@/components/TLComponent";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const imgs = document.querySelectorAll("img");
    if (!imgs) {
      setLoading(false);
      return;
    }
    let total = imgs.length;
    imgs.forEach((img) => {
      img.addEventListener("load", () => {
        total--;
        if (total === 0) {
          setLoading(false);
        }
      });
    });
  }, []);

  const getRandom = () => {
    return Math.floor(Math.random() * 10000000000);
  };
  const [data, setData] = useState(getRandom());

  const changeData = () => {
    setData(getRandom());
  };

  return (
    <Wrapper>
      <Header>
        <button onClick={changeData}>Change Data</button>
      </Header>
      {loading && <Loading>Loading...</Loading>}
      <NumBar>
        <FlopNum value={data} />
      </NumBar>

      <Content>
        <GridItem name="lt">left top</GridItem>
        <GridItem name="lb">
          <TLComponent />
          {/* left bottom */}
        </GridItem>
        <GridItem name="c">center</GridItem>
        <GridItem name="rt">right top</GridItem>
        <GridItem name="rc">right center</GridItem>
        <GridItem name="rb">right bottom</GridItem>
      </Content>
      <BgImg src={require("@/assets/img/common/bg01.png")}></BgImg>
    </Wrapper>
  );
};

const NumBar = styled.div`
  outline: 1px solid;
  height: 60px;
  padding: 0 20%;
`;

const Loading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const BgImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -10;
`;

const Content = styled.div`
  outline: 1px solid;
  height: calc(100vh - 180px);
  display: grid;
  grid-template-areas:
    "lt c rt"
    "lt c rt"
    "lt c rc"
    "lb c rc"
    "lb c rb"
    "lb c rb";
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 24px;
  padding: 20px;
`;

const GridItem = styled.div<{ name: string }>`
  grid-area: ${(props) => props.name};
  outline: 1px solid gray;
  overflow: hidden;
`;

const Wrapper = styled.div`
  display: relative;
  height: 100%;
  width: 100%;
`;

const Header = styled.div`
  outline: 1px solid;
  height: 80px;
`;

export default Home;
