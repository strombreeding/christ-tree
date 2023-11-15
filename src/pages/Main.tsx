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
import { itemArr } from "../config";
import { isMobile } from "react-device-detect";
import * as Modal from "../components/Modal";

interface IDivProps {
  width: string;
  height: string;
  bgImage?: string;
}
const Background = styled.div<IDivProps>`
  max-width: 5000px;
  max-height: 5000px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background-color: lightblue;
  background-image: ${(props) =>
    props.bgImage ? `url(${props.bgImage})` : "none"};
  background-size: cover;
  background-position: center;
`;

const Item = styled.div<{ x: string; y: string; bgColor: string }>`
  font-size: larger;
  position: absolute;
  width: 100px;
  height: 100px;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  background-color: ${(props) => props.bgColor};
  z-index: 1;
`;

const NewPrayBtn = styled.div`
  position: sticky;
  display: flex;
  width: 300px;
  height: 100px;
  background-color: green;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const MobileNewPrayBtn = styled(NewPrayBtn)`
  // 모바일 환경에서 적용할 스타일
  @media (max-width: 768px) {
    width: 300px; // 예시: 모바일 환경에서는 화면 너비의 80%로 조절
    height: 50px;
  }
`;
const Main = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [y, setY] = useState(0);
  const [x, setX] = useState(0);
  const [text, setText] = useState("");
  const [itemModal, setItemModal] = useState(false);
  const [prayModal, setPrayModal] = useState(false);

  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const showItemModal = useCallback(
    (index: number) => () => {
      const item = itemsRef.current[index];
      if (item && !itemModal) {
        const itemRect = item.getBoundingClientRect();
        const scrollOffsetX = (itemRect.left + itemRect.right) / 3;
        const scrollOffsetY = (itemRect.top + itemRect.bottom) / 3;
        setY(itemRect.top);
        console.log(itemRect.left);
        setX(itemRect.left);
        setItemModal(true);
      } else {
        setItemModal(false);
        setY(0);
        setX(0);
      }
    },
    []
  );
  const showPrayModal = () => () => {
    console.log("프레이");
    setPrayModal(true);
  };

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, itemArr.length);
  }, []);

  const scrollToItem = (index: number, itemClick?: boolean) => () => {
    const item = itemsRef.current[index];
    if (item) {
      // 모바일일때 이동
      if (isMobile) {
        item.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
        return;
      }
      // 웹에서 이동
      const itemRect = item.getBoundingClientRect();
      const itemCenterX = (itemRect.left + itemRect.right) / 2;
      const itemCenterY = (itemRect.top + itemRect.bottom) / 2;
      const windowCenterX = window.innerWidth / 2;
      const windowCenterY = window.innerHeight / 2;
      const scrollOffsetX = itemCenterX - windowCenterX;
      const scrollOffsetY = itemCenterY - windowCenterY;
      window.scrollTo({
        left: scrollOffsetX,
        top: scrollOffsetY,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Background
        width="5000"
        height="5000"
        bgImage="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FZYFBv%2Fbtrn1gmFpGU%2F5p27RLkfXr0w8OdBG751CK%2Fimg.png"
      >
        <NewPrayBtn onClick={() => setPrayModal(true)}>
          <div>기도제목 쓰기</div>
        </NewPrayBtn>
        <Modal.ItemModal show={itemModal} setModal={setItemModal} y={y} x={x} />
        <Modal.PrayModal
          show={prayModal}
          setPrayModal={setPrayModal}
          y={y}
          x={x}
        />
        <input
          style={{ width: "100%", height: 100, fontSize: 100 }}
          type="text"
          //   defaultValue={""}
          defaultValue={text}
          onChange={(e) => {
            setText(e.currentTarget.value);
          }}
        />
        <div
          style={{ backgroundColor: "red", width: "100%", height: 100 }}
          onClick={scrollToItem(Number(text))}
        ></div>
        <Item x={itemArr[0].x} y={itemArr[0].y} bgColor={itemArr[0].bgColor} />
        {itemArr.map((item, index) => {
          return (
            <Item
              onClick={showItemModal(index)}
              ref={(el) => (itemsRef.current[index] = el)}
              x={item.x}
              y={item.y}
              bgColor={item.bgColor}
              key={index}
            />
          );
        })}
      </Background>
    </>
  );
};

export default Main;
