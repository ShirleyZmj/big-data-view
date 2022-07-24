import api from "@/common/api";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
const ITEM_HEIGHT = 30;
const DURATION = 200;
const START_PAGE = 1;
const TopLeftPart = () => {
  const [productList, setProduct] = useState<productModel.Datum[]>([]);
  const retryCountRef = useRef(3);
  const pageInfoRef = useRef({
    pageSize: 10,
    current: 1,
    total: 0,
  });
  // 当前最上方即将消失的元素index
  const currentTranslateRef = useRef(0);
  const [currentTranslateState, setCurrentTranslateState] = useState(0);

  const fetchData = async (current?: number, isInit?: boolean) => {
    const page = current || pageInfoRef.current.current;
    // 一次性请求两页,可能到头了
    if (
      page !== 1 &&
      (page - 1) * pageInfoRef.current.pageSize > pageInfoRef.current.total
    ) {
      return;
    }
    try {
      const { current, pageSize, total, data } =
        await api.invoke<productModel.RootObject>("get", "/v1/products/list", {
          pageSize: 10,
          current: page,
        });
      retryCountRef.current = 3;
      pageInfoRef.current.pageSize = pageSize;
      pageInfoRef.current.current = current;
      pageInfoRef.current.total = total;
      if (current === START_PAGE) {
        if (isInit) {
          setProduct(data);
        } else {
          setProduct((pro) => {
            console.log(pro.length);
            let len = 0;
            if (pro.length > total) {
              len = total;
            }
            const temp = pro.slice(len);
            return temp.concat(data);
          });
        }
      } else {
        setProduct((pro) => pro.concat(data));
      }
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
          fetchData(START_PAGE);
        }, 1000);
      }
    }
  };

  const startRoll = () => {
    gsap.fromTo(
      ".RollCardItem",
      {
        duration: DURATION / 500,
        opacity: (_, target) => {
          if (target.style.opacity === "0") {
            return 0;
          }
          const index = Number(target.tabIndex);
          if (currentTranslateRef.current > index) {
            return 0;
          }
          return 1;
        },
        top: (_, target) => {
          const index = Number(target.tabIndex);
          const rpx = (index - currentTranslateRef.current) * ITEM_HEIGHT;
          return `${rpx}px`;
        },
      },
      {
        duration: DURATION / 500,
        //   delay: DURATION / 1000,
        opacity: (_, target) => {
          const index = Number(target.tabIndex);
          if (currentTranslateRef.current + 1 > index) {
            return 0;
          }
          return 1;
        },
        top: (_, target) => {
          const index = Number(target.tabIndex);
          const rpx = (index - currentTranslateRef.current - 1) * ITEM_HEIGHT;
          return `${rpx}px`;
        },
        onComplete: () => {
          // 现有数据快到底了，重新开始
          if (
            currentTranslateRef.current ===
            pageInfoRef.current.total - pageInfoRef.current.pageSize - 1
          ) {
            pageInfoRef.current.current = START_PAGE;
            fetchData(START_PAGE);
          }

          // 现有数据最后一个到头了，要从头开始，reset一下
          if (currentTranslateRef.current >= pageInfoRef.current.total - 1) {
            currentTranslateRef.current = 0;
            requestAnimationFrame(() => {
              setTimeout(() => {
                startRoll();
              }, DURATION);
            });
            setCurrentTranslateState(currentTranslateRef.current);
            return;
          }

          // 这个判断在循环请求开始后，失效了，导致反复请求数据。
          // 当前数据快滚动完了，
          if (
            currentTranslateRef.current >=
            (pageInfoRef.current.current - 1) * pageInfoRef.current.pageSize - 2
          ) {
            // 并且还有新数据，就要请求多一页
            if (
              pageInfoRef.current.current * pageInfoRef.current.pageSize + 1 <
              pageInfoRef.current.total
            ) {
              //   debugger;
              //   console.log(
              //     "fetch next",
              //     currentTranslateRef.current,
              //     pageInfoRef.current.current,
              //     pageInfoRef.current.pageSize
              //   );
              fetchData(pageInfoRef.current.current + 1);
            }
          }
          currentTranslateRef.current = currentTranslateRef.current + 1;
          requestAnimationFrame(() => {
            setTimeout(() => {
              startRoll();
            }, DURATION);
          });
          setCurrentTranslateState(currentTranslateRef.current);
        },
      }
    );
  };

  const init = async (start: number) => {
    await fetchData(start, true);
    await fetchData(start + 1);
    setTimeout(() => {
      startRoll();
    }, DURATION);
  };

  useEffect(() => {
    init(START_PAGE);
  }, []);

  return (
    <Wrapper height={ITEM_HEIGHT * pageInfoRef.current.pageSize}>
      {productList.map((item, index) => {
        const start = currentTranslateState - 2;
        const end = currentTranslateState + pageInfoRef.current.pageSize + 2;
        if (index > end || index < start) {
          return null;
        } else {
          return (
            <Item
              className={`RollCardItem RollCardItem${index}`}
              height={ITEM_HEIGHT}
              index={index}
              tabIndex={index}
              key={item.id + index + item.name}
            >
              {item.name}
            </Item>
          );
        }
      })}
    </Wrapper>
  );
};

const Item = styled.div<{ height: number; index: number }>`
  position: absolute;
  top: ${(props) => props.height * props.index + "px"};
  color: orange;
  /* outline: 1px orange solid; */
  height: ${(props) => props.height + "px"};
  line-height: ${(props) => props.height + "px"};
`;

const Wrapper = styled.div<{ height: number }>`
  height: ${(props) => props.height + "px"};
  padding: 8px;
  position: relative;
  overflow: hidden;
`;

export default TopLeftPart;

//   const startRoll = () => {
//     gsap.fromTo(
//       ".RollCardItem",
//       {
//         duration: DURATION / 500,
//         delay: DURATION / 1000,
//         opacity: (_, target) => {
//           if (target.style.opacity === "0") {
//             return 0;
//           }
//           const index = Number(target.tabIndex);
//           if (currentTranslateRef.current > index) {
//             return 0;
//           }
//           return 1;
//         },
//         top: (_, target) => {
//           const index = Number(target.tabIndex);
//           const rpx = (index - currentTranslateRef.current) * ITEM_HEIGHT;
//           //   console.log("from", index, rpx);
//           return `${rpx}px`;
//         },
//       },
//       {
//         duration: DURATION / 500,
//         delay: DURATION / 1000,
//         opacity: (_, target) => {
//           const index = Number(target.tabIndex);
//           if (currentTranslateRef.current === index) {
//             return 0;
//           } else {
//             return 1;
//           }
//         },
//         top: (_, target) => {
//           const index = Number(target.tabIndex);
//           const rpx = (index - currentTranslateRef.current - 1) * ITEM_HEIGHT;
//           return `${rpx}px`;
//         },
//         onComplete: () => {
//           console.log("complete transition");
//           setTimeout(() => {
//             startRoll();
//           }, DURATION);
//         },
//       }
//     );
//   };
