import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react";
import styled from "styled-components"
import { itemArr } from "../config";


interface IDivProps {
    width: string;
    height: string;
    bgImage?: string
}
const Background = styled.div <IDivProps>`
max-width: 5000px;
max-height: 5000px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background-color: lightblue;
  background-image: ${(props) => props.bgImage ? `url(${props.bgImage})` : 'none'};
  background-size: cover;
  background-position: center;
`;

const Item = styled.div<{ x: string; y: string; bgColor: string }>`
    font-size: larger;
    position: absolute;
    width: 100px;
    height: 100px;
    top: ${props => props.y}px;
    left: ${props => props.x}px;
    background-color: ${props => props.bgColor};
    z-index: 1;
`

const Sticky2 = styled.div`
    position: sticky;
    display: flex;
    width: 600px;
    height: 600px;
    background-color: red;
    top: 200px;
    left: 50%;
    transform: translateX(-50%);
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 999;
`
const Modal: FC<{
    x: number
    y: number
    show: boolean
    setModal: Dispatch<SetStateAction<boolean>>
}> = ({ x, y, show, setModal }) => {
    console.log(show, "show 상태")
    if (show)
        return (
            // <div style={{
            //     position: 'sticky',
            //     left: `${300}px`,
            //     top: `${y}px`,
            //     zIndex: 2,
            //     width: 300,
            //     height: 300,
            //     backgroundColor: "red"
            //     // 모달 스타일링
            // }}>
            //     {/* 모달 내용 */}
            // </div>
            <Sticky2 onClick={() => setModal(false)}>
                <div>
                    기도제목 내용 등등
                </div>
            </Sticky2>
        );
    return <div></div>
};
const PrayModal: FC<{
    x: number
    y: number
    show: boolean
    setPrayModal: Dispatch<SetStateAction<boolean>>
}> = ({ x, y, show, setPrayModal }) => {
    console.log(show, "show 상태")
    if (show)
        return (
            // <div style={{
            //     position: 'sticky',
            //     left: `${300}px`,
            //     top: `${y}px`,
            //     zIndex: 2,
            //     width: 300,
            //     height: 300,
            //     backgroundColor: "red"
            //     // 모달 스타일링
            // }}>
            //     {/* 모달 내용 */}
            // </div>
            <Sticky2 onClick={() => setPrayModal(false)}>
                <div>
                    새로운기도제목 모달
                </div>
            </Sticky2>
        );
    return <div></div>
};

const Sticky = styled.div`
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

const Main = () => {
    const [text, setText] = useState("")
    const [modal, setModal] = useState(false)
    const [prayModal, setPrayModal] = useState(false)
    const [xy, setXY] = useState({
        x: 0,
        y: 0
    })
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        itemsRef.current = itemsRef.current.slice(0, itemArr.length);
    }, []);


    // const scrollToItem = (index: number, itemClick?: boolean) => () => {
    //     console.log(index)
    //     const item = itemsRef.current[index];
    //     if (item) {
    //         const itemRect = item.getBoundingClientRect();
    //         const itemCenterX = (itemRect.left + itemRect.right) / 2;
    //         const itemCenterY = (itemRect.top + itemRect.bottom) / 2;
    //         const windowCenterX = window.innerWidth / 2;
    //         const windowCenterY = window.innerHeight / 2;
    //         const scrollOffsetX = itemCenterX - windowCenterX;
    //         const scrollOffsetY = itemCenterY - windowCenterY;
    //         console.log(scrollOffsetX, scrollOffsetY)
    //         window.scrollTo({ left: scrollOffsetX, top: scrollOffsetY, behavior: 'smooth' });
    //     }
    // };

    const showModal = (index: number) => () => {
        console.log("아이템클릭")
        const item = itemsRef.current[index];
        if (item && !modal) {
            console.log("모달 on")
            const itemRect = item.getBoundingClientRect();
            const scrollOffsetX = (itemRect.left + itemRect.right) / 3;
            const scrollOffsetY = (itemRect.top + itemRect.bottom) / 3;
            setXY({ x: scrollOffsetX, y: scrollOffsetY });
            setModal(true);
        } else {
            setModal(false)
        }
    };

    return (
        <>
            <Background width="5000" height="5000" bgImage="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FZYFBv%2Fbtrn1gmFpGU%2F5p27RLkfXr0w8OdBG751CK%2Fimg.png" >
                <Sticky onClick={() => setPrayModal(true)}>
                    <div>기도제목 쓰기</div>
                </Sticky>
                <Modal show={modal} setModal={setModal} x={xy.x} y={xy.y} />
                <PrayModal show={prayModal} setPrayModal={setPrayModal} x={xy.x} y={xy.y} />
                {/* <input style={{ width: "100%", height: 100, fontSize: 100 }} type="text" defaultValue={""} value={text} onChange={(e) => {
                    setText(e.currentTarget.value)
                }} />
                <div style={{ backgroundColor: "red", width: "100%", height: 100 }} onClick={scrollToItem(Number(text))}>
                </div> */}
                <Item x={itemArr[0].x} y={itemArr[0].y} bgColor={itemArr[0].bgColor} />
                {itemArr.map((item, index) => {
                    return (
                        <Item onClick={showModal(index)} ref={el => itemsRef.current[index] = el} x={item.x} y={item.y} bgColor={item.bgColor} key={index}>
                            <div>{item.content}</div>
                        </Item>
                    )
                })}
            </Background>
        </>
    )
}

export default Main