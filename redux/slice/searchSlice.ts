import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { searchInitalState } from "@/constants/searchInterfaces";

const initialState: searchInitalState = {
  searchScreen: false,
  searchText: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setSearchScreen: (state, action: PayloadAction<boolean>) => {
      state.searchScreen = action.payload;
    },
  },
});

export const {
  setSearchText,
  setSearchScreen,
} = searchSlice.actions;

export default searchSlice.reducer;
