import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    user: {},
  },
  reducers: {
    // Action to add comment
    getUseData(state, action) {
      state.value = [...state.value, action.payload];
      console.log("All the work done by Vincent", state.value);
    },

    // Special reducer for hydrating the state
    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.users,
        };
      },
    },
  },
});

export const { getUseData } = userSlice.actions;
export const selectUser = (state) => state.users.value;
export default userSlice.reducer;
