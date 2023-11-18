import { v4 as uuidv4 } from 'uuid';
export interface IItemProps {
  id:string
  x: string;
  y: string;
  imgPath: string;
  nickname: string;
  content:string
}
console.log(process.env.REACT_APP_IMAGE_PATH); // 콘솔에서 확인
export const imagePath = process.env.REACT_APP_IMAGE_PATH;
export const itemImg = [
  `${imagePath}/IMG_${'0332'}.png`,
  `${imagePath}/IMG_${'0333'}.png`,
  `${imagePath}/IMG_${'0334'}.png`,
  `${imagePath}/IMG_${'0335'}.png`,
  `${imagePath}/IMG_${'0336'}.png`,
  `${imagePath}/IMG_${'0337'}.png`,
  `${imagePath}/IMG_${'0338'}.png`,
  `${imagePath}/IMG_${'0339'}.png`,
  `${imagePath}/IMG_${'0340'}.png`,
]

export const itemArr = {
  week:Math.floor(Math.random() * 3)+1,
  x:5000,
  y:5000,
  list:[
  {
    id:uuidv4(),
    x: "1000",
    y: "1000",
    imgPath:itemImg[0],
    content:"1234567889991231234567889991231234567889991231234567889991231234567889991231234567889991231234567889991231234567889991231234567889991231234567889991231234567889991231234567889991231234567889991231234567889991231234567889991231234567889991231234567889",
    nickname: "일이삼사오육칠팔구십",
  },
  {
    id:uuidv4(),
    x: "1500",
    y: "1000",
    imgPath:itemImg[1],
    content: "1234567889991231234567889991231234567889991231234567889991231234567889991231234567889991231234567889991231234567889991231234567889991231234567889991231234567889991231234567889991231234567889991231234567889991231234567889991231234567889991231234567889",
    nickname: "123456",
  },
  {
    id:uuidv4(),
    x: "2000",
    y: "1000",
    imgPath:itemImg[2],
    content: "하잉32345678899912312421124",
    nickname: "닉넴",
  },
  {
    id:uuidv4(),
    x: "1000",
    y: "1500",
    imgPath:itemImg[3],
    content: "하잉42345678899912312421124",
    nickname: "기모링",
  },
  {
    id:uuidv4(),
    x: "1000",
    y: "2000",
    imgPath:itemImg[4],
    content: "하잉52345678899912312421124",
    nickname: "와저씨",
  },
  {
    id:uuidv4(),
    x: "1500",
    y: "1500",
    imgPath:itemImg[5],
    content: "하잉62345678899912312421124",
    nickname: "목데이터",
  },
  {
    id:uuidv4(),
    x: "2000",
    y: "2000",
    imgPath:itemImg[6],
    content: "하잉72345678899912312421124",
    nickname: "목사님",
  },
  {
    id:uuidv4(),
    x: "2500",
    y: "2500",
    imgPath:itemImg[7],
    content: "하잉82345678899912312421124",
    nickname: "아이폰",
  },
]
}