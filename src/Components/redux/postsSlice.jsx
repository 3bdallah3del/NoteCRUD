import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const postSlice = createSlice({
  name: 'post',
  initialState:{
    posts:[]
  },
  reducers: {
    addUser: (state, actions)=>{
      state.posts.push(actions.payload)
    },
    deleteuser:(state ,actions)=>{
     state.posts= state.posts.filter((item)=>item.id !=actions.payload)
    },
    updateUser: (state, action) => {
      const { id, title, des ,category} = action.payload;
      const index = state.posts.findIndex(post => post.id === id);
      if (index !== -1) {
        state.posts[index] = { id, title, des ,category};
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { addUser ,deleteuser ,updateUser} = postSlice.actions

export default postSlice.reducer