// poolSlice.js
import { createSlice } from "@reduxjs/toolkit";

const poolSlice = createSlice({
  name: "pools",
  initialState: {
    pools: [],
    filteredPools: [],
  },
  reducers: {
    setPools: (state, action) => {
      state.pools = action.payload;
      state.filteredPools = action.payload; // Initialize filteredPools with all pools
    },
    setFilteredPools: (state, action) => {
      state.filteredPools = action.payload;
    },
  },
});

export const { setPools, setFilteredPools } = poolSlice.actions;
export const selectPools = (state) => state.pools.pools;
export const selectFilteredPools = (state) => state.pools.filteredPools;

export default poolSlice.reducer;
