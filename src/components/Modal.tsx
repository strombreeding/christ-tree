import { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import { styled } from "styled-components";
import { IItemProps, itemImg } from "../config";

interface IModalDivProps {
  isMobile?: boolean;
  y?: string;
  x: string;
}
const bodyWidth = document.body.clientWidth;
const bodyHeight = document.body.clientHeight;
console.log(window.innerWidth, document.documentElement.scrollWidth);
const ModalDiv = styled.div<IModalDivProps>`
  position: sticky;
  display: flex;
  width: ${(props) => (props.isMobile ? 360 : 600)}px;
  height: ${(props) => (props.isMobile ? 600 : 600)}px;
  background-color: purple;
  /* top: ${(props) => (props.isMobile ? props.y : 50)}px;
  left: ${(props) => (props.isMobile ? props.x + "px" : "50%")}; */
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  /* transform: translate(-50%, ${(props) => (props.isMobile ? 50 : 0)}%); */
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 999;
  transition: transform 0.3s ease-out;
  border-radius: 15px;
`;

const ModalBg = styled.div`
  position: absolute;
  top: 0%;
  background-color: black;
  opacity: 0.4;
  width: 5000px;
  height: 5000px;
  z-index: 4;
`;
const ModalContent = styled.div`
  background-color: #925092;
  width: 80%;
  height: 80%;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;
export const ItemModal: FC<{
  show: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  y: number;
  x: number;
  data: IItemProps[];
  index: number;
}> = ({ show, setModal, y, x, data, index }) => {
  if (!show) return <div></div>;

  return (
    <>
      <ModalBg onClick={() => setModal(false)} />
      <ModalDiv
        x={String(x + 40)}
        y={String(y - 200)}
        isMobile={isMobile}
        // onClick={() => setModal(false)}
      >
        <ModalContent>
          <img style={{width:100,aspectRatio:1}} src={data[index].imgPath}/>
          <div>{data[index].nickname}</div>
          <div style={{ padding: 30 }}>기도제목 상세</div>
          <textarea
          disabled
            readOnly
            placeholder="기도할거리"
            defaultValue={data[index].content}
            // onChange={handleInputChange}
            rows={1}
            style={{ overflowY: "hidden", resize: "none", width:isMobile?275 : 300,height:200 }}
            maxLength={250}
          />
        </ModalContent>
      </ModalDiv>
    </>
  );
};






 const ChoiceType  = styled.button<{backColor:string}>`
  padding: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 50%;
  background-color: ${(props)=>props.backColor};
  border-width: 0px;
  border-radius: 10px;
  cursor: pointer;
  color: white;
  font-size: 20px;
  font-weight: 700;
 `

const ItemContainer = styled.div`
    width: 25%;
    padding: 10px;
    transition: background-color 0.3s ease, opacity 0.6s ease;
    cursor: pointer;
    &:hover {
      background-color: black;
      opacity: 1; // 마우스 오버 시 투명도 증가
    }
`

const ItemImg = styled.img`
  width: 100%;
  aspect-ratio: 1;
  z-index: 2;
`;


export const PrayModal: FC<{
  show: boolean;
  setPrayModal: Dispatch<SetStateAction<boolean>>;
  setSelectItem: Dispatch<SetStateAction<string>>;
  y: number;
  x: number;
  dataList:any[]
}> = ({ show, setPrayModal, y, x,dataList,setSelectItem }) => {
   const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [img, setImg] = useState<string>("")
  const [type, setType] = useState<"guide"|"write"|"search"|"choice"|"final">('guide')
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const handleInputChange = (e: any) => {
    setContent(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  const modalOff = ()=>{
    setPrayModal(false)
    setType("guide")
    setContent("")
    setImg("")
    setNickname("")
  }

  const confirm = () => {
    // 통신

    modalOff()
  }



  const handleSearch = () => {
    const matchingItems = dataList.filter(item => item.nickname.includes(text));

    if (matchingItems.length > 0) {
      const item = matchingItems[currentIndex % matchingItems.length];
      setSelectItem(matchingItems[currentIndex % matchingItems.length].id)
//  if (isMobile) {
//         item.scrollIntoView({
//           behavior: "smooth",
//           block: "center",
//           inline: "center",
//         });
//         modalOff()
//         return;
//       }
      // 화면 중앙에 위치시키기 위한 계산
      const xPosition = item.x - window.innerWidth / 2;
      const yPosition = item.y - window.innerHeight / 2;

      // 부드러운 스크롤 이동
      window.scrollTo({
        left: xPosition,
        top: yPosition,
        behavior: 'smooth'
      });
      // 다음 검색을 위해 인덱스 업데이트
      setCurrentIndex(prev => prev + 1);
    }
  };
  
  if (!show) return <div></div>;
  return (
    <>
      <ModalBg onClick={modalOff} />
      <ModalDiv x={String(x + 40)} y={String(y - 200)} isMobile={isMobile}>
        {type === "write" && 
          <ModalContent>
            <div style={{ paddingTop: 30, paddingBottom: 10 }}>닉네임</div>
            <input
              placeholder="닉네임"
              defaultValue={nickname}
              onChange={(e) => {
                setNickname(e.currentTarget.value);
              }}
            />
            <div style={{ paddingTop: 30, paddingBottom: 10 }}>기도제목 상세</div>
            <textarea
              placeholder="기도할거리"
              defaultValue={content}
              onChange={handleInputChange}
              rows={1}
              style={{ overflowY: "hidden", resize: "none", width:300,height:200 }}
              maxLength={250}
            />
            <div style={{ marginTop: 5 }}>{content.length}/250</div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                position: "fixed",
                bottom: 100,
                width: "30%",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{ padding: 15, backgroundColor: "red", color: "silver" }}
                onClick={() => {
                  setType("guide");
                }}
              >
                취소
              </div>
              <div
                style={{ padding: 15, backgroundColor: "blue", color: "silver" }}
                onClick={()=>{setType("choice")}}
              >
                다음
              </div>
            </div>
          </ModalContent>}
        {type === "guide" && 
          <ModalContent>
              <ChoiceType onClick={()=>{
                setType("search")
              }} backColor="green">검색</ChoiceType>  
              <ChoiceType onClick={()=>{
                setType("write")
              }} backColor="blue">쓰기</ChoiceType>  
          </ModalContent>
        }

        {type === "choice" &&
          <ModalContent>
            <div style={{fontWeight:"700", fontSize:20, marginBottom:20}}>장식품 고르기</div>
            <div style={{display:"flex" , flexWrap:"wrap"}}>
              {itemImg.map((img,index)=>{
                return <ItemContainer onClick={()=>{
                  setType("final")
                  setImg(img)
                }} ><ItemImg src={img} alt="none" /></ItemContainer>
              })}
            </div>
          </ModalContent>
        }

        {type === "final" &&
 <ModalContent>
          <ItemContainer style={{marginTop:-10}} onClick={()=>{setType('choice')}}>
            <ItemImg src={img} alt="none"/>
          </ItemContainer>
          <div style={{marginBottom:5}}/>
          <div>{nickname}</div>
          <div style={{ padding: 15 }}></div>
          <textarea
            readOnly
            placeholder="기도할거리"
            defaultValue={content}
            // onChange={handleInputChange}
            rows={1}
            style={{ overflowY: "hidden", resize: "none", width:300,height:200 }}
            maxLength={250}
            disabled
          />
               <div
              style={{
                display: "flex",
                flexDirection: "row",
                position: "fixed",
                bottom: 70,
                width: "30%",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{ padding: 15, backgroundColor: "red", color: "silver" ,borderRadius:4}}
                onClick={() => {
                  setType("guide");
                }}
              >
                취소
              </div>
              <div
                style={{ padding: 15, backgroundColor: "blue", color: "silver",borderRadius:4 }}
                onClick={confirm}
              >
                제출
              </div>
            </div>
        </ModalContent>
        }

        {type ==="search" &&
        <ModalContent>
           <input
          style={{
            width: "50%",
            height: 50,
            fontSize: 35,
            textAlign:"center"
          }}
          type="text"
          //   defaultValue={""}
          defaultValue={text}
          onChange={(e) => {
            setText(e.currentTarget.value);
          }}
        />
        <div
          style={{
            backgroundColor: "red",
            width: "50%",
            alignItems:"center",
            textAlign:"center",
            justifyContent:"center",
            padding:30
          }}
          onClick={handleSearch}
        >Search!</div>
        </ModalContent>
        }
      </ModalDiv>
    </>
  );
};

//   const scrollToItem = (index: number, itemClick?: boolean) => () => {
  //   const item = itemsRef.current[index];
  //   if (item) {
  //     // 모바일일때 이동
  //     if (isMobile) {
  //       item.scrollIntoView({
  //         behavior: "smooth",
  //         block: "center",
  //         inline: "center",
  //       });
  //       modalOff()
  //       return;
  //     }
  //     // 웹에서 이동
  //     const itemRect = item.getBoundingClientRect();
  //     const itemCenterX = (itemRect.left + itemRect.right) / 2;
  //     const itemCenterY = (itemRect.top + itemRect.bottom) / 2;
  //     const windowCenterX = window.innerWidth / 2;
  //     const windowCenterY = window.innerHeight / 2;
  //     const scrollOffsetX = itemCenterX - windowCenterX;
  //     const scrollOffsetY = itemCenterY - windowCenterY;
  //     window.scrollTo({
  //       left: scrollOffsetX,
  //       top: scrollOffsetY,
  //       behavior: "smooth",
  //     });
  //     modalOff()
  //   }
  // };