import React, { useState, useEffect, FC } from "react";

const ScrollLineIndicator: FC<{ x: number; y: number; nowWeek: number }> = ({
  x,
  y,
  nowWeek,
}) => {
  const [bSize, setBSize] = useState({
    width: window.innerWidth / 5,
    height: window.innerHeight / 5,
  });

  useEffect(() => {
    const handleResize = () => {
      setBSize({
        width: window.innerWidth / 5,
        height: window.innerHeight / 5,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      style={{
        position: "sticky",
        top: "10%",
        left: "100%",
        width: bSize.width, // 축소판 크기 고정
        aspectRatio: 1,
        transform: "translate(-100%, -50%)",
        backgroundImage:
          nowWeek < 5
            ? `url("/assets/tree_${nowWeek}.jpg")`
            : `url("/assets/tree_1.jpg")`,
        backgroundSize: "cover",
        zIndex: 2,
      }}
    >
      <RedDot scrollX={x} scrollY={y} bSize={bSize} />
    </div>
  );
};

export default ScrollLineIndicator;
const RedDot: FC<{
  scrollX: number;
  scrollY: number;
  bSize: { width: number; height: number };
}> = ({ scrollX, scrollY, bSize }) => {
  const dotSize = 200; // 원래 빨간 점의 크기
  const scaledDotSize = dotSize * (bSize.width / 3000); // B의 크기에 비례하여 조정된 크기
  console.log(scaledDotSize);
  //   const scaledDotSize = dotSize * (bSize.width / 3000); // B의 크기에 비례하여 조정된 크기

  // 빨간 점의 위치 계산
  const dotX = (scrollX / 3000) * bSize.width;
  const dotY = (scrollY / 3000) * bSize.height;

  return (
    <div
      style={{
        position: "absolute",
        left: `${dotX}px`,
        top: `${dotY}px`,
        width: `${scaledDotSize}px`,
        height: `${scaledDotSize}px`,
        backgroundColor: "red",
      }}
    ></div>
  );
};
