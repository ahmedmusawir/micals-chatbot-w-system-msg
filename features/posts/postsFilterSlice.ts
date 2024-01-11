import { FiltersState } from "@/global-interfaces";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: FiltersState = {
  searchTerm: "",
  isFeatured: false,
  categoryTerms: [],
  postTagTerms: [],
  currentPage: 1,
  postsPerPage: 4,
  switchButtonEnabled: false,
};

const postsFilterSlice = createSlice({
  name: "postsFilters",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    toggleIsFeatured: (state) => {
      state.isFeatured = !state.isFeatured;
    },
    setCategoryTerms: (state, action: PayloadAction<string[]>) => {
      state.categoryTerms = action.payload;
    },
    addCategoryTerm: (state, action: PayloadAction<string>) => {
      state.categoryTerms?.push(action.payload);
    },
    removeCategoryTerm: (state, action: PayloadAction<string>) => {
      state.categoryTerms = state.categoryTerms?.filter(
        (term) => term !== action.payload
      );
    },
    setPostTagTerms: (state, action: PayloadAction<string[]>) => {
      state.postTagTerms = action.payload;
    },
    addPostTagTerm: (state, action: PayloadAction<string>) => {
      state.postTagTerms?.push(action.payload);
    },
    removePostTagTerm: (state, action: PayloadAction<string>) => {
      state.postTagTerms = state.postTagTerms?.filter(
        (term) => term !== action.payload
      );
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    resetAll: (state) => {
      state.searchTerm = "";
      state.categoryTerms = [];
      state.postTagTerms = [];
      state.isFeatured = false;
      state.currentPage = 1;
      state.switchButtonEnabled = false;
    },
    setSwitchButtonEnabled: (state) => {
      state.switchButtonEnabled = !state.switchButtonEnabled;
    },
  },
});

export const {
  setSearchTerm,
  setCategoryTerms,
  toggleIsFeatured,
  addCategoryTerm,
  removeCategoryTerm,
  setPostTagTerms,
  addPostTagTerm,
  removePostTagTerm,
  setCurrentPage,
  resetAll,
  setSwitchButtonEnabled,
} = postsFilterSlice.actions;
export default postsFilterSlice.reducer;
