import styled from "styled-components"

const Header = () => {
    return (
        <button>
            나도 기도 등록하기
        </button>
    )
}
interface IDivProps {
    width: string;
    height: string;
    bgImage?: string
}
const Background = styled.div < IDivProps>`
max-width: 5000px;
max-height: 5000px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background-color: lightblue;
  background-image: ${(props) => props.bgImage ? `url(${props.bgImage})` : 'none'};
  background-size: cover;
  background-position: center;
  z-index : 5;
`;

const Item = styled.div`
    font-size: larger;
    position: absolute;
    width: 100px;
    height: 100px;
    top: 1000px;
    left: 2000px;
    background-color: red;
`
const Main = () => {
    return (
        <>
            <Background width="5000" height="5000" bgImage="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FZYFBv%2Fbtrn1gmFpGU%2F5p27RLkfXr0w8OdBG751CK%2Fimg.png" >
                <Item>gd</Item>
            </Background>
        </>
    )
}

export default Main