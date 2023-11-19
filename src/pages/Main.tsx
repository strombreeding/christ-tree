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
import { IItemProps, imagePath } from "../config";
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

interface IDataProps {
  count: number;
  results: IItemProps[];
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
  z-index: 100;
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
  const [ready, setReady] = useState(false);
  const [screenWidth] = useState(window.innerWidth);
  const [itemModal, setItemModal] = useState(false);
  const [prayModal, setPrayModal] = useState(false);
  const [index, setIndex] = useState(0);
  const [selectItem, setSelectItem] = useState(0);
  const [data, setData] = useState({} as IDataProps);

  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const handleSearch = () => {
    const matchingItems = data.results.filter((item) =>
      item.writer.includes(text)
    );

    if (matchingItems.length > 0) {
      const item = matchingItems[currentIndex % matchingItems.length];
      setSelectItem(matchingItems[currentIndex % matchingItems.length].id);

      const xPosition = Number(item.ornament_x) - window.innerWidth / 2;
      const yPosition = Number(item.ornament_y) - window.innerHeight / 2;

      // 부드러운 스크롤 이동
      window.scrollTo({
        left: xPosition,
        top: yPosition,
        behavior: "smooth",
      });
      // 다음 검색을 위해 인덱스 업데이트
      setCurrentIndex((prev) => prev + 1);
    } else {
      alert(`${text}가 들어있는 장식은 없다네 친구여`);
    }
  };
  const showItemModal = (index: number) => () => {
    console.log(index);
    const item = itemsRef.current[index];
    if (item && !itemModal) {
      const itemRect = item.getBoundingClientRect();
      // const scrollOffsetX = (itemRect.left + itemRect.right) / 3;
      // const scrollOffsetY = (itemRect.top + itemRect.bottom) / 3;
      console.log(itemRect.left);
      setItemModal(true);
      setPrayModal(false);
      setIndex(index);
    } else {
      setPrayModal(false);
      setItemModal(false);
      setIndex(index);
    }
    console.log(data.results);
    setSelectItem(data.results[index].id);
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
    console.log("메인통신");
    const res = await getCards();
    itemsRef.current = itemsRef.current.slice(0, res.results.length);
    // const data = itemArr;
    setData(res);
    setReady(true);
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
  if (!ready) return <></>;
  const nowWeek = getCurrentWeekOfMonth();
  return (
    <>
      <Background
        width={5000}
        height={5000}
        bgImage={
          nowWeek < 4
            ? `${imagePath}/tree_${nowWeek}.png`
            : `${imagePath}/tree_${0}.png`
        }
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
          data={data.results}
          index={index}
        />
        <Modal.PrayModal
          show={prayModal}
          setPrayModal={setPrayModal}
          dataList={data.results}
          setSelectItem={setSelectItem}
        />

        {data.results.map((item, index) => {
          return (
            <Item
              onClick={showItemModal(index)}
              ref={(el) => (itemsRef.current[index] = el)}
              x={item.ornament_x}
              y={item.ornament_y}
              key={item.id}
              selectItem={item.id === selectItem}
            >
              <div id={String(item.id)}></div>
              <ItemImg src={item.img_path} />
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
                  {item.writer}
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

function getCurrentWeekOfMonth() {
  const today = new Date(); // 현재 날짜
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // 이번 달의 첫째 날
  const dayOfWeek = firstDayOfMonth.getDay(); // 이번 달의 첫째 날의 요일 (0=일요일, 1=월요일, ...)

  // 이번 달의 첫째 날부터 현재까지의 총 날짜 수
  const daysSinceStartOfMonth = today.getDate();

  // 이번 달의 첫째 날이 일요일이 아니면, 첫째 주의 날짜 수를 조정
  const adjustedDayCount =
    (dayOfWeek === 0 ? 0 : 7 - dayOfWeek) + daysSinceStartOfMonth;

  // 이번 달의 주차 계산 (1을 더해 현재 주차를 포함)
  return Math.ceil(adjustedDayCount / 7);
}
