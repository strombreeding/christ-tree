import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { imagePath, itemArr } from "../config";
import { isMobile } from "react-device-detect";
import * as Modal from "../components/Modal";
import backImg from "../assets/backImg.jpg";
import ff from "../assets/tree_1.png";
import { getCards } from "../apis/read";
interface IDivProps {
  width: number;
  height: number;
  bgImage?: string;
}
const Background = styled.div<IDivProps>`
  max-width: 5000px;
  max-height: 5000px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background-color: lightblue;
  background-image: url(${(props) => props.bgImage});
  /* background-image: url(${(props) => props.bgImage}); */
  background-size: cover;
  background-position: center;
`;

const Item = styled.div<{ x: string; y: string; selectItem: boolean }>`
  font-size: larger;
  position: absolute;
  width: 100px;
  height: 100px;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  z-index: 1;
  background-color: ${(props) => (props.selectItem === true ? "gold" : "")};
  border-radius: 25px;
  cursor: pointer;
`;
console.log(window.innerWidth);
const NaviContainer = styled.div<{ isMobile: boolean; screenWidth: number }>`
  position: sticky;
  display: flex;
  width: ${(props) => (props.isMobile ? props.screenWidth : 800)}px;
  height: 30px;
  top: 0px;
  /* left: 100%; */
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;
const NaviBtn = styled.div<{ bgColor: string }>`
  display: flex;
  width: 50%;
  height: 30px;
  background-color: ${(props) => props.bgColor};
  top: 0px;
  cursor: pointer;
  text-align: center;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 30px;
  font-size: 20px;
  outline: none;
  border-width: 0px;
`;
const SearchBtn = styled.button`
  position: absolute;
  top: 0;
  right: 195px;
  background-color: purple;
  width: 10%;
  align-items: center;
  text-align: center;
  justify-content: center;
  /* padding: 10px; */
  height: 30px;
  border-width: 0px;
  z-index: 1;
  color: white;
`;

const ItemImg = styled.img`
  width: 100px;
  aspect-ratio: 1;
  z-index: 2;
`;
const ItemText = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 100px;
  white-space: nowrap;
`;

const Main = () => {
  // const [scrollPosition, setScrollPosition] = useState(0);
  const [text, setText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const [screenWidth] = useState(window.innerWidth);
  const [y, setY] = useState(0);
  const [x, setX] = useState(0);
  const [itemModal, setItemModal] = useState(false);
  const [prayModal, setPrayModal] = useState(false);
  const [index, setIndex] = useState(0);
  const [selectItem, setSelectItem] = useState("");
  const [data, setData] = useState(
    {} as {
      x: number;
      y: number;
      list: any[];
      week: number;
    }
  );

  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const handleSearch = () => {
    const matchingItems = data.list.filter((item) =>
      item.nickname.includes(text)
    );

    if (matchingItems.length > 0) {
      const item = matchingItems[currentIndex % matchingItems.length];
      setSelectItem(matchingItems[currentIndex % matchingItems.length].id);

      const xPosition = item.x - window.innerWidth / 2;
      const yPosition = item.y - window.innerHeight / 2;

      // 부드러운 스크롤 이동
      window.scrollTo({
        left: xPosition,
        top: yPosition,
        behavior: "smooth",
      });
      // 다음 검색을 위해 인덱스 업데이트
      setCurrentIndex((prev) => prev + 1);
    }
  };
  const showItemModal = (index: number) => () => {
    console.log(index);
    const item = itemsRef.current[index];
    if (item && !itemModal) {
      const itemRect = item.getBoundingClientRect();
      const scrollOffsetX = (itemRect.left + itemRect.right) / 3;
      const scrollOffsetY = (itemRect.top + itemRect.bottom) / 3;
      setY(itemRect.top);
      console.log(itemRect.left);
      setX(itemRect.left);
      setItemModal(true);
      setPrayModal(false);
      setIndex(index);
    } else {
      setPrayModal(false);
      setItemModal(false);
      setIndex(index);
      setY(0);
      setX(0);
    }
    console.log(data.list);
    setSelectItem(data.list[index].id);
  };

  const showPrayModal = () => {
    console.log("프레이");
    setPrayModal(true);
  };

  useEffect(() => {
    req();

    const listener = window.addEventListener("MainRefresh", req);
    return () => {
      window.removeEventListener("MainRefresh", req);
    };
  }, []);

  const req = async () => {
    // 통신 되면
    // const data = await anyFunction();
    alert("통신");
    itemsRef.current = itemsRef.current.slice(0, itemArr.list.length);
    const res = await getCards();
    console.log(res);
    const data = itemArr;
    setData(data);
  };
  const handleSubmit = (event: any) => {
    event.preventDefault(); // 폼의 기본 제출 동작을 방지
    // 필요한 동작 수행
    console.log("폼 제출!");
  };

  // 입력 필드에서 키 입력 감지
  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Enter 키 기본 동작 방지
      // Enter 키가 눌렸을 때 수행할 동작
      handleSearch();
    }
  };
  console.log(selectItem);
  return (
    <>
      <Background
        width={data.x}
        height={data.y}
        bgImage={`${imagePath}/tree_${data.week}.png`}
      >
        <NaviContainer isMobile={isMobile} screenWidth={screenWidth}>
          <NaviBtn bgColor="blue">
            <form
              onSubmit={handleSubmit}
              onKeyDown={handleKeyPress}
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                backgroundColor: "black",
              }}
            >
              <SearchInput
                type="text"
                placeholder="닉네임검색"
                //   defaultValue={""}
                defaultValue={text}
                onChange={(e) => {
                  setText(e.currentTarget.value);
                }}
              />
              <SearchBtn onClick={handleSearch}>검색</SearchBtn>
            </form>
          </NaviBtn>
          <NaviBtn bgColor="none">
            <div
              onClick={showPrayModal}
              style={{
                position: "absolute",
                right: 0,
                backgroundColor: "red",
                // height: 30,
                width: 100,
                padding: 8,
                borderRadius: 4,
              }}
            >
              장식 추가
            </div>
          </NaviBtn>
        </NaviContainer>
        <Modal.ItemModal
          show={itemModal}
          setModal={setItemModal}
          y={y}
          x={x}
          data={data.list}
          index={index}
        />
        <Modal.PrayModal
          show={prayModal}
          setPrayModal={setPrayModal}
          y={y}
          x={x}
          dataList={data.list}
          setSelectItem={setSelectItem}
        />

        {itemArr.list.map((item, index) => {
          return (
            <Item
              onClick={showItemModal(index)}
              ref={(el) => (itemsRef.current[index] = el)}
              x={item.x}
              y={item.y}
              key={item.id}
              selectItem={item.id === selectItem}
            >
              <div id={item.id}></div>
              <ItemImg src={item.imgPath} />
              <div
                style={{
                  backgroundColor: "black",
                  opacity: 0.6,
                  borderRadius: 100,
                  paddingTop: 12,
                  paddingBottom: 12,
                }}
              >
                <ItemText
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontWeight: "600",
                    fontSize: 18,
                  }}
                >
                  {item.nickname}
                </ItemText>
              </div>
            </Item>
          );
        })}
      </Background>
    </>
  );
};

export default Main;
