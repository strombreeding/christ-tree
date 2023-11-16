import i2 from "./assets/IMG_0332.png"
import i3 from "./assets/IMG_0333.png"
import i4 from "./assets/IMG_0334.png"
import i5 from "./assets/IMG_0335.png"
import i6 from "./assets/IMG_0336.png"
import i7 from "./assets/IMG_0337.png"
import i8 from "./assets/IMG_0338.png"
import i9 from "./assets/IMG_0339.png"
import i0 from "./assets/IMG_0340.png"
export interface IItemProps {
  x: string;
  y: string;
  imgPath: string;
  nickname: string;
  content:string
}
export const itemImg = [
  i2,
  i3,
  i4,
  i5,
  i6,
  i7,
  i8,
  i9,
  i0,
]
export const itemArr = [
  {
    x: "1000",
    y: "1000",
    imgPath:itemImg[0],
    content:"1234567889991231234567889991231234567889991231234567889991231234567889991231234567889991231234567889991231234567889991231234567889991231234567889991231234567889991231234567889991231234567889991231234567889991231234567889991231234567889991231234567889",
    nickname: "일이삼사오육칠팔구십",
  },
  {
    x: "1500",
    y: "1000",
    imgPath:itemImg[1],
    content: "1234567889991231234567889991231234567889991231234567889991231234567889991231234567889991231234567889991231234567889991231234567889991231234567889991231234567889991231234567889991231234567889991231234567889991231234567889991231234567889991231234567889",
    nickname: "123456",
  },
  {
    x: "2000",
    y: "1000",
    imgPath:itemImg[2],
    content: "하잉32345678899912312421124",
    nickname: "닉넴",
  },
  {
    x: "1000",
    y: "1500",
    imgPath:itemImg[3],
    content: "하잉42345678899912312421124",
    nickname: "기모링",
  },
  {
    x: "1000",
    y: "2000",
    imgPath:itemImg[4],
    content: "하잉52345678899912312421124",
    nickname: "와저씨",
  },
  {
    x: "1500",
    y: "1500",
    imgPath:itemImg[5],
    content: "하잉62345678899912312421124",
    nickname: "목데이터",
  },
  {
    x: "2000",
    y: "2000",
    imgPath:itemImg[6],
    content: "하잉72345678899912312421124",
    nickname: "목사님",
  },
  {
    x: "2500",
    y: "2500",
    imgPath:itemImg[7],
    content: "하잉82345678899912312421124",
    nickname: "아이폰",
  },
];
