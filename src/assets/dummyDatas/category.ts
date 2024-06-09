export interface ICategory {
  id: number
  name: string
  image: string
}

export const DUMMY_CATEGORY: ICategory[] = [
  { id: 1, name: 'Shirt', image: 'https://i.pinimg.com/736x/74/8f/a5/748fa512daa9010eac4f1657d43e64a7.jpg' },
  {
    id: 2,
    name: 'Cap',
    image: 'https://www.shutterstock.com/image-vector/baseball-cap-outline-drawing-vector-600nw-1977114656.jpg',
  },
  { id: 3, name: 'Hoodie', image: 'https://img.freepik.com/premium-vector/hoodie-line-art_1041186-356.jpg' },
  { id: 4, name: 'Pants', image: 'https://img.freepik.com/premium-vector/pants-line-art_1041186-363.jpg' },
  {
    id: 5,
    name: 'Sneaker',
    image:
      'https://img.freepik.com/premium-vector/outline-cool-sneakers-shoes-sneaker-outline-drawing-vector-sneakers-drawn-sketch-style_681139-144.jpg',
  },
  {
    id: 6,
    name: 'Sock',
    image: 'https://t3.ftcdn.net/jpg/01/25/74/26/360_F_125742655_7mmnRCr3o5ZPUfLOQT4exd100ICIkGOi.jpg',
  },
]
