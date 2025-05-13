import { createSlice } from "@reduxjs/toolkit";
import { Post } from "../types/post";


const initialState: Post[] = [ // todo: брать из бд через сервис
  {
    id: 1,
    title: 'Пост про животных1111111111111111111111111111111111111111111111111111111',
    tags: [1],
    text: 'Lorem ipsum, dolor sit amet consectetur '+
      'adipisicing elit. Inventore odio minus sed, facilis necessitatibus quasi ullam voluptatem a, perspiciatis officiis tempore fugit cumque tenetur laudantium distinctio cupiditate. Hic, cupiditate porro? Sapiente eaque, quas placeat nostrum doloremque itaque natus nesciunt libero, earum nam vero consequuntur at maiores distinctio laudantium voluptatum asperiores corrupti cupiditate laboriosam! Accusamus error molestias culpa quidem? Corporis eos nisi accusantium, expedita autem sapiente laboriosam quas laborum maiores tenetur exercitationem in quam officiis dolor aliquam eligendi quo facere quia et illum nulla a esse tempore ipsa? Quasi eius, excepturi ea incidunt temporibus officiis nobis aliquid consequuntur molestias vitae dolor!',
    image: 'bat.jpg',
    imageSize: 'width'
  },
  {
    id: 2,
    title: 'Пост про животных',
    tags: [2],
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore odio minus sed, facilis necessitatibus quasi ullam voluptatem a, perspiciatis officiis tempore fugit cumque tenetur laudantium distinctio cupiditate. Hic, cupiditate porro? Sapiente eaque, quas placeat nostrum doloremque itaque natus nesciunt libero, earum nam vero consequuntur at maiores distinctio laudantium voluptatum asperiores corrupti cupiditate laboriosam! Accusamus error molestias culpa quidem? Corporis eos nisi accusantium, expedita autem sapiente laboriosam quas laborum maiores tenetur exercitationem in quam officiis dolor aliquam eligendi quo facere quia et illum nulla a esse tempore ipsa? Quasi eius, excepturi ea incidunt temporibus officiis nobis aliquid consequuntur molestias vitae dolor!',
    image: 'bat2.jpg',
    imageSize: 'height'
  },
  {
    id: 3,
    title: 'Пост про животных',
    tags: [1, 2],
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore odio minus sed, facilis necessitatibus quasi ullam voluptatem a, perspiciatis officiis tempore fugit cumque tenetur laudantium distinctio cupiditate. Hic, cupiditate porro? Sapiente eaque, quas placeat nostrum doloremque itaque natus nesciunt libero, earum nam vero consequuntur at maiores distinctio laudantium voluptatum asperiores corrupti cupiditate laboriosam! Accusamus error molestias culpa quidem? Corporis eos nisi accusantium, expedita autem sapiente laboriosam quas laborum maiores tenetur exercitationem in quam officiis dolor aliquam eligendi quo facere quia et illum nulla a esse tempore ipsa? Quasi eius, excepturi ea incidunt temporibus officiis nobis aliquid consequuntur molestias vitae dolor!'
  }
]

const postsSlice = createSlice({
  name: 'postsSlice',
  initialState,
  reducers: {
    
  }
})

export const { actions: postsActions, reducer: postsReducer } = postsSlice