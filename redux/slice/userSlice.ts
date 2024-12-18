import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  userInitialState,
  User,
} from "@/constants/Interfaces"

const initialState: userInitialState = {
  users: [],
  usersShortInfo: [],
  loader: false,
  userDetailsScreenData: null,
  infiniteLoader: false,
  searchResult: null,
  sortedResult : [],
}
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User[]>) => {
      const existingUserIds = new Set(state.users.map((user) => `${user.id}`))

      const usersWithUniqueIds = action.payload.map((user) => ({
        ...user,
        id: existingUserIds.has(`${user.id}`)
          ? `${user.id}-${Date.now()}`
          : `${user.id}`,
      }))

      // Append new users without resetting state
      state.users = [...state.users, ...usersWithUniqueIds]

      // Update the short info list
      const newShortInfo = usersWithUniqueIds.map(({ name, email, id }) => ({
        name,
        email,
        id,
      }))
      state.usersShortInfo = [...state.usersShortInfo, ...newShortInfo]
    },

    setLoader: (state, action: PayloadAction<boolean>) => {
      state.loader = action.payload
    },

    setUserDetailsScreenData: (
      state,
      action: PayloadAction<string | number>,
    ) => {
      const id = action.payload.toString() // Ensure consistent type
      const foundUser = state.users.find((user) => user.id === id)
      if (foundUser) {
        state.userDetailsScreenData = foundUser // Store the matched user in Redux state
      } else {
        console.error(`No user found with ID: ${id}`)
        state.userDetailsScreenData = null // Reset to null if no user is found
      }
    },

    setInfiniteLoader: (state, action: PayloadAction<boolean>) => {
      state.infiniteLoader = action.payload
    },

    setSearchResult: (state, action: PayloadAction<string>) => {
      const query = action.payload.toLowerCase(); // Case-insensitive search
      state.searchResult = state.usersShortInfo.filter((user) =>
        user.name.toLowerCase().includes(query)
      );
    },

    clearSearchResult: (state) => {
      state.searchResult = []
    },

     setSortedResults : (state, action: PayloadAction<string>) => {
      state.sortedResult = state.usersShortInfo?.slice().sort((a, b) => { 
        if (action.payload === "asc") {
          return a.name.localeCompare(b.name) // Ascending order
        }
        return b.name.localeCompare(a.name) // Descending order
      }) || []
    },
  },
})

export const {
  addUser,
  setLoader,
  setInfiniteLoader,
  setUserDetailsScreenData,
  setSearchResult,
  clearSearchResult,
  setSortedResults,
} = userSlice.actions
export default userSlice.reducer
