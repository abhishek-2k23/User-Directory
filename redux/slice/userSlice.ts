import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { address,userShortData, userInitialState,User } from "@/constants/Interfaces"


const initialState: userInitialState = {
  users: [],
  usersShortInfo: [],
  loader: false,
  userDetailsScreenData: null,
  searchedUserData: null,
  infiniteLoader: false,
}
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User[]>) => {
      const existingUserIds = new Set(state.users.map((user) => `${user.id}`));
    
      const usersWithUniqueIds = action.payload.map((user) => ({
        ...user,
        id: existingUserIds.has(`${user.id}`) ? `${user.id}-${Date.now()}` : `${user.id}`,
      }));
    
      // Append new users without resetting state
      state.users = [...state.users, ...usersWithUniqueIds];
    
      // Update the short info list
      const newShortInfo = usersWithUniqueIds.map(({ name, email, id }) => ({
        name,
        email,
        id,
      }));
      state.usersShortInfo = [...state.usersShortInfo, ...newShortInfo];
    },
    

    setLoader: (state, action: PayloadAction<boolean>) => {
      state.loader = action.payload
    },

    setSearchedUserData: (state, action: PayloadAction<string>) => {
      state.searchedUserData =  state.users.find((user) => user.name === action.payload) || null
    },
    
    setUserDetailsScreenData: (state, action: PayloadAction<string | number>) => {
      const id = action.payload.toString(); // Ensure consistent type
      const foundUser = state.users.find((user) => user.id === id);
      if (foundUser) {
        state.userDetailsScreenData = foundUser; // Store the matched user in Redux state
      } else {
        console.error(`No user found with ID: ${id}`);
        state.userDetailsScreenData = null; // Reset to null if no user is found
      }
    },

    setInfiniteLoader: (state, action: PayloadAction<boolean>) => {
      state.infiniteLoader = action.payload
    },
  },
})

export const { addUser, setLoader,setInfiniteLoader, setUserDetailsScreenData, setSearchedUserData } = userSlice.actions
export default userSlice.reducer
