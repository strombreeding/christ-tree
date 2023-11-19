import React, { useState, useEffect, FC } from "react";

const BACKGROUND_SIZE = 3000; // B의 크기를 나타내는 상수
const maxScrollX = BACKGROUND_SIZE - window.innerWidth;
const maxScrollY = BACKGROUND_SIZE - window.innerHeight;
interface ScrollLineIndicatorProps {
  x: number;
  y: number;
  nowWeek: number;
}

const ScrollLineIndicator: FC<ScrollLineIndicatorProps> = ({ nowWeek }) => {
  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  console.log(maxScrollX, maxScrollY);
  useEffect(() => {
    const handleScroll = () => {
      setScrollX(window.scrollX);
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      style={{
        position: "sticky",
        top: "11%",
        left: "100%",
        transform: "translate(-100%, -50%)",
        width: `${maxScrollX / 30}px`,
        height: `${maxScrollY / 30}px`,
        backgroundImage:
          nowWeek < 5
            ? `url("/assets/tree_${nowWeek}.jpg")`
            : `url("/assets/tree_1.jpg")`,
        backgroundSize: "contain", // 배경 이미지가 컨테이너를 완전히 덮지 않도록
        backgroundPosition: "center", // 이미지가 중앙에 위치하도록
        backgroundRepeat: "no-repeat", // 이미지가 반복되지 않도록
      }}
    >
      <RedDot
        scrollX={scrollX}
        scrollY={scrollY}
        bSize={{ width: maxScrollX / 30, height: maxScrollY / 30 }}
      />
    </div>
  );
};

export default ScrollLineIndicator;

interface RedDotProps {
  scrollX: number;
  scrollY: number;
  bSize: { width: number; height: number };
}

const RedDot: FC<RedDotProps> = ({ scrollX, scrollY, bSize }) => {
  const dotX = (scrollX / maxScrollX) * bSize.width;
  const dotY = (scrollY / maxScrollY) * bSize.height;
  const position = {
    x: dotX < maxScrollX / 30 ? dotX : maxScrollX / 30,
    y: dotY < maxScrollY / 30 ? dotY : maxScrollY / 30,
  };
  console.log(`
  축소 x : ${maxScrollX / 20}
  축소 y : ${maxScrollY / 20}
  dotX : ${position.x} 
  dotY : ${position.y} 
  `);
  return (
    <div
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "10px",
        height: "10px",
        backgroundColor: "red",
      }}
    ></div>
  );
};
