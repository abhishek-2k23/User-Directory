import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: {
    lat: string
    lng: string
  }
}
export interface User {
  id: number
  name: string
  email: string
  address: address
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

interface userShortData {
    id: number,
    name: string,
    email : string,
}

interface userState {
  users: User[],
  usersShortInfo: userShortData[],
  loader: boolean,
}

const initialState: userState = {
  users: [],
  usersShortInfo : [],
  loader: false,
}
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User[]>) => {
      state.users = [...state.users, ...action.payload]
      const shortInfo = state.users.map(({id, email, name}) => ({id, email, name}));
      state.usersShortInfo = [...state.usersShortInfo, ...shortInfo];
    },
    setLoader: (state, action: PayloadAction<boolean>) => {
      state.loader = action.payload;
    },
    getUser: (state, action: PayloadAction<string>) => {
      return state.users.find((user) => user.name === action.payload) || null
    },
  },
})

export const { addUser, getUser, getShortInfo, setLoader } = userSlice.actions
export default userSlice.reducer
