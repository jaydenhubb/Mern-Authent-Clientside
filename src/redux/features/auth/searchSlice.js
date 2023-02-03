import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filteredUsers: []
}

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    FILTER_USERS(state, action){
        const {users, search} = action.payload
        const tempUsers = users.filter((user)=>
        user.name.toLowerCase().includes(search.toLowerCase()) || 
        user.email.toLowerCase().includes(search.toLowerCase())
        )
        state.filteredUsers = tempUsers
    }
  }
});

export const {FILTER_USERS} = searchSlice.actions
export const selectUsers = (state) => state.search.filteredUsers;

export default searchSlice.reducer