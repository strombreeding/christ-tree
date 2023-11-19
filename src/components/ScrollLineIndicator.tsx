import React, { useState, useEffect } from "react";

const ScrollLineIndicator = () => {
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setViewportHeight(window.innerHeight);
    setViewportWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={{ position: "relative", height: "5000px", width: "5000px" }}>
      {/* 축소판 배경 */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "100px", // 축소판 크기 고정
          height: "100px", // 축소판 크기 고정
          transform: "translate(-50%, -50%)",
          background: 'url("path/to/your/image.jpg")',
          backgroundSize: "cover",
        }}
      >
        {/* 디바이스 현재 보이는 영역을 표시하는 둘레 */}
        <div
          style={{
            position: "absolute",
            left: "50%", // 중앙으로 이동
            top: "50%", // 중앙으로 이동
            transform: "translate(-50%, -50%)",
            border: "2px solid yellow", // 노란색 둘레
            borderRadius: "5px", // 둘레의 모퉁이를 둥글게
            width: `${viewportWidth}px`, // 둘레의 너비
            height: `${viewportHeight}px`, // 둘레의 높이
            zIndex: 999, // 다른 요소 위에 표시하기 위한 z-index
            pointerEvents: "none", // 선이 다른 이벤트를 가로채지 않도록 함
            boxSizing: "border-box", // border 크기를 둘레의 크기로 고려
          }}
        />
      </div>
    </div>
  );
};

export default ScrollLineIndicator;
