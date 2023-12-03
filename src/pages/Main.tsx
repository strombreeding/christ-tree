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
import { IItemProps, height, imagePath, itemArr, width } from "../config";
import { isMobile } from "react-device-detect";
import * as Modal from "../components/Modal";
import backImg from "../assets/backImg.jpg";
import ff from "../assets/tree_1.png";
import { getCards, getNotice } from "../apis/read";
import ScrollLineIndicator from "../components/ScrollLineIndicator";
import AutoScrollBox from "../components/AutoScrollBox";
import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";
interface IDivProps {
  width: number;
  height: number;
  bgImage?: string;
}

type IDataProps = IItemProps[];

const Background = styled.div<IDivProps>`
  max-width: ${width}px;
  max-height: ${height}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background-color: lightblue;
  background-image: url(${(props) => props.bgImage});
  /* background-image: url(${(props) => props.bgImage}); */
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
const NaviContainer = styled.div<{ isMobile: boolean; screenWidth: number }>`
  position: sticky;
  display: flex;
  width: ${(props) => (props.isMobile ? props.screenWidth : 800)}px;
  height: 30px;
  top: 15px;
  /* left: 100%; */
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  z-index: 100;
`;
const NaviBtn = styled.div<{ bgColor: string; width?: number | null }>`
  width: ${(props) =>
    props.width != null && props.width > 0
      ? props.width?.toString() + "px"
      : "33%"};
  /* width: 33%; */
  height: 30px;
  background-color: ${(props) => props.bgColor};
  top: 0px;
  cursor: pointer;
  text-align: center;
`;

const SearchInput = styled.input`
  width: 120px;
  height: 30px;
  font-size: 14 px;
  outline: none;
  border-width: 0px;
`;
const SearchBtn = styled.button`
  background-color: purple;
  width: 75px;
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
  z-index: 0;
`;
const ItemText = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 100px;
  white-space: nowrap;
`;
const Main = () => {
  const nowWeek = getCurrentWeekOfMonth();
  const todayNight = getMidnightMilliseconds();
  // const [scrollPosition, setScrollPosition] = useState(0);
  const [text, setText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [screenWidth] = useState(window.innerWidth);
  const [itemModal, setItemModal] = useState(false);
  const [prayModal, setPrayModal] = useState(false);
  const [index, setIndex] = useState(0);
  const [selectItem, setSelectItem] = useState(0);
  const [notice, setNotice] = useState({ title: "", notice: "", week: 0 });
  const [showNotice, setShowNotice] = useState(
    Number(window.localStorage.getItem("ds")) < todayNight
  );
  const [data, setData] = useState([] as IDataProps);
  const [scroll, setScroll] = useState({ x: 0, y: 0 });

  const imgRef = useRef<HTMLImageElement | null>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const onUpdate = useCallback(({ x, y, scale }: Record<string, any>) => {
    const { current: img } = imgRef;
    if (img) {
      const value = make3dTransformValue({ x, y, scale });

      img.style.setProperty("transform", value);
    }
  }, []);
  const handleSearch = () => {
    const matchingItems = data.filter((item) => item.writer.includes(text));

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
    const item = itemsRef.current[index];
    if (item && !itemModal) {
      const itemRect = item.getBoundingClientRect();
      // const scrollOffsetX = (itemRect.left + itemRect.right) / 3;
      // const scrollOffsetY = (itemRect.top + itemRect.bottom) / 3;
      setItemModal(true);
      setPrayModal(false);
      setIndex(index);
    } else {
      setPrayModal(false);
      setItemModal(false);
      setIndex(index);
    }
    setSelectItem(data[index].id);
  };

  const showPrayModal = () => {
    console.log("프레이");
    setPrayModal(true);
  };

  const controll = (x: number, y: number) => {
    setScroll((prev) => ({ ...prev, x: window.scrollX, y: window.scrollY }));
  };

  useEffect(() => {
    req();

    const listener = window.addEventListener("MainRefresh", req);
    window.addEventListener("scroll", () => controll(0, 0));
    return () => {
      window.removeEventListener("MainRefresh", req);
    };
  }, []);

  const req = async () => {
    // 통신 되면

    // setData(itemArr);
    // setReady(true);
    // return;
    // const data = await anyFunction();
    console.log("메인통신");
    const res = await getCards();
    const notice = await getNotice();
    setNotice({
      title: notice.title,
      notice: notice.notice,
      week: notice.week,
    });
    console.log(`
      week : ${notice.week}
    `);
    console.log(res);
    setData(res);
    itemsRef.current = itemsRef.current.slice(0, res.length);
    // const data = itemArr;
    // setData(data);
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
  return (
    <>
      <Background
        width={width}
        height={height}
        bgImage={
          notice.week < 5 && notice.week > 0
            ? `${imagePath}/tree_${notice.week}.jpg`
            : `${imagePath}/tree_${1}.jpg`
        }
        ref={imgRef}
      >
        <AutoScrollBox />
        <NaviContainer isMobile={isMobile} screenWidth={screenWidth}>
          <NaviBtn width={195} bgColor="purple">
            <form
              onSubmit={handleSubmit}
              onKeyDown={handleKeyPress}
              style={{
                width: 195,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
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
                backgroundColor: "white",
                // height: 30,
                width: 100,
                padding: 8,
                borderRadius: 4,
                fontWeight: "bolder",
              }}
            >
              기도 작성
            </div>
          </NaviBtn>
        </NaviContainer>
        <ScrollLineIndicator x={scroll.x} y={scroll.y} nowWeek={notice.week} />

        <Modal.ItemModal
          show={itemModal}
          setModal={setItemModal}
          data={data}
          index={index}
        />
        <Modal.Notice
          show={showNotice}
          setModal={setShowNotice}
          title={notice.title}
          notice={notice.notice}
          week={notice.week}
        />
        <Modal.PrayModal
          show={prayModal}
          setPrayModal={setPrayModal}
          dataList={data}
          setSelectItem={setSelectItem}
          week={notice.week}
        />

        {data.map((item, index) => {
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

export function getCurrentWeekOfMonth() {
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

export function getMidnightMilliseconds() {
  // 현재 날짜와 시간 객체 생성
  let currentDate = new Date();

  // 오늘의 날짜로 설정
  let year = currentDate.getFullYear();
  let month = currentDate.getMonth();
  let day = currentDate.getDate();

  // 오늘의 23:59:59로 설정
  let endOfDay = new Date(year, month, day, 23, 59, 59);

  // 해당 날짜를 밀리초로 변환하여 반환
  return endOfDay.getTime(); // 반환되는 값은 현재 시간대에서의 밀리초입니다.
}
