import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"
import { address,userShortData, userInitialState,User } from "@/constants/Interfaces"


const initialState: userInitialState = {
  users: [],
  usersShortInfo: [],
  loader: false,
}
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User[]>) => {
      const existingUserIds = new Set(state.users.map((user) => user.id))

      const usersWithUniqueIds = action.payload.map((user) => {
        if (existingUserIds.has(user.id)) {
          return  { ...user, id: `${user.id}-${Date.now()}` }; // Assign a unique ID if the ID already exists
        }
        return user
      })

      state.users = [...state.users, ...usersWithUniqueIds]

      //set the short info
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

    getUser: (state, action: PayloadAction<string>) => {
      return state.users.find((user) => user.name === action.payload) || null
    },
  },
})

export const { addUser, getUser, getShortInfo, setLoader } = userSlice.actions
export default userSlice.reducer
