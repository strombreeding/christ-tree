import { v4 as uuidv4 } from "uuid";
export interface IItemProps {
  id: number;
  writer: string;
  content: string;
  img_path: string;
  ornament_x: string;
  ornament_y: string;
  week: number;
}
export const width = 3000;
export const height = 3000;
console.log(process.env.REACT_APP_IMAGE_PATH); // 콘솔에서 확인
export const imagePath = process.env.REACT_APP_IMAGE_PATH;

// 배열안에 배열로
/* 
[
    [...1주차 사진 리스트],
    [...2주차 사진 리스트],
    [...3주차 사진 리스트].
    [...4주차 사진 리스트]
]
이런식으로 만들고 메인에서 통신으로 week 받아온 것을 사용해 itemImg[week].map 을 돌리자.

*/
export const itemImg = [
  [
    `${imagePath}/tree_1/ornament_1_1.png`,
    `${imagePath}/tree_1/ornament_1_2.png`,
    `${imagePath}/tree_1/ornament_1_3.png`,
    `${imagePath}/tree_1/ornament_1_4.png`,
    `${imagePath}/tree_1/ornament_1_5.png`,
  ],
  [
    `${imagePath}/tree_2/ornament_2_1.png`,
    `${imagePath}/tree_2/ornament_2_2.png`,
    `${imagePath}/tree_2/ornament_2_3.png`,
    `${imagePath}/tree_2/ornament_2_4.png`,
    `${imagePath}/tree_2/ornament_2_5.png`,
    `${imagePath}/tree_2/ornament_2_6.png`,
    `${imagePath}/tree_2/ornament_2_7.png`,
    `${imagePath}/tree_2/ornament_2_8.png`,
  ],
  [
    `${imagePath}/tree_3/ornament_3_1.png`,
    `${imagePath}/tree_3/ornament_3_2.png`,
    `${imagePath}/tree_3/ornament_3_3.png`,
    `${imagePath}/tree_3/ornament_3_4.png`,
    `${imagePath}/tree_3/ornament_3_5.png`,
    `${imagePath}/tree_3/ornament_3_6.png`,
    `${imagePath}/tree_3/ornament_3_7.png`,
  ],
  [
    `${imagePath}/tree_4/ornament_4_1.png`,
    `${imagePath}/tree_4/ornament_4_2.png`,
    `${imagePath}/tree_4/ornament_4_3.png`,
    `${imagePath}/tree_4/ornament_4_4.png`,
    `${imagePath}/tree_4/ornament_4_5.png`,
    `${imagePath}/tree_4/ornament_4_6.png`,
    `${imagePath}/tree_4/ornament_4_7.png`,
    `${imagePath}/tree_4/ornament_4_8.png`,
    `${imagePath}/tree_4/ornament_4_9.png`,
    `${imagePath}/tree_4/ornament_4_10.png`,
    `${imagePath}/tree_4/ornament_4_11.png`,
  ],
];

export const itemArr = {
  count: 3,
  next: null,
  previous: null,
  results: [
    {
      id: 209,
      writer: "test",
      content: "1",
      img_path: "/assets/IMG_0332.png",
      week: 0,
      ornament_x: "1900.1727113319066",
      ornament_y: "1500.786166405239",
    },
    {
      id: 210,
      writer: "호호",
      content: "아멘이옵니다 아멘~",
      img_path: "/assets/IMG_0332.png",
      week: 0,
      ornament_x: "1400.293273778585",
      ornament_y: "923.2693021784783",
    },
    {
      id: 211,
      writer: "Aa",
      content: "Yessfghtrccggh",
      img_path: "/assets/IMG_0336.png",
      week: 0,
      ornament_x: "1000.8120318419255",
      ornament_y: "500.5595109009705",
    },
  ],
};
