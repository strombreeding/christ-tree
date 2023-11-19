import { v4 as uuidv4 } from 'uuid';
export interface IItemProps {
  id:number
  writer: string;
  content:string
  img_path: string;
  ornament_x: string;
  ornament_y: string;
  week:number
}
export const width = 3000
export const height = 3000
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
    "count": 3,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": 209,
            "writer": "test",
            "content": "1",
            "img_path": "/assets/IMG_0332.png",
            "week": 0,
            "ornament_x": "1900.1727113319066",
            "ornament_y": "1500.786166405239"
        },
        {
            "id": 210,
            "writer": "호호",
            "content": "아멘이옵니다 아멘~",
            "img_path": "/assets/IMG_0332.png",
            "week": 0,
            "ornament_x": "1400.293273778585",
            "ornament_y": "923.2693021784783"
        },
        {
            "id": 211,
            "writer": "Aa",
            "content": "Yessfghtrccggh",
            "img_path": "/assets/IMG_0336.png",
            "week": 0,
            "ornament_x": "1000.8120318419255",
            "ornament_y": "500.5595109009705"
        }
    ]
}