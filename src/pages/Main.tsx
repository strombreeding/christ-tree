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
import backImg from "../assets/backImg.jpg"
import ff from "../assets/tree_1.png"
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
  background-image: url(${props => props.bgImage});
  /* background-image: url(${props => props.bgImage}); */
  background-size: cover;
  background-position: center;
`;

const Item = styled.div<{ x: string; y: string, selectItem:boolean }>`
  font-size: larger;
  position: absolute;
  width: 100px;
  height: 100px;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  z-index: 1;
  background-color: ${props=>props.selectItem ===true? "gold" : ""};
  border-radius: 25px;
  cursor: pointer;
`;

const NewPrayBtn = styled.div`
  position: sticky;
  display: flex;
  width: 100px;
  height: 30px;
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
  const [y, setY] = useState(0);
  const [x, setX] = useState(0);
  const [itemModal, setItemModal] = useState(false);
  const [prayModal, setPrayModal] = useState(false);
  const [index, setIndex] = useState(0);
  const [selectItem, setSelectItem] = useState("")
  const [data, setData] = useState({} as {
    x:number
    y:number
    list:any[]
    week:number
});
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const showItemModal = 
    (index: number) => () => {
      console.log(index)
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
      console.log(data.list)
      setSelectItem(data.list[index].id)
    }

  const showPrayModal = () => {
    console.log("프레이");
    setPrayModal(true);
  };

  useEffect(() => {
    req();
    itemsRef.current = itemsRef.current.slice(0, itemArr.list.length);
  }, []);

  const req = async () => {
    // 통신 되면
    // const data = await anyFunction();
    const res = await getCards()
    console.log(res)
    const data = itemArr;
    setData(data);
  };

console.log(selectItem)
  return (
    <>
      <Background
        width={data.x}
        height={data.y}
        bgImage={`${imagePath}/tree_${data.week}.png`}
      >
        <NewPrayBtn onClick={showPrayModal}>
          <div>가이드</div>
        </NewPrayBtn>
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
          setSelectItem = { setSelectItem}
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
              <div style={{backgroundColor:"black", opacity:0.6,borderRadius:100,paddingTop:12, paddingBottom:12,}}>
              <ItemText style={{ textAlign: "center",color:"white",fontWeight:"600",fontSize:18 }}>
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
