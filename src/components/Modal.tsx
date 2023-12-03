import { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import { styled } from "styled-components";
import { IItemProps, itemImg } from "../config";
import { getCards } from "../apis/read";
import { insertCard } from "../apis/create";
import { getCurrentWeekOfMonth, getMidnightMilliseconds } from "../pages/Main";

interface IModalDivProps {
  isMobile?: boolean;
}
const ModalDiv = styled.div<IModalDivProps>`
  position: sticky;
  display: flex;
  width: ${(props) => (props.isMobile ? 360 : 600)}px;
  height: ${(props) => (props.isMobile ? 600 : 600)}px;
  background-color: purple;
  top: ${(props) => (props.isMobile ? 60 : 100)}px;
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
  background-color: #ffe5e5;
  width: 80%;
  height: 80%;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const ModalTextArea = styled.textarea<{ isMobile: boolean }>`
  overflow: hidden;
  resize: none;
  width: ${(props) => (props.isMobile ? "70%" : "300px")};
  height: 200px;
  background-color: #ffe5e5;
  padding: 15px;
  color: black;
`;

const ModalWriter = styled.div<{ isMobile: boolean }>`
  font-weight: bolder;
  text-align: right;
  margin-top: 10px;
  font-size: 20px;
  width: ${(props) => (props.isMobile ? "70%" : "300px")};
`;

export const ItemModal: FC<{
  show: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  data: IItemProps[];
  index: number;
}> = ({ show, setModal, data, index }) => {
  if (!show) return <div></div>;

  return (
    <>
      <ModalBg onClick={() => setModal(false)} />
      <ModalDiv isMobile={isMobile}>
        <ModalContent>
          <div
            style={{ paddingBottom: 30, fontWeight: "bolder", fontSize: 24 }}
          >
            기도제목
          </div>
          <ModalTextArea
            disabled
            readOnly
            placeholder="기도제목"
            defaultValue={data[index].content}
            rows={1}
            isMobile={isMobile}
            maxLength={250}
          />
          <ModalWriter isMobile={isMobile}>- {data[index].writer}</ModalWriter>
        </ModalContent>
      </ModalDiv>
    </>
  );
};
export const Notice: FC<{
  show: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  title: string;
  notice: string;
  week: number;
}> = ({ show, setModal, notice, title, week }) => {
  if (!show) return <div></div>;

  return (
    <>
      <ModalBg onClick={() => setModal(false)} />
      <ModalDiv isMobile={isMobile}>
        <ModalContent>
          <div style={{ padding: 20, fontSize: 25 }}>* 공지 *</div>
          <div
            style={{
              marginTop: 5,
              marginBottom: 10,
              fontWeight: "bold",
              fontSize: 14,
            }}
          >
            {title}
          </div>
          <ModalTextArea
            disabled
            readOnly
            placeholder="기도제목"
            defaultValue={notice}
            rows={1}
            isMobile={isMobile}
            maxLength={250}
          />

          <div
            style={{
              marginTop: 5,
              marginBottom: 5,
              color: "blue",
              fontSize: 18,
              fontWeight: "bolder",
            }}
            onClick={() => {
              setModal(false);
              window.localStorage.setItem(
                "ds",
                getMidnightMilliseconds().toString()
              );
            }}
          >
            오늘 하루동안 안보기
          </div>
        </ModalContent>
      </ModalDiv>
    </>
  );
};

const ChoiceType = styled.button<{ backColor: string }>`
  padding: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 50%;
  background-color: ${(props) => props.backColor};
  border-width: 0px;
  border-radius: 10px;
  cursor: pointer;
  color: white;
  font-size: 20px;
  font-weight: 700;
`;

const ItemContainer = styled.div`
  width: 33%;
  padding: 10px;
  transition: background-color 0.3s ease, opacity 0.6s ease;
  cursor: pointer;
  &:hover {
    background-color: black;
    opacity: 1; // 마우스 오버 시 투명도 증가
  }
`;

const ItemImg = styled.img`
  width: 100%;
  aspect-ratio: 1;
  z-index: 2;
`;
const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: fixed;
  bottom: 70px;
  width: 50%;
  justify-content: space-between;
`;
const ModalBtn = styled.button<{ bgColor: string; textColor: string }>`
  padding: 15px;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.textColor};
  border-radius: 4px;
  font-weight: 900;
  border-width: 0px;
`;
const SearchInput = styled.input`
  width: 50%;
  height: 50px;
  font-size: 35px;
  text-align: center;
`;
const SearchBtn = styled.button`
  background-color: purple;
  width: 50%;
  align-items: center;
  text-align: center;
  justify-content: center;
  padding: 30px;
`;
export const PrayModal: FC<{
  show: boolean;
  setPrayModal: Dispatch<SetStateAction<boolean>>;
  setSelectItem: Dispatch<SetStateAction<number>>;
  dataList: IItemProps[];
  week: number;
}> = ({ show, setPrayModal, dataList, setSelectItem, week }) => {
  const [text, setText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [writer, setWriter] = useState("");
  const [content, setContent] = useState("");
  const [img, setImg] = useState<string>("");
  const [type, setType] = useState<"choice" | "final">("choice");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const handleInputChange = (e: any) => {
    setContent(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  const modalOff = () => {
    setPrayModal(false);
    setType("choice");
    setContent("");
    setImg("");
    setWriter("");
  };

  const confirm = async () => {
    // 통신
    let copyWriter = writer;
    if (writer.trim().length < 1) copyWriter = "익명";
    if (content.trim().length < 10)
      return alert("기도제목이 10자도 안된다고요? 말도안돼~");
    if (img.trim().length < 10) return alert("이미지 골라주셈");
    try {
      const res = await insertCard({
        writer: copyWriter,
        content,
        img_path: img,
      });
      handleSearch(res!);
      setTimeout(() => {
        window.dispatchEvent(new Event("MainRefresh"));
      }, 600);
    } catch (err) {
      console.log(err);
    } finally {
      modalOff();
    }
  };

  const handleSearch = (custom?: IItemProps) => {
    let matchingItems: IItemProps[] = [] as IItemProps[];
    if (!custom) {
      matchingItems = dataList.filter((item) => item.writer.includes(text));
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
      }
    } else {
      console.log("실행!");
      setSelectItem(custom.id);
      const xPosition = Number(custom.ornament_x) - window.innerWidth / 2;
      const yPosition = Number(custom.ornament_y) - window.innerHeight / 2;

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
  if (week <= 0 || week > 4) {
    week = 0;
  } else {
    week = week - 1;
  }
  if (!show) return <div></div>;
  return (
    <>
      <ModalBg onClick={modalOff} />
      <ModalDiv isMobile={isMobile}>
        {type === "choice" && (
          <ModalContent>
            <div style={{ fontWeight: "700", fontSize: 20, marginBottom: 20 }}>
              장식품 고르기
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {itemImg[week].map((img, index) => {
                return (
                  <ItemContainer
                    onClick={() => {
                      setType("final");
                      setImg(img);
                    }}
                  >
                    <ItemImg src={img} alt="none" />
                  </ItemContainer>
                );
              })}
            </div>
          </ModalContent>
        )}
        {type === "final" && (
          <ModalContent>
            <ItemContainer
              style={{ marginTop: -40 }}
              onClick={() => {
                setType("choice");
              }}
            >
              {img.length > 2 ? (
                <ItemImg src={img} alt="none" />
              ) : (
                <ItemImg></ItemImg>
              )}
            </ItemContainer>
            <div style={{ paddingTop: 0, paddingBottom: 10 }}>닉네임</div>
            <input
              maxLength={9}
              placeholder="닉네임"
              defaultValue={writer}
              onChange={(e) => {
                setWriter(e.currentTarget.value);
              }}
            />
            <div style={{ paddingTop: 30, paddingBottom: 10 }}>
              기도제목 상세
            </div>
            <ModalTextArea
              isMobile={isMobile}
              placeholder="기도할거리"
              defaultValue={content}
              onChange={handleInputChange}
              rows={1}
              maxLength={250}
            />
            <div style={{ marginTop: 5 }}>{content.length}/250</div>
            <BtnContainer>
              <ModalBtn textColor="#F0F0F0" bgColor="red" onClick={modalOff}>
                취소
              </ModalBtn>
              <ModalBtn textColor="#F0F0F0" bgColor="blue" onClick={confirm}>
                제출
              </ModalBtn>
            </BtnContainer>
          </ModalContent>
        )}
      </ModalDiv>
    </>
  );
};
