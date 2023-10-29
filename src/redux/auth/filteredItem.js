import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filteredUsers:[]
}

const filteredItem = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_USER:(state,action)=>{
        let temp=[]
        const {users,search}=action.payload
        temp=users.filter((user)=>{
            return(
                user.name.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase()) ||
                user.role.toLowerCase().includes(search.toLowerCase())
            )
        })
        state.filteredUsers=temp;

    }
  }
});

export const {FILTER_USER} = filteredItem.actions

export default filteredItem.reducer