import type { Dispatch, FC, SetStateAction } from "react";
import { isMobile } from "react-device-detect";
import { styled } from "styled-components";

interface IModalDivProps {
  isMobile?: boolean;
  y?: string;
  x: string;
}
const ModalDiv = styled.div<IModalDivProps>`
  position: sticky;
  display: flex;
  width: ${(props) => (props.isMobile ? 300 : 600)}px;
  height: ${(props) => (props.isMobile ? 50 : 600)}px;
  background-color: red;
  top: ${(props) => (props.isMobile ? props.y : 200)}px;
  left: ${(props) => (props.isMobile ? props.x + "px" : "50%")};
  transform: translate(-50%, ${(props) => (props.isMobile ? 50 : 0)}%);
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 999;
  transition: transform 0.3s ease-out;
`;

export const ItemModal: FC<{
  show: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  y: number;
  x: number;
}> = ({ show, setModal, y, x }) => {
  if (!show) return <div></div>;

  return (
    <ModalDiv
      x={String(x + 40)}
      y={String(y - 200)}
      isMobile={isMobile}
      onClick={() => setModal(false)}
    >
      <div>새로운기도제목 모달</div>
    </ModalDiv>
  );
};
export const PrayModal: FC<{
  show: boolean;
  setPrayModal: Dispatch<SetStateAction<boolean>>;
  y: number;
  x: number;
}> = ({ show, setPrayModal, y, x }) => {
  if (!show) return <div></div>;
  return (
    <ModalDiv
      x={String(x + 40)}
      y={String(y - 200)}
      isMobile={isMobile}
      onClick={() => setPrayModal(false)}
    >
      <div> 모달</div>
    </ModalDiv>
  );
};
