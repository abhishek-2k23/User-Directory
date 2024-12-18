import { configureStore } from "@reduxjs/toolkit";
import userSlice from './slice/userSlice'
import searchSlice from "./slice/searchSlice";
const store = configureStore({
    reducer: {
        users: userSlice,
        search: searchSlice,
    }
})

export default store;