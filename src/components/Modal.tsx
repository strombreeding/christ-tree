import { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import { styled } from "styled-components";
import { IItemProps } from "../config";

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
  width: ${(props) => (props.isMobile ? 300 : 600)}px;
  height: ${(props) => (props.isMobile ? 50 : 600)}px;
  background-color: purple;
  top: ${(props) => (props.isMobile ? props.y : 50)}px;
  left: ${(props) => (props.isMobile ? props.x + "px" : "50%")};
  transform: translate(-50%, ${(props) => (props.isMobile ? 50 : 0)}%);
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
  background-color: white;
  width: 80%;
  height: 80%;
  align-items: center;
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
        onClick={() => setModal(false)}
      >
        <ModalContent>
          <div style={{ padding: 30 }}>닉네임</div>
          <div>{data[index].nickname}</div>
          <div style={{ padding: 30 }}>기도제목 상세</div>
          <div>{data[index].content}</div>
        </ModalContent>
      </ModalDiv>
    </>
  );
};
export const PrayModal: FC<{
  show: boolean;
  setPrayModal: Dispatch<SetStateAction<boolean>>;
  y: number;
  x: number;
}> = ({ show, setPrayModal, y, x }) => {
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const handleInputChange = (e: any) => {
    if (textareaRef.current) {
      setContent(e.target.value);
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  if (!show) return <div></div>;
  return (
    <>
      <ModalBg onClick={() => setPrayModal(false)} />
      <ModalDiv x={String(x + 40)} y={String(y - 200)} isMobile={isMobile}>
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
            ref={textareaRef}
            placeholder="기도할거리"
            defaultValue={content}
            onChange={handleInputChange}
            rows={1}
            style={{ overflowY: "hidden", resize: "none" }}
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
                setPrayModal(false);
              }}
            >
              취소
            </div>
            <div
              style={{ padding: 15, backgroundColor: "blue", color: "silver" }}
              onClick={() => {
                const accept = window.confirm(`
                  닉네임 : ${nickname}
                  기도제목 : 
                  =======
                  ${content}
                  =======
                  제출할거에요?
                `);
                if (accept) {
                  alert("등록될거임.. 통신X");
                }
              }}
            >
              제출
            </div>
          </div>
        </ModalContent>
      </ModalDiv>
    </>
  );
};
