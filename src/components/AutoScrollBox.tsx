// AutoScrollBox.js

import React, { useState, useEffect } from "react";

function AutoScrollBox() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      setScrollPosition((prevPosition) => prevPosition + 1);
    }, 50);

    return () => clearInterval(scrollInterval);
  }, []);

  const creditsContent = `
        주관 
        높은뜻광성교회 청년마을
        
        제작참여 
        양육팀(고정현, 김태은, 박병도, 장동민, 전도연, 전지연, 정은석, 조수현, 주영은) 
        
        & 
        
        이진희 
        
        & 
        
        트리 공모 참여
        이승미
        유수정
        주예경
    `;

  return (
    <div
      style={{
        position: "absolute",
        top: 2650,
        left: 2650,
        overflow: "hidden",
        width: "300px",
        height: "300px",
        border: "1px solid #ccc",
        background: "black",
        color: "white",
        whiteSpace: "pre-line",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div
        style={{
          transform: `translateY(-${scrollPosition}px)`,
          transition: "transform 0.1s ease-in-out",
          padding: "20px",
        }}
      >
        {creditsContent.split("\n").map((line, index) => (
          <p
            key={index}
            style={{
              fontWeight:
                line.includes("주관") ||
                line.includes("제작참여") ||
                line.includes("이진희") ||
                line.includes("&") ||
                line.includes("트리 공모 참여")
                  ? "bold"
                  : "normal",
              overflowWrap: "break-word",
              wordWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

export default AutoScrollBox;
